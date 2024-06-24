import {useState} from 'react';
import useValidation from '../../../../../hooks/useValidation';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {AppReducers} from '../../../../../redux/store';
import {useSelector} from 'react-redux';
import {getDeviceObject} from '../../../../../services/config/auth';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import {appRoutes} from '../../../../../services';
const useApi = navigation => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const {validateTwoPasswords, validatePassword} = useValidation();

  const {userData, otpToResetPass} = useSelector(
    state => state[AppReducers.UserData],
  );
  const changePassword = async () => {
    if (
      !validatePassword(password) ||
      !validateTwoPasswords(password, cpassword)
    ) {
      return;
    }

    const device = await getDeviceObject();
    await apiService.Patch({
      url: routes.resetPassword,
      body: {
        email: userData?.email,
        password,
        otp: otpToResetPass,
        ...device,
      },
      setLoading,
      OnSuccess: res => {
        console.log('res', res);
        SuccessFlashMessage(
          'Success',
          res?.message || 'Password updated successfully',
        );
        navigation.replace(appRoutes.login);
      },
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Error', e);
      },
    });
  };

  return {
    loading,
    password,
    setPassword,
    cpassword,
    setCPassword,
    changePassword,
  };
};

export default useApi;
