import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(16),
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPixel(40),
  },
  logoStyle: {
    width: widthPixel(65),
    height: heightPixel(82),
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  OTPView: {
    alignSelf: 'center',
    width: '65%',
    height: heightPixel(100),
  },
  underlineStyleBase: {
    width: widthPixel(62),
    // height: heightPixel(48),
    color: colors.blackText,
    borderRadius: widthPixel(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: colors.lightBackground,

    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(16),
  },
  underlineStyleHighLighted: {
    borderColor: colors.theme,
  },
  timerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPixel(20),
  },
  timerText: {
    fontFamily: fontFamily.MontserratRegular,
    fontWeight: '600',
    fontSize: fontPixel(16),
    color: colors.black,
  },
  sendText: {
    fontFamily: fontFamily.MontserratMedium,
    color: colors.blackText,
    fontSize: fontPixel(16),
    marginTop: heightPixel(12),
  },
  otpImage: {
    width: widthPixel(158),
    height: heightPixel(108),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: heightPixel(10),
  },
});
