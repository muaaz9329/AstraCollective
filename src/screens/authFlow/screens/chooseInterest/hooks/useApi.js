import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  InitialSignUpStep,
  setInitialSignupStep,
} from '../../../../../redux/Slices/signupSlice';
import {appNavigationParam, appRoutes} from '../../../../../services';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import {userDataSave} from '../../../../../redux/Slices/userDataSlice';
import {AppReducers} from '../../../../../redux/store';
import useValidation from '../../../../../hooks/useValidation';
import {setInterests} from '../../../../../redux/Slices/createStorySlice';
const useApi = (navigation, comingFor) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState([]);
  const {userData} = useSelector(state => state[AppReducers.UserData]);
  const {validateArraysId} = useValidation();
  const isUpdating =
    comingFor === appNavigationParam['chooseInterestScreen'].updatingInterest;
  const isChoosing =
    comingFor === appNavigationParam['chooseInterestScreen'].chooseInterest;
  const isNew =
    comingFor === appNavigationParam['chooseInterestScreen'].newInterest;
  const getInterest = async () => {
    setLoading(true);
    apiService.Get({
      url: routes.allInterest,
      setLoading,
      OnSuccess: res => {
        setValue(res?.data?.interest);
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Error', e);
      },
    });
  };

  const updateInterest = async () => {
    if (validateArraysId(selected)) {
      setLoading(true);
      await apiService.Patch({
        url: routes.updateMe,
        setLoading,
        body: {
          interests: selected,
          interestSelected: true,
        },
        OnSuccess: res => {
          if (isChoosing) {
            dispatch(setInitialSignupStep(InitialSignUpStep.AddGenre));
            navigation.navigate(appRoutes.chooseGenra, {
              comingFor: appNavigationParam['chooseGenraScreen'].chooseGenra,
            });
            dispatch(userDataSave(res?.data?.user));
            // console.log('res', res);

            SuccessFlashMessage('Successfully', 'Interest Added SuccessFully');
          } else if (isUpdating) {
            navigation.goBack();
            // navigation.navigate(appRoutes.chooseGenra);
            dispatch(userDataSave(res?.data?.user));
            // console.log('res', res);

            SuccessFlashMessage(
              'Successfully',
              'Interest Updated SuccessFully',
            );
          }
        },
        OnError: e => {
          console.log('e', e);
          ErrorFlashMessage('Error', e);
        },
      });
    }
  };

  const newInterestSelection = () => {
    if (validateArraysId(selected)) {
      // const selectedName = value
      console.log({selected});
      const filteredNames = value
        .filter(item1 => selected.some(item2 => item2._id === item1._id))
        .map(item => item.name);
      dispatch(setInterests(filteredNames));
      navigation.navigate(appRoutes.newGenreSelection, {
        comingFor: appNavigationParam['chooseGenraScreen'].newGenra,
      });
    }
  };
  useEffect(() => {
    getInterest();
    // setInitialValues();
  }, []);

  const interestScreenCallBack = () => {
    if (isChoosing || isUpdating) {
      updateInterest();
    } else {
      newInterestSelection();
    }
  };

  const getInitialInterest = () => {
    if (isChoosing || isUpdating) {
      return userData?.interests || [];
    } else {
      return [];
    }
  };

  return {
    loading,
    value,
    selected,
    setSelected,
    interestScreenCallBack,
    initialValue: getInitialInterest(),
  };
};

export default useApi;
