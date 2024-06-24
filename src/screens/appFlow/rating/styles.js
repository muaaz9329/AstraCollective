import {Platform, StyleSheet} from 'react-native';
import {colors, fontFamily, heightPixel, widthPixel} from '../../../services';

export const styles = StyleSheet.create({
  cancelTextStyles: {
    color: colors.theme,
  },
  submitBtnStyles: {
    width: '45%',
  },
  cancelBtnStyles: {
    width: '45%',
    borderWidth: 1,
    borderColor: colors.theme,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: widthPixel(10),
    marginBottom: heightPixel(10),
  },
  textStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(14),
    color: colors.description,
  },
  textContainer: {
    width: '85%',
    marginTop: heightPixel(15),
    padding: widthPixel(10),
    backgroundColor: colors.lightBackground,
    borderRadius: widthPixel(10),
    height:Platform.OS ==='ios' && widthPixel(80)
  },
  description: {
    fontSize: widthPixel(14),
    fontFamily: fontFamily.MontserratRegular,
    color: colors.black,

    marginVertical: heightPixel(10),
    textAlign: 'center',
    paddingHorizontal: widthPixel(10),

  },
  titleStyles: {
    fontSize: widthPixel(24),
    fontFamily: fontFamily.MontserratSemiBold,
    color: colors.black,
    marginVertical: heightPixel(20),
  },
  imageStyles: {
    width: widthPixel(200),
    height: heightPixel(250),
    borderRadius: widthPixel(20),
  },
  imageContainer: {
    borderRadius: widthPixel(20),
    width: widthPixel(160),
    height: heightPixel(250),
    alignItems: 'center',

    overflow: 'hidden',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  safeAreaViewStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
});
