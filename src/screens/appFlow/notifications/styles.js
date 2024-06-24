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
    
  },

  notifiView: {
    marginVertical: heightPixel(10.24),

  },
  notiInnerOne: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPixel(10.28),
  },
  notiInnerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    height: heightPixel(45),
    width: widthPixel(45),
    marginRight: widthPixel(10),
    resizeMode: 'contain',
  },
  heading: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(16),
    color: 'black',
    marginBottom: heightPixel(5.14),
  },
  time: {
    fontFamily: fontFamily.MontserratLight,
    fontSize: fontPixel(14),
    color: 'rgba(0,0,0,0.4)',
  },
  des: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(14),
    color: 'black',
  },
});
