import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import jwt_decode from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';

import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  routes,
  widthPixel,
} from '../../../../services';
import {styles} from './styles';
import AuthHeading from '../../../../components/authHeading/authHeading';
import SocialLogin from '../../../../components/socialLogin/socialLogin';
import {ErrorFlashMessage, getFcmToken} from '../../../../services/helpingMethods';
import Button from '../../../../components/button';
import {AuthInput} from '../../../../components';
import useApi from './hooks/useApi';
import Loader from '../../../../components/loader/Loader';
import {setRememberMe} from '../../../../redux/Slices/userDataSlice';
import useSocialLogins from '../../../../hooks/useSocialLogins';
import {appleAuth} from '@invertase/react-native-apple-authentication';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    loading,
    setEmail,
    setPassword,
    email,
    password,
    secureTextEntry,
    setSecureTextEntry,
    login,
    socialLogin,
  } = useApi(navigation);

  const [remember, setRemember] = useState(false);
  const {googleLoginData} = useSocialLogins();

  const handleGoogleLogin = async () => {
    try {
      const userInfo = await googleLoginData();
      console.log(userInfo);
      const {email, familyName, givenName, id, photo} = userInfo.user;
      await socialLogin(email);
    } catch (error) {
      console.log(error);
      ErrorFlashMessage('Something went wrong in google login');
    }
  };

  const handleAppleLogin = async () => {
    if (Platform.OS === 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      console.log(appleAuthRequestResponse.identityToken);
      // console.log('jwt decode --->',jwt_decode(
      //   appleAuthRequestResponse.identityToken,
      // ))

      const {email, email_verified} = jwt_decode(
        appleAuthRequestResponse.identityToken,
      );

      console.log({email, email_verified});
      await socialLogin(email);
    } else {
      Alert.alert('Only Available for ios devices');
    }
  };

  useEffect(() => {
    dispatch(setRememberMe(remember));
  }, [remember]);


  return (
    <Loader loading={loading}>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthHeading
            isBack={true}
            icon={appIcons.welcomeHand}
            text1={'Hello there'}
            text2={'Please enter your username/email and password to sign in.'}
          />

          <AuthInput
            label={'Username / Email'}
            keyboardType="email-address"
            value={email}
            onChangeText={text => {
              setEmail(text.trim());
            }}
            placeholder={'Enter your email'}
          />

          <AuthInput
            label={'Password'}
            value={password}
            onChangeText={setPassword}
            secure={secureTextEntry}
            setSecure={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
            placeholder={'Enter password'}
            secureTextEntry={true}
          />

          <View style={styles.rememberContainer}>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  setRemember(!remember);
                }}>
                <Image
                  source={appIcons.iconCheck}
                  style={[
                    styles.check,
                    {tintColor: remember ? colors.theme : colors.grey},
                  ]}
                />
              </Pressable>
              <Text style={styles.rememberMe}>Remember me</Text>
            </View>
            <Text
              onPress={() => {
                navigation.navigate(routes.forget);
              }}
              style={styles.forgetText}>
              Forgot Password
            </Text>
          </View>

          <Button
            onPress={() => {
              // navigation.navigate(routes.tab);
              login();
            }}
            containerStyle={{
              marginTop: widthPixel(60),
            }}>
            Sign In
          </Button>

          <View style={styles.dividerContainer}>
            <View style={styles.divider}></View>
            <Text style={styles.continueText}>or continue with</Text>
          </View>
          <View style={styles.socialLoginContainer}>
            <SocialLogin
              icon={appIcons.googleIcon}
              handleClick={handleGoogleLogin}
            />
            <SocialLogin
              icon={appIcons.appleIcon}
              handleClick={handleAppleLogin}
            />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don’t have an account?{' '}
              <Text
                onPress={() => {
                  navigation.navigate(routes.signup);
                }}
                style={{
                  color: colors.theme,
                  fontFamily: fontFamily.MontserratMedium,
                }}>
                Sign Up
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Loader>
  );
};

export default LoginScreen;
