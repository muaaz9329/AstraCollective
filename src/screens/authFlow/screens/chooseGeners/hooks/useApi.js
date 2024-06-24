import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  InitialSignUpStep,
  setInitialSignupStep,
} from '../../../../../redux/Slices/signupSlice';
import {appNavigationParam, appRoutes} from '../../../../../services';
import {ErrorFlashMessage, SuccessFlashMessage} from '../../../../../services/helpingMethods';
import {
  setIsLoggedIn,
  userDataSave,
} from '../../../../../redux/Slices/userDataSlice';
import {AppReducers} from '../../../../../redux/store';
import useValidation from '../../../../../hooks/useValidation';
import {setGenres} from '../../../../../redux/Slices/createStorySlice';
const useApi = (navigation, comingFor) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const {validateArraysId} = useValidation();
  const [selected, setSelected] = useState([]);
  const {userData} = useSelector(state => state[AppReducers.UserData]);
  const isUpdating =
    comingFor === appNavigationParam['chooseGenraScreen'].updatingGenra;
  const isChoosing =
    comingFor === appNavigationParam['chooseGenraScreen'].chooseGenra;
  const isNew = comingFor === appNavigationParam['chooseGenraScreen'].newGenra;
  const getGenre = async () => {
    setLoading(true);
    apiService.Get({
      url: routes.allGenre,
      setLoading,
      OnSuccess: res => {
        setValue(res?.data?.genere);
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Error', e);
      },
    });
  };

  const updateGenre = async () => {
    if (validateArraysId(selected)) {
      setLoading(true);
      await apiService.Patch({
        url: routes.updateMe,
        setLoading,
        body: {
          genres: selected,
          generesSelected: true,
        },
        OnSuccess: res => {
          if (isChoosing) {
            dispatch(setInitialSignupStep(InitialSignUpStep.AddCharacters));
            // dispatch(setIsLoggedIn(true));
            dispatch(userDataSave(res?.data?.user));
            navigation.navigate(appRoutes.chooseCharacter, {
              comingFor:
                appNavigationParam['chooseCharacterScreen'].chooseCharacter,
            });
            SuccessFlashMessage('Success', 'Genre Added SuccessFully');
          } else if (isUpdating) {
            // dispatch(setIsLoggedIn(true));
            dispatch(userDataSave(res?.data?.user));
            navigation.goBack();
            SuccessFlashMessage('Success', 'Genre Updated SuccessFully');
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
    getGenre();
  }, []);

  const newGenreSelection = () => {
    if (validateArraysId(selected)) {
      const filteredNames = value
        .filter(item1 => selected.some(item2 => item2._id === item1._id))
        .map(item => item.name);

      dispatch(setGenres(filteredNames));
      // console.log({filteredNames});
      navigation.navigate(appRoutes.newCharacterSelection, {
        comingFor: appNavigationParam['chooseCharacterScreen'].newCharacter,
      });
    }
  };

  const genreScreenCallBack = () => {
    if (isChoosing || isUpdating) {
      updateGenre();
    } else if (isNew) {
      newGenreSelection(); // runs when user is going to generate new story
    }
  };

  const getInitialGenre = () => {
    if (isUpdating || isChoosing) {
      return userData?.genres || [];
    } else {
      return [];
    }
  };
  return {
    loading,
    value,
    selected,
    setSelected,
    genreScreenCallBack,
    initialValue: getInitialGenre(),
  };
};

export default useApi;
