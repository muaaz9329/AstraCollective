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
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: heightPixel(280),
    width: heightPixel(280),
    resizeMode: 'contain',
  },
  desc: {
    fontSize: fontPixel(16),
    width: '90%',
    textAlign: 'center',
    lineHeight: 24,
    color: colors.grey,
    fontFamily: fontFamily.MontserratRegular,
    marginTop: heightPixel(16),
  },
  welcome: {
    fontSize: fontPixel(28),
    marginTop: heightPixel(24),
    color: colors.black,
    fontFamily: fontFamily.MontserratSemiBold,
  },
});
