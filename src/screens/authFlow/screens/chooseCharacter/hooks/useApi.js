import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  InitialSignUpStep,
  setInitialSignupStep,
} from '../../../../../redux/Slices/signupSlice';
import {
  setIsLoggedIn,
  userDataSave,
} from '../../../../../redux/Slices/userDataSlice';
import {appNavigationParam, appRoutes} from '../../../../../services';
import useValidation from '../../../../../hooks/useValidation';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import {AppReducers} from '../../../../../redux/store';
import {setCharacter} from '../../../../../redux/Slices/createStorySlice';

const useApi = (navigation, comingFor) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {validateArraysId} = useValidation();
  const {userData} = useSelector(state => state[AppReducers.UserData]);

  const isUpdating =
    comingFor === appNavigationParam['chooseCharacterScreen'].updatingCharacter;
  const isChoosing =
    comingFor === appNavigationParam['chooseCharacterScreen'].chooseCharacter;
  const isNew =
    comingFor === appNavigationParam['chooseCharacterScreen'].newCharacter;
  const [characters, setCharacters] = useState([
    {
      _id: '',
      img: '',
    },
  ]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const getInitialSelectedCharacters = () => {
    if (isChoosing || isUpdating) {
      if (userData?.characters) {
        return userData?.characters;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  const getCharacters = async () => {
    await apiService.Get({
      url: routes.allCharacters,
      setLoading,
      OnSuccess: res => {
        setCharacters(res?.data?.character);
        // console.log(res);
      },
      OnError: error => {
        console.log('error', error);
      },
    });
  };

  const updateCharacter = async () => {
    if (validateArraysId(selectedCharacters)) {
      setLoading(true);
      await apiService.Patch({
        url: routes.updateMe,
        setLoading,
        body: {
          characters: selectedCharacters,
          characterSelected: true,
        },
        OnSuccess: res => {
          // dispatch(setInitialSignupStep(InitialSignUpStep.));
          if (isChoosing) {
            dispatch(setIsLoggedIn(true));
            dispatch(userDataSave(res?.data?.user));
            navigation.navigate(appRoutes.welcome);
            SuccessFlashMessage('Success', 'Characters Added SuccessFully');
          } else if (isUpdating) {
            // dispatch(setIsLoggedIn(true));
            dispatch(userDataSave(res?.data?.user));
            navigation.goBack();
            SuccessFlashMessage('Success', 'Characters Updated SuccessFully');
          }
        },
        OnError: e => {
          console.log('e', e);
          ErrorFlashMessage('Error', e);
        },
      });
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const newCharacterSelection = () => {
    if (validateArraysId(selectedCharacters)) {
      const filteredNames = characters
        .filter(item1 =>
          selectedCharacters.some(item2 => item2._id === item1._id),
        )
        .map(item => item.text);

      // console.log({filteredNames});
      dispatch(setCharacter(filteredNames));
      navigation.navigate(appRoutes.readings, {
        comingFor: appNavigationParam['reading'].newStory,
      });
    }
  };
  const characterScreenCallback = () => {
    if (isChoosing || isUpdating) {
      updateCharacter();
    } else if (isNew) {
      newCharacterSelection();
    }
  };

  return {
    loading,
    characters,
    selectedCharacters,
    setSelectedCharacters,
    characterScreenCallback,
    getInitialSelectedCharacters,
  };
};
export default useApi;
