import React, {useContext, useReducer, useRef, useState} from 'react';
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
  widthPixel,
} from '../../../../../services';
import {styles} from './styles';
import AuthHeading from '../../../../../components/authHeading/authHeading';
import SocialLogin from '../../../../../components/socialLogin/socialLogin';
import {
  GreenSnackbar,
  RedSnackbar,
  isEmailValid,
} from '../../../../../services/helpingMethods';
import Button from '../../../../../components/button';
import {AuthHeader, AuthInput, Header} from '../../../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import PasswordChangeModel from '../../../../../components/model/password-change-successs';
import useApi from './hooks/useApi';
import Loader from '../../../../../components/loader/Loader';

const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();

  // const onPressLoginn = () => {
  //   dispatch(userSave(true));
  //   navigation.replace(routes.tab);
  // };

  const modelRef = useRef(null);

  const {
    cpassword,
    password,
    secureCTextEntry,
    secureTextEntry,
    setCPassword,
    setPassword,
    setSecureCTextEntry,
    setSecureTextEntry,
    loading,
    updatePassword,
  } = useApi(navigation, modelRef);

  return (
    <Loader loading={loading}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <PasswordChangeModel ref={modelRef} />
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <Header title={'Change Password'} isBack={true}>
          <Image
            source={appIcons.lockImage}
            style={{
              width: heightPixel(20),
              height: heightPixel(20),
              resizeMode: 'contain',
              marginLeft: widthPixel(10),
            }}
          />
        </Header>

        <View style={[styles.container]}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>
              Enter your new password. IF you forget it, then you have to do
              forgot password.
            </Text>

            <AuthInput
              label={'Current Password'}
              value={cpassword}
              onChangeText={setCPassword}
              secure={secureCTextEntry}
              setSecure={setSecureCTextEntry}
              placeholder={'Enter Current password'}
              secureTextEntry={true}
            />

            <AuthInput
              label={'New Password'}
              value={password}
              onChangeText={setPassword}
              secure={secureTextEntry}
              setSecure={setSecureTextEntry}
              placeholder={'Enter New password'}
              secureTextEntry={true}
            />
          </KeyboardAwareScrollView>

          <Button onPress={updatePassword}>Update Password</Button>
        </View>
      </SafeAreaView>
    </Loader>
  );
};

export default ChangePassword;
