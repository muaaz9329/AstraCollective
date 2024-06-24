import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from '../../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: heightPixel(16),
    paddingHorizontal: heightPixel(16),
  },
  wrapper: {
    flex: 1,

    // alignItems: "center"
  },
  logo: {
    height: heightPixel(40),
    width: widthPixel(40),
    resizeMode: 'contain',
  },
  heading: {
    color: colors.blackText,
    lineHeight: 46,
    fontFamily: fontFamily.MontserratBold,
    textAlign:'center',
    fontSize: 24,
    marginVertical: heightPixel(16),
    marginHorizontal: widthPixel(8),
  },
  desc: {
    color: colors.lightText,
    fontFamily: fontFamily.MontserratMedium,
    fontSize: 20,
    lineHeight: 24,
    marginVertical: heightPixel(16),
  },
  skip: {
    color: colors.theme,

    fontFamily: fontFamily.MontserratBold,
    fontSize: 16,
    alignSelf: 'flex-end',
    marginTop: heightPixel(16),
  },
  image: {
    height: heightPixel(320),
    marginTop: heightPixel(16),
    width: widthPixel(320),
    alignSelf: 'center',
  },
  activeDot: {
    height: 10,
    width: 40,
    marginRight: 6,
    borderRadius: 10 / 2,
    backgroundColor: colors.theme,
  },
  dot: {
    backgroundColor: colors.grey,
    height: 10,
    marginRight: 6,
    width: 10,
    borderRadius: 10 / 2,
  },
});
