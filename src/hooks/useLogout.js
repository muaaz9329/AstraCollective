import {useDispatch} from 'react-redux';
import {setLogout} from '../redux/Slices/userDataSlice';
import {apiService} from '../network';
import {
  InitialSignUpStep,
  setInitialSignupStep,
} from '../redux/Slices/signupSlice';
import {getDeviceObject} from '../services/config/auth';
import {BASE_URL} from '../network/routes';

const useLogout = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const logout = async () => {
    // navigation.navigate('Auth');
    dispatch(setLogout());
    dispatch(setInitialSignupStep(InitialSignUpStep.startUp));
    const body = await getDeviceObject();
    await apiService.Post({
      url: BASE_URL + '/user/logout',
      body: {
        ...body,
      },
      setLoading: val => console.log({val}),
      OnSuccess: res => {
        console.log('logout', res);
      },
      OnError: e => {
        console.log(e);
      },
    });
  };

  return {logout};
};

export default useLogout;
