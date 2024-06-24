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
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    color: colors.lightText,
    marginTop: heightPixel(10),
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(14),
  },

  heading: {
    color: colors.blackText,
    marginTop: heightPixel(10),
    fontFamily: fontFamily.MontserratMedium,
    fontSize: fontPixel(16),
  },
  row: {
    flexDirection: 'row',
    marginTop: heightPixel(16),
  },
  icon: {
    height: heightPixel(23),
    width: heightPixel(23),
    resizeMode: 'contain',
    marginRight: widthPixel(8),
  },
});
