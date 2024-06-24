import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {styles} from './styles';
import {
  appIcons,
  appRoutes,
  colors,
  fontFamily,
  heightPixel,
  routes,
  widthPixel,
} from '../../../../../services';
import AuthHeading from '../../../../../components/authHeading/authHeading';
import {
  ErrorFlashMessage,
  GreenSnackbar,
  RedSnackbar,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';

import CountDown from 'react-native-countdown-component';
import {useDispatch} from 'react-redux';
import Button from '../../../../../components/button';
import {AuthHeader, Header} from '../../../../../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../../../services/constants/globalStyles';
import {apiService} from '../../../../../network';
import {store} from '../../../../../redux/store';
import {getDeviceObject} from '../../../../../services/config/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Loader from '../../../../../components/loader/Loader';
const DeleteVerify = ({n, route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isOTP, setIsOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendAgain, setSendAgain] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const verifyClicked = () => {
    if (isOTP == '') {
      RedSnackbar('Please enter otp!');
      return;
    }
  };

  const resendOtp = async () => {
    setSendAgain(false);
    setIsOTP(isOTP == 60 ? 61 : 60);
  };

  const deleteVerifyOtp = async () => {
    const deviceToken = await getDeviceObject();
    apiService.Post({
      url: routes.deleteVerify,
      body: {
        email: store.getState()?.userData?.userData?.email,
        otp: isOTP,
        ...deviceToken,
      },
      OnSuccess: res => {
        SuccessFlashMessage('Account deleted successfully');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: appRoutes.auth, routes: appRoutes.wizard}],
          }),
        );
      },
      OnError: res => {
        ErrorFlashMessage('Something went wrong, please try again', res);
      },
      setLoading,
    });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Header isBack={true} title={'Verification'} />
      <Loader loading={loading} />
      <View style={[globalStyles.secondaryContainer]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontFamily: fontFamily.MontserratRegular,
              fontSize: widthPixel(16),
              color: colors.black,
              marginTop: heightPixel(20),
            }}>
            For added security, we'll send an OTP code to your registered mobile
            number. Please enter the code in the field below to confirm your
            account deletion.
          </Text>
          <Image source={appIcons.otpImage} style={styles.otpImage} />
          <OTPInputView
            pinCount={4}
            style={styles.OTPView}
            onCodeChanged={setIsOTP}
            selectionColor={colors.theme}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
          <View style={styles.timerContainer}>
            {/* <Text style={styles.timerText}>00:54</Text> */}

            {/* <CountDown
            until={countdown}
            size={16}
            onFinish={() => { setSendAgain(true) }}
            digitStyle={styles.timerText}
            digitTxtStyle={styles.timerText}
            showSeparator={true}
            separatorStyle={{ fontSize: 16, color: colors.black }}
            timeToShow={['M', 'S']}
            timeLabels={{ m: 'MM', s: 'SS' }}
            timeLabelStyle={{ display: 'none' }}
          /> */}
            {/* <Text style={styles.timerText}>01 : 00</Text>
            {sendAgain && (
              <Text style={styles.sendText}>
                Didn’t get code? -{' '}
                <Text
                  onPress={() => {
                    resendOtp();
                  }}
                  style={{
                    color: colors.theme,
                    textDecorationLine: 'underline',
                  }}>
                  Resend code
                </Text>
              </Text>
            )} */}
          </View>
        </KeyboardAwareScrollView>
        <Button
          containerStyle={{
            backgroundColor: colors.errorColor,
          }}>
          Delete
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default DeleteVerify;
