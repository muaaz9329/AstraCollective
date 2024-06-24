import {useEffect, useState} from 'react';
import tts from 'react-native-tts';
import {useNavigation} from '@react-navigation/native';
import {appRoutes} from '../../../../services';
import {useDispatch} from 'react-redux';
import {setBook} from '../../../../redux/Slices/getOneStorySlice';
import {Alert, Platform} from 'react-native';
const useReading = (story = ' ', bookInfo = {}, comingForNewStory = false) => {
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const [sheet, setSheet] = useState(false);
  const navigation = useNavigation();

  const splitedStory = story ? story.split(/(?=[.])/) : 'Loading...'; // splits the story into sentences

  // console.log(splitedStory.length);

  const [currentReading, setCurrentReading] = useState(0); // using for controlling the index of the sentence

  const [progress, setProgress] = useState(0); // using for controlling the progress bar

  const [success, setSuccess] = useState(false); // using for checking the status of the TTS

  const [event, setEvent] = useState('init'); // using for checking the status of the TTS

  const [dualSpeed, setDualSpeed] = useState(false);

  useEffect(() => {
    tts
      .getInitStatus()
      .then(val => {
        setSuccess(true);
      })

      .catch(() => {
        setSuccess(false);
        Alert.alert(
          'Text To Speech',
          'No Text to Speech Engine found on your device',
        );
      });
  }, []); // checking the status of the TTS on the initial render

  const startPlaying = () => {
    console.log('current sentence', splitedStory[currentReading]);
    if (splitedStory[currentReading] === undefined) {
      //* when story is finished
      if (bookInfo?.isReviewed === false || comingForNewStory) {
        // if the book is not reviewed then navigate to the rating screen
        dispatch(setBook(bookInfo));
        console.log({bookInfo});
        navigation.navigate(appRoutes.rating);
      }

      return;
    }

    tts.speak(splitedStory[currentReading].replace('.', ''));
  }; // function for starting the TTS

  useEffect(() => {
    if (success && play) {
      startPlaying();
    } else if (!play) {
      tts.stop();
    }
  }, [play, currentReading]); // plays the TTS when the play state is true and the currentReading(index) is Changed

  useEffect(() => {
    tts.addEventListener('tts-start', event => setEvent('start'));
    tts.addEventListener('tts-finish', event => setEvent('finish'));
    tts.addEventListener('tts-cancel', event => setEvent('cancel'));
    tts.setIgnoreSilentSwitch('ignore').then(val => {
      console.log('ignored');
      console.log('vall-------->', val);
    });
  }, []); // adding event listeners to the TTS

  useEffect(() => {
    console.log('current reading', currentReading);
  }, [currentReading]);

  useEffect(() => {
    if (event === 'finish') {
      setCurrentReading(currentReading + 1);
    } else if (event === 'start') {
      setProgress(Math.floor((currentReading * 100) / splitedStory.length));
    }
  }, [event]); // watching the event and updating the currentReading and progress of progress bar

  const handleProgress = value => {
    tts.stop();
    setPlay(false);
    setProgress(value);
    setCurrentReading(Math.floor((value * splitedStory.length) / 100));
  }; // used to control the progress of highlighting the sentences and the progress bar

  const onClickShare = () => {
    setSheet(true);
  }; // used to open the bottom sheet

  const onPressCommunityShare = () => {
    dispatch(setBook(bookInfo));
  };

  useEffect(() => {
    if (dualSpeed) {
      if (Platform.OS === 'ios') {
        tts.setDefaultRate(0.6);
      } else {
        tts.setDefaultRate(1.5, true);
      }
    } else {
      if (Platform.OS === 'ios') {
        tts.setDefaultRate(0.5);
      } else {
        tts.setDefaultRate(0.9, true);
      }
    }
  }, [dualSpeed]);

  useEffect(() => {
    return () => {
      handleProgress(0);
    };
  }, []); // resetting the progress when the component is unmounted

  return {
    play,
    setPlay,
    sheet,
    setSheet,
    onClickShare,
    handleProgress,
    progress,
    splitedStory,
    currentReading,
    setCurrentReading,
    dualSpeed,
    setDualSpeed,
    onPressCommunityShare,
  };
};

export default useReading;
