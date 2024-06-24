import {StyleSheet} from 'react-native';
import {Montserrat, colors, widthPixel} from '../../../services';

const styles = StyleSheet.create({
  textInputStyles: {
    padding: 10,
    color: 'black',
    fontWeight: Montserrat(400),
    fontSize: widthPixel(16),
    maxHeight: widthPixel(200),
  },
  postTextStyles: {
    fontFamily: Montserrat(600),
    fontSize: widthPixel(18),
    color: colors.theme,
  },
});

export default styles;
