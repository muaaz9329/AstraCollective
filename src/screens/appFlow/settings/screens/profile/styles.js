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
  },
  wrapper: {
    flex: 1,
    padding: widthPixel(16),
  },
  userImage: {
    height: heightPixel(100),
    width: heightPixel(100),
    borderRadius: heightPixel(100) / 2,
    alignSelf: 'center',
    marginTop: heightPixel(16),
  },
  userName: {
    fontSize: fontPixel(16),
    color: colors.blackText,
    alignSelf: 'center',
    fontFamily: fontFamily.MontserratSemiBold,
    marginTop: heightPixel(10),
  },
  userEmail: {
    fontSize: fontPixel(14),
    color: colors.lightText,
    alignSelf: 'center',
    fontFamily: fontFamily.MontserratRegular,
    marginTop: heightPixel(10),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingVertical: heightPixel(8),
    paddingBottom: heightPixel(12),
    marginTop: heightPixel(8),
    borderColor: colors.greyLight,
  },
  listIcon: {
    height: heightPixel(24),
    width: heightPixel(24),
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  listName: {
    fontSize: fontPixel(16),
    color: colors.blackText,
    flex: 2,
    marginLeft: widthPixel(8),
    fontFamily: fontFamily.MontserratMedium,
  },
  iconForward: {
    height: heightPixel(12),
    tintColor: colors.black,
    width: heightPixel(12),
    resizeMode: 'contain',
  },
  premiumBox: {
    flexDirection: 'row',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(8),
    justifyContent: 'space-between',
    borderWidth: 1.5,
    marginVertical: heightPixel(12),
    marginTop: heightPixel(16),
    alignItems: 'center',
    borderRadius: 36,
    borderColor: colors.theme,
  },
  upgrade: {
    height: heightPixel(60),
    tintColor: colors.theme,
    width: heightPixel(60),
    resizeMode: 'contain',
  },
  planText: {
    fontSize: fontPixel(16),
    color: colors.blackText,
    flex: 2,
    top: 4,

    fontFamily: fontFamily.MontserratSemiBold,
  },
  planPrice: {
    fontSize: fontPixel(16),
    color: colors.theme,
    flex: 0.7,
    fontFamily: fontFamily.MontserratRegular,
  },
});
