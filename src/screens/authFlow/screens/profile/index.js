import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  appIcons,
  appRoutes,
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
import {userDataSave} from '../../../../redux/Slices/userDataSlice';
import {
  InitialSignUpStep,
  setInitialSignupStep,
} from '../../../../redux/Slices/signupSlice';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
const CreateProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const onPressLoginn = () => {
  //   dispatch(userSave(true));
  //   navigation.replace(routes.tab);
  // };

  const {
    loading,
    setFullName,
    fullName,
    setProfileName,
    userData,
    addProfileImage,
  } = useApi(navigation);

  // console.log('userData', userData);

  return (
    <Loader loading={loading}>
      <SafeAreaView style={[styles.container]}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthHeading icon={appIcons.iconPencil} text1={'Your Profile'} />
          <View style={styles.imageBox}>
            <Image
              style={styles.userImage}
              source={{
                uri: fullName?.image,
              }}
            />
            <TouchableOpacity
              style={styles.cameraBox}
              onPress={addProfileImage}>
              <Image style={styles.camera} source={appIcons.iconCamera} />
            </TouchableOpacity>
          </View>

          <AuthInput
            label={'User Name'}
            value={fullName.userName}
            onChangeText={text => {
              setFullName({...fullName, userName: text});
            }}
            placeholder={'Enter User name'}
            bottomText={'Username must be one unique.'}
          />
          <AuthInput
            label={'First Name'}
            value={fullName.first}
            onChangeText={text => {
              setFullName({...fullName, first: text});
            }}
            placeholder={'Enter First name'}
          />
          <AuthInput
            label={'Last Name'}
            value={fullName.last}
            onChangeText={text => {
              setFullName({...fullName, last: text});
            }}
            placeholder={'Enter Last name'}
          />
        </KeyboardAwareScrollView>
        <Button
          onPress={() => {
            // navigation.navigate(routes.chooseInterest);
            setProfileName();
          }}>
          Continue
        </Button>
      </SafeAreaView>
    </Loader>
  );
};

export default CreateProfileScreen;
