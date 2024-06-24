import {StyleSheet} from 'react-native';
import {heightPixel, widthPixel} from '../../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: heightPixel(150),
    width: widthPixel(150),
    resizeMode: 'contain',
  },
  loaderIcon: {
    height: heightPixel(70),
    marginBottom: heightPixel(22),
    width: widthPixel(70),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
