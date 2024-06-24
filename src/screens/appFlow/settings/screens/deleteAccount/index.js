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
  routes as appRoutes,
} from '../../../../../services';
import {styles} from './styles';
import AuthHeading from '../../../../../components/authHeading/authHeading';
import SocialLogin from '../../../../../components/socialLogin/socialLogin';
import {
  ErrorFlashMessage,
  GreenSnackbar,
  RedSnackbar,
  SuccessFlashMessage,
  isEmailValid,
} from '../../../../../services/helpingMethods';
import Button from '../../../../../components/button';
// import  from '../../../../../network/appRoutes';
import {AuthHeader, AuthInput, Header} from '../../../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import useApi from './hooks/useApi';
import Loader from '../../../../../components/loader/Loader';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';

const DeleteAccount = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const deleteAccount = async () => {
    apiService.Post({
      url: routes.deleteAccount,
      body: {
        password: password,
      },
      OnSuccess: res => {
        console.log(res);
        SuccessFlashMessage('OTP send to email');
        navigation.navigate(appRoutes.deleteVerify);
      },
      OnError: res => {
        console.log(res);
        ErrorFlashMessage('Something went wrong', res);
      },
      setLoading,
    });
  };

  return (
    <Loader loading={loading}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <Header title={'Delete Account'} isBack={true} />

        <View style={[styles.container]}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
              <Image source={appIcons.deleteConfirm} style={styles.icon} />
              <Text style={[styles.heading, {marginTop: 0}]}>
                Delete your account will:
              </Text>
            </View>
            <Text style={styles.desc}>
              We're sorry to see you go. If you're sure you want to delete your
              Astra Collective account, please be aware that this action is
              permanent and cannot be undone. All of your personal information,
              including your jokes and settings, will be permanently deleted.
            </Text>
            <Text style={styles.desc}>
              If you're having trouble with your account or have concerns,
              please reach out to us at [contact email or support page] before
              proceeding with the account deletion. We'd love to help you
              resolve any issues and keep you as a valued Astra Collective user.
            </Text>

            <Text style={[styles.heading, {marginTop: heightPixel(20)}]}>
              To Delete your Account Confirm your Password
            </Text>

            <AuthInput
              label={'Password'}
              // value={password}
              onChangeText={text => {
                console.log(text);
                setPassword(text);
              }}
              secure={secureTextEntry}
              setSecure={setSecureTextEntry}
              placeholder={'Enter password'}
              secureTextEntry={true}
            />

            <Text style={styles.desc}>
              To delete your account, please enter your password in the field
              below and confirm your decision by clicking the 'Delete My
              Account' button.
            </Text>
          </KeyboardAwareScrollView>

          <Button
            onPress={() => {
              deleteAccount();
            }}>
            Delete Account
          </Button>
        </View>
      </SafeAreaView>
    </Loader>
  );
};

export default DeleteAccount;
