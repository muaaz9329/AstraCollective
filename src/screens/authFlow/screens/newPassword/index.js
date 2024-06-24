import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  routes,
} from '../../../../services';
import {styles} from './styles';
import AuthHeading from '../../../../components/authHeading/authHeading';
import SocialLogin from '../../../../components/socialLogin/socialLogin';
import {
  GreenSnackbar,
  RedSnackbar,
  isEmailValid,
} from '../../../../services/helpingMethods';
import Button from '../../../../components/button';
import {AuthHeader, AuthInput} from '../../../../components';
import useApi from './hooks/useApi';
import Loader from '../../../../components/loader/Loader';

const ResetPassword = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureCTextEntry, setSecureCTextEntry] = useState(true);
  const {
    cpassword,
    loading,
    password,
    setCPassword,
    setPassword,
    changePassword,
  } = useApi(navigation);

  return (
    <Loader loading={loading}>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthHeading
            icon={appIcons.iconLock}
            isBack={true}
            text1={'Change Password'}
            text2={
              'Enter your new password. IF you forget it, then you have to do forgot password.'
            }
          />

          <AuthInput
            label={'Password'}
            value={password}
            onChangeText={setPassword}
            secure={secureTextEntry}
            setSecure={setSecureTextEntry}
            placeholder={'Enter password'}
            secureTextEntry={true}
          />

          <AuthInput
            label={'Confirm Password'}
            value={cpassword}
            onChangeText={setCPassword}
            secure={secureCTextEntry}
            setSecure={setSecureCTextEntry}
            placeholder={'Enter password'}
            secureTextEntry={true}
          />
        </KeyboardAwareScrollView>

        <Button
          onPress={() => {
            // navigation.navigate(routes.success);
            changePassword();
          }}>
          Update Password
        </Button>
      </View>
    </Loader>
  );
};

export default ResetPassword;
