import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {AppReducers} from '../../../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import {appNavigationParam, appRoutes} from '../../../../../services';
import {
  InitialSignUpStep,
  setInitialSignupStep,
  signupStep,
} from '../../../../../redux/Slices/signupSlice';
import useValidation from '../../../../../hooks/useValidation';
import {getDeviceId, getDeviceToken} from 'react-native-device-info';
import {getDeviceObject, setAuthToken} from '../../../../../services/config/auth';
import {
  accessToken,
  refreshToken,
  setOtpToResetPass,
  setOtpVerification,
  userDataSave,
} from '../../../../../redux/Slices/userDataSlice';
const useApi = (navigation, routeTo , verificationOf) => {
  const OTP_TIME = 60;
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const {validateOtp} = useValidation();
  const [loading, setLoading] = useState(false);
  const [isOTP, setIsOTP] = useState('');

  const {userData} = useSelector(state => state[AppReducers.UserData]);
  const [count, setCount] = useState(OTP_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  const sendOtpAgain = async () => {
    await apiService.Post({
      url: routes.sendOTP,
      body: {
        email: userData?.email,
      },
      setLoading,
      OnSuccess: res => {
        SuccessFlashMessage(
          'OTP sent successfully',
          'Check your email for OTP',
        );
        setCount(OTP_TIME);
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Error in sending OTP', 'try again later');
      },
    });
  };

  const sendOtpAgainForResetPassword = async () => {
    await apiService.Post({
      url: routes.forgatPass,
      setLoading,
      body: {
        email: userData?.email,
      },
      OnSuccess: res => {
        SuccessFlashMessage(
          'OTP sent successfully',
          'Check your email for OTP',
        );
        setCount(OTP_TIME);
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Error in sending OTP', 'try again later');
      },
    });
  };

  const verifyEmail = async () => {
    if (validateOtp(isOTP)) {
      const device = await getDeviceObject()

      await apiService.Post({
        url: routes.verifyOTP,
        body: {
          email: userData?.email,
          otp: Number(isOTP),
          ...device
          
        },

        OnSuccess: res => {
          console.log('res', res);
          dispatch(setInitialSignupStep(InitialSignUpStep.ProfileCreation));
          dispatch(accessToken(res?.data?.token));
          dispatch(refreshToken(res?.data?.refreshToken));
          dispatch(setOtpVerification(true));
          dispatch(userDataSave(res?.data?.user));
          navigation.replace(routeTo);
          console.log(JSON.stringify(res, undefined, 2));
          SuccessFlashMessage(
            'OTP verified successfully',
            'Now you can create your profile',
          );
        },
        OnError: e => {
          console.log('e', e);
          ErrorFlashMessage('Error in verifying OTP', e);
        },
        setLoading,
      });
    }
  };

  const verifyOTPResetPassword = async () => {
    if (validateOtp(isOTP)) {
      // const getToken = await getDeviceToken();
      await apiService.Post({
        url: routes.verifyOTPresetPassword,
        body: {
          email: userData?.email,
          otp: Number(isOTP),
        },

        OnSuccess: res => {
          console.log('res', res);
          // dispatch(setInitialSignupStep(InitialSignUpStep.ProfileCreation));
          dispatch(accessToken(res?.data?.token));
          dispatch(refreshToken(res?.data?.refreshToken));
          dispatch(setOtpToResetPass(Number(isOTP)));
          // dispatch(setOtpVerification(true));
          navigation.replace(routeTo);
          console.log(JSON.stringify(res, undefined, 2));
          SuccessFlashMessage(
            'OTP verified successfully',
            'Now you can reset your password',
          );
        },
        OnError: e => {
          console.log('e', e);
          ErrorFlashMessage('Error in verifying OTP', e);
        },
        setLoading,
      });
    }
  };

  const verificationCallback = () => {
    if (
      verificationOf ===
      appNavigationParam['verificationScreen'].VerificationOfEmail
    ) {
      // console.log("heyy")
      verifyEmail();
    } else if (
      verificationOf ===
      appNavigationParam['verificationScreen'].VerificationOfPassword
    ) {
      verifyOTPResetPassword();
    } else {
      verifyEmail();
    }
  };

  const resendOtpCallback = () => {
    if (
      verificationOf ===
      appNavigationParam['verificationScreen'].VerificationOfEmail
    ) {
      sendOtpAgain();
    } else if (
      verificationOf ===
      appNavigationParam['verificationScreen'].VerificationOfPassword
    ) {
      sendOtpAgainForResetPassword();
    } else {
      sendOtpAgain();
    }
  };

  return {
    loading,
    isOTP,
    sendOtpAgain: resendOtpCallback,
    setIsOTP,
    count,
    verificationCallback,
  };
};

export default useApi;
