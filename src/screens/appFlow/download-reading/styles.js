import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontPixel, widthPixel} from '../../../services';

export const styles = StyleSheet.create({
  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconUploadStyles: {
    width: widthPixel(20),
    height: widthPixel(20),
    resizeMode: 'contain',
    marginHorizontal: widthPixel(10),
  },
  iconShareStyles: {
    width: widthPixel(20),
    height: widthPixel(20),
    resizeMode: 'contain',
    marginHorizontal: widthPixel(10),
  },
  playPauseImageStyles: {
    width: widthPixel(20),
    height: widthPixel(20),
    resizeMode: 'contain',
  },
  playPauseBtnStyles: {
    padding: widthPixel(20),
    borderRadius: widthPixel(100),
    backgroundColor: colors.theme,
    alignSelf: 'center',
  },
  doubleSpeedImageStyles: {
    width: widthPixel(20),
    height: widthPixel(20),
    resizeMode: 'contain',
  },
  progressTextStyles: {
    color: colors.grey,
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(13),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '85%',
    marginLeft: widthPixel(10),
  },
  flexContainer: {
    flexDirection: 'row',
    width: '95%',
  },
  bottomContainer: {
    width: '100%',
    padding: 10,
    height: widthPixel(150),
    backgroundColor: 'white',
  },
  readingStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(15),
    lineHeight: widthPixel(20),
    color: 'black',
  },
  scrollViewStyles: {
    marginHorizontal: widthPixel(15),
    marginVertical: widthPixel(10),
  },
  safeAreaViewStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
});
