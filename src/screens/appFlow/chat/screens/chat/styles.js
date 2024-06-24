import {StyleSheet} from 'react-native';
import {colors, fontFamily, widthPixel} from '../../../../../services';
export const styles = StyleSheet.create({
  messageContainer: {
    width: '90%',
    height: 50,
    borderRadius: 70,
    backgroundColor: '#faf8f8',
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  textInputStyle: {
    flex: 1,
    fontFamily: fontFamily.MontserratMedium,
    fontSize: widthPixel(14),
    color: colors.black,
    marginLeft: widthPixel(10),
  },
  microphoneStyles: {
    height: widthPixel(25),
    width: widthPixel(25),
    resizeMode: 'contain',
    marginHorizontal: widthPixel(5),
  },
  sendStyle: {
    height: widthPixel(25),
    width: widthPixel(25),
    resizeMode: 'contain',
    marginHorizontal: widthPixel(5),
  },
});
