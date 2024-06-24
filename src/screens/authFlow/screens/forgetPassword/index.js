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

const ForgetScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // const onPressLoginn = () => {
  //   dispatch(userSave(true));
  //   navigation.replace(routes.tab);
  // };

  const {email, loading, setEmail, sendOtpEmail} = useApi(navigation);

  return (
    <Loader loading={loading}>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthHeading
            isBack={true}
            icon={appIcons.iconKey}
            text1={'Forgot Password'}
            text2={
              'Enter your email address. We will send an OTP code for verification in the next step.'
            }
          />

          <AuthInput
            label={'Email'}
            keyboardType="email-address"
            value={email}
            onChangeText={text => {
              setEmail(text.trim());
            }}
            placeholder={'Enter your email'}
          />
        </KeyboardAwareScrollView>
        <Button onPress={sendOtpEmail}>Send OTP</Button>
      </View>
    </Loader>
  );
};

export default ForgetScreen;
