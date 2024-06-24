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
import useValidation from '../../../../../hooks/useValidation';
import {AppReducers} from '../../../../../redux/store';
import {userDataSave} from '../../../../../redux/Slices/userDataSlice';
import useS3 from '../../../../../hooks/useS3';
import useImagePicker from '../../../../../hooks/useImagePicker';
const useApi = navigation => {
  const dispatch = useDispatch();
  const {uploadImageOnS3} = useS3();
  const {imagePicker} = useImagePicker();

  const [loading, setLoading] = useState(false);
  const {validateName, validateUserName} = useValidation();
  const [fullName, setFullName] = useState({
    first: '',
    last: '',
    userName: '',
    image:
      'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg',
  });

  const {userData} = useSelector(state => state[AppReducers.UserData]);

  useEffect(() => {
    if (userData) {
      setFullName({
        first: userData?.firstName,
        last: userData?.lastName,
        userName: userData?.userName,
        image: userData?.image,
      });
    }
  }, [userData]); // set the initial value of the input fields from the user data if available

  const setProfileName = async () => {
    if (
      !validateName(fullName.first) ||
      !validateName(fullName.last) ||
      !validateUserName(fullName.userName)
    ) {
      return;
    }

    apiService.Patch({
      url: routes.updateMe,
      setLoading,
      body: {
        firstName: fullName.first,
        lastName: fullName.last,
        userName: fullName.userName,
        image: fullName.image,
        profileCompleted: true,
      },
      OnSuccess: res => {
        dispatch(setInitialSignupStep(InitialSignUpStep.AddInterest));
        SuccessFlashMessage('Successfully', 'Profile Created SuccessFully');
        // console.log('res', res);
        dispatch(userDataSave(res?.data?.user));
        navigation.navigate(appRoutes.chooseInterest, {
          comingFor: appNavigationParam['chooseInterestScreen'].chooseInterest,
        });
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Error', e);
      },
    });
  };

  const addProfileImage = async () => {
    const imagedata = await imagePicker();
    if (imagedata) {
      setLoading(true);
      await uploadImageOnS3(imagedata, image => {
        setFullName({...fullName, image});
        setLoading(false);
      });
    }
  };

  return {
    loading,
    setFullName,
    fullName,
    setProfileName,
    userData,
    addProfileImage,
  };
};

export default useApi;
