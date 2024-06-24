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
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPixel(70),
  },
  logoStyle: {
    width: widthPixel(100),
    height: heightPixel(100),
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  forgetPasswordTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPixel(20),
  },
  forgetText: {
    color: colors.theme,
    marginTop: heightPixel(10),
    fontFamily: fontFamily.MontserratSemiBold,
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPixel(30),
  },
  divider: {
    width: '98%',
    borderWidth: 0.5,
    borderColor: '#e1e4e8',
  },
  continueText: {
    color: '#a0a0a0',
    backgroundColor: colors.white,
    bottom: heightPixel(14),
    fontFamily: fontFamily.MontserratMedium,
    fontSize: fontPixel(16),
    width: widthPixel(170),
    textAlign: 'center',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: heightPixel(16),
  },
  signUpContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: heightPixel(20),
  },
  signUpText: {
    color: '#808080',
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(14),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPixel(16),
  },
  check: {
    height: heightPixel(24),
    width: widthPixel(24),
    resizeMode: 'contain',
    marginRight: widthPixel(10),
  },
  rememberMe: {
    color: colors.blackText,
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(16),
  },
});
