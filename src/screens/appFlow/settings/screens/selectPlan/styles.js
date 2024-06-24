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

    paddingBottom: heightPixel(10),
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInput: {
    backgroundColor: 'rgba(0, 118, 233, 0.03)',
    borderColor: colors.theme,
    marginHorizontal: widthPixel(16),
    marginVertical: heightPixel(16),
    borderRadius: 40,
    borderWidth: 1.5,
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(15),
    paddingTop:heightPixel(25),
    minHeight: heightPixel(230),
    textAlignVertical: 'top',
  },
  divider: {
    height: 2,
    marginVertical: heightPixel(12),
    backgroundColor: colors.greyLight,
  },

  heading: {
    color: colors.blackText,
    marginTop: heightPixel(12),
    fontFamily: fontFamily.MontserratMedium,
    lineHeight: 24,
    fontSize: fontPixel(16),
    alignSelf: 'center',
    paddingHorizontal: widthPixel(16),
  },

  continueText: {
    color: colors.white,
    fontFamily: fontFamily.MontserratMedium,
    fontSize: fontPixel(16),
  },

  forwardIcon: {
    transform: [{rotate: '180deg'}],
    height: heightPixel(14),
    width: widthPixel(14),
    resizeMode: 'contain',
    tintColor: colors.white,
    marginLeft: widthPixel(16),
  },
  subscribeButton: {
    flexDirection: 'row',
    paddingHorizontal: widthPixel(28),
    borderRadius: 100,
    paddingVertical: heightPixel(14),
    backgroundColor: colors.theme,
    marginBottom: heightPixel(16),
    alignSelf: 'center',
    alignItems: 'center',
  },
  upgrade: {
    height: heightPixel(60),
    width: heightPixel(60),
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: colors.theme,
  },
  planText: {
    fontSize: fontPixel(16),
    alignSelf: 'center',
    color: 'black',
    fontFamily: fontFamily.MontserratSemiBold,
  },
  planPrice: {
    fontSize: fontPixel(16),
    marginTop: heightPixel(12),
    color: colors.theme,
    alignSelf: 'center',
    fontFamily: fontFamily.MontserratSemiBold,
    color: 'black',
  },
  horizontalFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPixel(12),
  },
  checkboxImage: {
    width: widthPixel(16),
    height: heightPixel(16),
    resizeMode: 'contain',
    marginRight: widthPixel(10),
  },
  packageText: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(13),
    color: 'black',
  },
});
