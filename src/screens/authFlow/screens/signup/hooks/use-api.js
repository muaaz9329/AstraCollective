import {useState} from 'react';
import routes from '../../../../../network/routes';
import useValidation from '../../../../../hooks/useValidation';
import {apiService} from '../../../../../network';

import {useDispatch} from 'react-redux';
import {
  accessToken,
  refreshToken,
  setIsLoggedIn,
  setRememberMe,
  setSocialLogin,
  userDataSave,
} from '../../../../../redux/Slices/userDataSlice';

import {showMessage} from 'react-native-flash-message';
import {appNavigationParam, appRoutes} from '../../../../../services';
import {
  InitialSignUpStep,
  setInitialSignupStep,
} from '../../../../../redux/Slices/signupSlice';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import {getDeviceObject} from '../../../../../services/config/auth';
const useApi = navigation => {
  const [loading, setLoading] = useState(false);
  const {validateEmail, validatePassword, validateTwoPasswords} =
    useValidation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureCTextEntry, setSecureCTextEntry] = useState(true);
  const [remember, setRemember] = useState(false);

  // function for validation of email, password, and confirmPassword
  const signUpUser = async () => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateTwoPasswords(password, cpassword)
    ) {
      // validation of email, password, and confirmPassword
      console.log('error');
      return;
    }
    const device = await getDeviceObject();
    await apiService.Post({
      body: {
        email, // state
        password, // state
        role: 'user',
        ...device,
      },
      url: routes.signUp,
      OnSuccess: res => {
        try {
          console.log('res', res);
          dispatch(userDataSave(res?.data?.user));
          dispatch(setRememberMe(true));
          showMessage({
            message: 'Account created successfully',
            type: 'success',
          });

          dispatch(setInitialSignupStep(InitialSignUpStep.VerifyEmail)); // sets the initial signup step to verify email so that user can come back to this screen after killing app
          navigation.navigate(appRoutes.verifyEmail, {
            routeTo: appRoutes.createProfileScreen,
            verificationOf:
              appNavigationParam['verificationScreen'].VerificationOfEmail,
          });
        } catch (e) {
          console.log(e);
          showMessage({
            message: 'Some error occurred, please try again Later',
            type: 'danger',
          });
        }
      },
      OnError: error => {
        console.log('error', error);
        showMessage({
          message: error,
          type: 'danger',
        });
      },
      setLoading,
    });
  };

  const socialLogin = async email => {
    const device = await getDeviceObject();
    await apiService.Post({
      url: routes.socialLogin,
      setLoading,
      body: {
        email,
        ...device,
      },
      OnSuccess: res => {
        // console.log('res', JSON.stringify(res, undefined, 4));
        dispatch(accessToken(res?.data?.token));
        dispatch(refreshToken(res?.data?.refreshToken));
        dispatch(userDataSave(res?.data?.user));
        const {
          profileCompleted,
          interestSelected,
          generesSelected,
          characterSelected,
        } = res?.data.user; // to replace according to user's status
        console.log('res', res);
        if (!profileCompleted) {
          dispatch(setInitialSignupStep(InitialSignUpStep.ProfileCreation));
          navigation.replace(appRoutes.createProfileScreen);
          SuccessFlashMessage('Welcome', 'Please Complete your registration');
        } else if (!interestSelected) {
          dispatch(setInitialSignupStep(InitialSignUpStep.AddInterest));
          navigation.replace(appRoutes.chooseInterest);
          SuccessFlashMessage(
            'Welcome back',
            'Please Complete your registration',
          );
        } else if (!generesSelected) {
          dispatch(setInitialSignupStep(InitialSignUpStep.AddGenre));
          navigation.replace(appRoutes.chooseGenra);
          SuccessFlashMessage(
            'Welcome back',
            'Please Complete your registration',
          );
        } else if (!characterSelected) {
          dispatch(setInitialSignupStep(InitialSignUpStep.AddCharacters));
          navigation.replace(appRoutes.chooseCharacter);
          SuccessFlashMessage(
            'Welcome back',
            'Please Complete your registration',
          );
        } else {
          dispatch(setIsLoggedIn(true));
          dispatch(setSocialLogin(true));
          navigation.navigate(appRoutes.tab);
          SuccessFlashMessage('Login Successful', 'Welcome Back');
        }
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Something went wrong', e);
      },
    });
  };

  return {
    loading,
    signUpUser,
    setEmail,
    setPassword,
    setCPassword,
    setSecureTextEntry,
    setSecureCTextEntry,
    setRemember,
    remember,
    secureTextEntry,
    secureCTextEntry,
    cpassword,
    password,
    email,
    socialLogin,
  };
};
export default useApi;
