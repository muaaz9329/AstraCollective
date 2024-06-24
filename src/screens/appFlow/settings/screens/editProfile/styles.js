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
    paddingHorizontal: widthPixel(16),
    paddingBottom: heightPixel(10),
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: heightPixel(120),
    width: heightPixel(120),
    borderRadius: heightPixel(120) / 2,
    marginTop: heightPixel(16),
    alignSelf: 'center',
  },
  imageStyle: {
    height: heightPixel(120),
    width: heightPixel(120),
    borderRadius: heightPixel(120) / 2,
    borderWidth: 1.5,
    borderColor: colors.grey,
  },
  iconContainer: {
    height: heightPixel(24),
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 10,
    width: heightPixel(24),
    borderRadius: heightPixel(24) / 2,
    backgroundColor: colors.theme,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    right: 7,
  },
  iconStyle: {
    height: heightPixel(42),
    width: heightPixel(42),
    resizeMode: 'contain',
  },
  label: {
    fontFamily: fontFamily.MontserratSemiBold,
    color: colors.blackText,
    fontSize: fontPixel(16),
    marginVertical: heightPixel(10),
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    alignItems: 'center',
    marginVertical: heightPixel(10),
  },
});
