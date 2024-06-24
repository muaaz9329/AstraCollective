import {useState} from 'react';
import {apiService} from '../../../../../../network';
import routes from '../../../../../../network/routes';
import {appRoutes} from '../../../../../../services';
import {SuccessFlashMessage} from '../../../../../../services/helpingMethods';
import useValidation from '../../../../../../hooks/useValidation';

const useApi = navigation => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const {validatePassword} = useValidation();
  const sendOtpToDelete = async () => {
    if (validatePassword(password)) {
      setLoading(true);
      console.log('Deleting Acc');
      await apiService.Delete({
        url: routes.deleteAccount,
        body: {
          password,
        },
        OnSuccess: res => {
          SuccessFlashMessage('Success', 'Otp send to your email');
          navigation.replace(appRoutes.deleteVerify);
        },
        OnError: e => {
          console.log('e', e);
          ErrorFlashMessage('Error', e);
        },
      });
    }
  };
  return {
    password,
    setPassword,
    loading,
    sendOtpToDelete,
    setLoading,
  };
};

export default useApi;
