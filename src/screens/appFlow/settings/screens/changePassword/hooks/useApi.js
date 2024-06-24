import {useState} from 'react';
import useValidation from '../../../../../../hooks/useValidation';
import {apiService} from '../../../../../../network';
import routes from '../../../../../../network/routes';
import {ErrorFlashMessage} from '../../../../../../services/helpingMethods';
import {getDeviceObject} from '../../../../../../services/config/auth';
import useLogout from '../../../../../../hooks/useLogout';
import {appRoutes} from '../../../../../../services';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
const useApi = (nav, modelRef) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureCTextEntry, setSecureCTextEntry] = useState(true);
  const {validatePassword} = useValidation();
  const {logout} = useLogout();

  const updatePassword = async () => {
    const device = await getDeviceObject();
    if (!validatePassword(password) || !validatePassword(cpassword)) {
      return;
    } else {
      setLoading(true);
      apiService.Patch({
        url: routes.updatePassword,
        body: {
          currentPassword: cpassword,
          password: password,
          ...device,
        },
        setLoading,
        OnSuccess: res => {
          modelRef.current.showModel();

          setTimeout(() => {
            modelRef.current.hideModel();
            logout();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: appRoutes.auth, routes: appRoutes.wizard}],
              }),
            );
          }, 3000);
        },
        OnError: error => {
          console.log('error', error);
          ErrorFlashMessage('Something Went Wrong', error);
        },
      });
    }

    // navigation.replace(appRoutes.auth, {
    //   screen: appRoutes.wizard,
    // });
  };
  return {
    loading,
    password,
    setPassword,
    cpassword,
    setCPassword,
    secureTextEntry,
    setSecureTextEntry,
    secureCTextEntry,
    setSecureCTextEntry,
    updatePassword,
  };
};

export default useApi;
