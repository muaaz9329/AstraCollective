import {useState} from 'react';
import useValidation from '../../../../../hooks/useValidation';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import {appNavigationParam, appRoutes} from '../../../../../services';
import {userDataSave} from '../../../../../redux/Slices/userDataSlice';
import {useDispatch} from 'react-redux';
const useApi = navigation => {
  const [loading, setLoading] = useState(false);
  const {validateEmail} = useValidation();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const sendOtpEmail = async () => {
    if (!validateEmail(email)) {
      return;
    }

    await apiService.Post({
      url: routes.forgatPass,
      setLoading,
      body: {
        email,
      },
      OnSuccess: res => {
        SuccessFlashMessage('Success', res?.message);
        dispatch(
          userDataSave({
            email: email,
          }),
        );
        navigation.replace(appRoutes.verifyEmail, {
          routeTo: appRoutes.resetPassword,
          verificationOf:
            appNavigationParam['verificationScreen'].VerificationOfPassword,
        });
      },
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Error', e);
      },
    });
  };

  return {
    loading,
    email,
    setEmail,
    sendOtpEmail,
  };
};

export default useApi;
