import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(10),
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
    color: colors.black,
  },
  underlineStyleBase: {
    width: widthPixel(48),
    height: heightPixel(48),
    borderWidth: 1,
    borderRadius: widthPixel(10),
    backgroundColor: colors.lightBackground,
    color: '#0a0f0d',
    fontFamily: fontFamily.MontserratMedium,
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
    fontFamily: fontFamily.MontserratRegular,
    color: colors.black,
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
