import {StyleSheet} from 'react-native';
import {widthPixel} from '.';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },

  secondaryContainer: {
    paddingHorizontal: widthPixel(15),
    paddingVertical: widthPixel(10),
    flex: 1,
  },
});

export default globalStyles;
