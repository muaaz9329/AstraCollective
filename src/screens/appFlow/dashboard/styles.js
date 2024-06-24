import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
  wp,
} from '../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemBox: {
    width: '94%',
    borderRadius: 12,
    backgroundColor: colors.white,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: heightPixel(16),
    padding: 12,
  },
  bookImage: {
    height: heightPixel(96),
    width: widthPixel(78),
    resizeMode: 'contain',
  },
  itemIcon: {
    height: heightPixel(24),
    width: heightPixel(24),
    resizeMode: 'contain',
  },
  name: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(20),
    color: colors.black,
  },
  category: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(16),
    color: colors.grey,
  },
  duration: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(15),
    marginTop: heightPixel(24),
    color: colors.black,
  },

  seeAllContainer: {
    marginHorizontal: widthPixel(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: heightPixel(12),
  },
  headingStyle: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(18),
    color: colors.black,
  },
  floatIconBox: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 1,
  },
  floatIcon: {
    height: heightPixel(60),
    width: heightPixel(60),
    resizeMode: 'contain',
  },
  titleStyles: {
    fontSize: fontPixel(18),
    // marginLeft: widthPixel(8),
    color: colors.theme,
    fontFamily: fontFamily.MontserratBold,
  },
});
