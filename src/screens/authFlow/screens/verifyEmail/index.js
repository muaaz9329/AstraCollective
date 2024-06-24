import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import {styles} from './styles';
import {appIcons, colors, heightPixel, routes} from '../../../../services';
import AuthHeading from '../../../../components/authHeading/authHeading';
import {GreenSnackbar, RedSnackbar} from '../../../../services/helpingMethods';

import {useDispatch} from 'react-redux';
import Button from '../../../../components/button';
import {AuthHeader} from '../../../../components';
import useApi from './hooks/use-api';
import Loader from '../../../../components/loader/Loader';
import {useRoute} from '@react-navigation/native';
const VerifyEmail = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {routeTo, verificationOf} = useRoute()?.params;

  const {setIsOTP, loading, count, sendOtpAgain, isOTP, verificationCallback} =
    useApi(navigation, routeTo, verificationOf);

  return (
    <Loader loading={loading}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <AuthHeading
            icon={appIcons.iconKey}
            isBack={true}
            text1={'You’ve Got Mail'}
            text2={
              'We have send the OTP verification code to your email address. Check your email and enter the code below.'
            }
          />

          <OTPTextView
            containerStyle={{marginTop: heightPixel(22)}}
            textInputStyle={styles.underlineStyleBase}
            tintColor={colors.theme}
            offTintColor={colors.grey}
            handleTextChange={setIsOTP}
            //handleCellTextChange={handleCellTextChange}
            inputCount={4}
            keyboardType="numeric"
          />
          <View style={styles.timerContainer}>
            <Text style={styles.sendText}>Didn’t receive email?</Text>

            {count != 0 ? (
              <Text style={styles.sendText}>
                You can resend code in{' '}
                <Text style={{color: colors.theme}}>{count}</Text> s
              </Text>
            ) : (
              <Text
                style={[
                  styles.sendText,
                  {
                    color: colors.theme,
                    textDecorationLine: 'underline',
                  },
                ]}
                onPress={sendOtpAgain}>
                Resend Code
              </Text>
            )}
          </View>
        </KeyboardAwareScrollView>
        <Button
          onPress={() => {
            verificationCallback();
            // console.log("I ran")
          }}>
          Verify
        </Button>
      </View>
    </Loader>
  );
};

export default VerifyEmail;
