import {useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {getDeviceObject} from '../../../../../services/config/auth';
import {useDispatch} from 'react-redux';
import {
  accessToken,
  refreshToken,
  setIsLoggedIn,
  setSocialLogin,
  userDataSave,
} from '../../../../../redux/Slices/userDataSlice';
import {appNavigationParam, appRoutes} from '../../../../../services';
import {
  InitialSignUpStep,
  setInitialSignupStep,
  signupStep,
} from '../../../../../redux/Slices/signupSlice';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import useValidation from '../../../../../hooks/useValidation';

const useApi = navigation => {
  const dispatch = useDispatch();
  const {validateEmail, validatePassword} = useValidation();
  //   const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const login = async () => {
    const device = await getDeviceObject();

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }
    await apiService.Post({
      url: routes.signIn,
      setLoading,
      body: {
        email,
        password,
        role: 'user',
        ...device,
      },
      OnSuccess: res => {
        // console.log('res', JSON.stringify(res, undefined, 4));

        if (res?.data?.user?.isBlocked) {
          ErrorFlashMessage(
            'Your account has been blocked',
            'Please contact support',
          );
          return;
        }
        dispatch(accessToken(res?.data?.token));
        dispatch(refreshToken(res?.data?.refreshToken));
        dispatch(userDataSave(res?.data?.user));
        const {
          verified,
          profileCompleted,
          interestSelected,
          generesSelected,
          characterSelected,
        } = res?.data.user; // to replace according to user's status
        if (!verified) {
          dispatch(setInitialSignupStep(InitialSignUpStep.VerifyEmail));
          navigation.replace(appRoutes.verifyEmail, {
            routeTo: appRoutes.createProfileScreen,
            verificationOf:
              appNavigationParam['verificationScreen'].VerificationOfEmail,
          });
        } else if (!profileCompleted) {
          dispatch(setInitialSignupStep(InitialSignUpStep.ProfileCreation));
          navigation.replace(appRoutes.createProfileScreen);
        } else if (!interestSelected) {
          dispatch(setInitialSignupStep(InitialSignUpStep.AddInterest));
          navigation.replace(appRoutes.chooseInterest);
        } else if (!generesSelected) {
          dispatch(setInitialSignupStep(InitialSignUpStep.AddGenre));
          navigation.replace(appRoutes.chooseGenra);
        } else if (!characterSelected) {
          dispatch(setInitialSignupStep(InitialSignUpStep.AddCharacters));
          navigation.replace(appRoutes.chooseCharacter);
        } else {
          dispatch(setIsLoggedIn(true));
          navigation.navigate(appRoutes.tab);
        }

        SuccessFlashMessage('Login Successful', 'Welcome Back');
      },
      OnError: e => {
        console.log('e', e);
        if (e.includes('Verification is pending')) {
          console.log(true);
        }
        ErrorFlashMessage('Something went wrong', e);
      },
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
        dispatch(setSocialLogin(true));
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
          // dispatch(setSocialLogin(true));
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
    setEmail,
    email,
    setPassword,
    password,
    secureTextEntry,
    setSecureTextEntry,
    login,
    socialLogin,
  };
};

export default useApi;
