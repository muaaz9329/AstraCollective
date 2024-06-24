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
    fontSize: fontPixel(14),
    color: colors.lightText,
    flex: 2,
    lineHeight: 24,
    fontFamily: fontFamily.MontserratMedium,
  },
});
