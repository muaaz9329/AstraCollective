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
import {
  ErrorFlashMessage,
  GreenSnackbar,
  RedSnackbar,
  isEmailValid,
} from '../../../../services/helpingMethods';
import Button from '../../../../components/button';
import {AuthInput} from '../../../../components';
import useApi from './hooks/use-api';
import Loader from '../../../../components/loader/Loader';
import useSocialLogins from '../../../../hooks/useSocialLogins';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
const SignupScreen = ({navigation}) => {
  const {
    loading,
    signUpUser,
    remember,
    setCPassword,
    setEmail,
    setPassword,
    setRemember,
    setSecureCTextEntry,
    setSecureTextEntry,
    cpassword,
    secureCTextEntry,
    secureTextEntry,
    email,
    password,
    socialLogin,
  } = useApi(navigation);

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


  const handleAppleLogin = async () =>{
    if(Platform.OS ==='ios'){
     
      
        
         
           const appleAuthRequestResponse = await appleAuth.performRequest({
             requestedOperation: appleAuth.Operation.LOGIN,
             requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
           });
           if (!appleAuthRequestResponse.identityToken) {
             throw new Error('Apple Sign-In failed - no identify token returned');
           }
   
           console.log(appleAuthRequestResponse.identityToken)
           // console.log('jwt decode --->',jwt_decode(
           //   appleAuthRequestResponse.identityToken,
           // ))
   
           const {email , email_verified} = jwt_decode(appleAuthRequestResponse.identityToken)
   
           console.log({email , email_verified})
           await socialLogin(email)
         
     
    
    }
    else{
     Alert.alert("Only Available for ios devices")
    }
   }

  return (
    <Loader loading={loading}>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthHeading
            isBack={true}
            icon={appIcons.iconPencil}
            text1={'Create Your account'}
            text2={
              'Please enter your username, email address and password. If you forget it, then you have to do forgot password.'
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
          <Button
            onPress={() => {
              // navigation.navigate(routes.verifyEmail);
              signUpUser();
            }}
            containerStyle={{
              marginTop: widthPixel(50),
            }}>
            Create Account
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
            <SocialLogin icon={appIcons.appleIcon} handleClick={handleAppleLogin} />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have an account?{' '}
              <Text
                onPress={() => {
                  navigation.navigate(routes.login);
                  // signUpUser();
                }}
                style={{
                  color: colors.theme,
                  fontFamily: fontFamily.MontserratMedium,
                }}>
                Sign In
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Loader>
  );
};

export default SignupScreen;
