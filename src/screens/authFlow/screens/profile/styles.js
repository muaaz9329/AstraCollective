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
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: heightPixel(150),

    width: heightPixel(150),
    // resizeMode: 'contain',
    borderRadius: heightPixel(150 / 2),
  },
  imageBox: {
    marginVertical: heightPixel(24),

    alignSelf: 'center',
  },
  cameraBox: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  camera: {
    height: heightPixel(40),

    width: heightPixel(40),
    resizeMode: 'contain',
  },
});
