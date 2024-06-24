import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(10),
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInput: {
    color: colors.blackText,
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(14),
    borderRadius: 12,
    minHeight: heightPixel(230),
    textAlignVertical: 'top',
  },
  storyInputWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(12),
    marginHorizontal: widthPixel(16),
    marginVertical: heightPixel(16),
  },

  heading: {
    color: colors.theme,
    marginTop: heightPixel(12),
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(24),
    alignSelf: 'center',
  },

  continueText: {
    color: colors.theme,
    fontFamily: fontFamily.MontserratMedium,
    fontSize: fontPixel(14),
  },
  generateRow: {
    flexDirection: 'row',
    marginBottom: heightPixel(16),
    alignSelf: 'center',
    alignItems: 'center',
  },
  forwardIcon: {
    transform: [{rotate: '180deg'}],
    height: heightPixel(14),
    width: widthPixel(14),
    resizeMode: 'contain',
    tintColor: colors.theme,
    marginLeft: widthPixel(8),
  },
});
