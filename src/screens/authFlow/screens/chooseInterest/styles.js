import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(16),
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPixel(16),
  },
  headerText: {
    fontSize: fontPixel(20),
    color: colors.black,
    fontFamily: fontFamily.MontserratSemiBold,
  },
  backIcon: {
    height: heightPixel(24),
    width: heightPixel(24),
    resizeMode: 'contain',
    marginRight: widthPixel(10),
  },
  desc: {
    fontSize: fontPixel(16),
    width: '98%',
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.MontserratRegular,
    marginTop: heightPixel(16),
  },
  listBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: heightPixel(16),
  },
  item: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: widthPixel(12),
    paddingVertical: widthPixel(5),
    margin: 4,
    borderColor: colors.grey,
  },
  itemText: {
    fontSize: fontPixel(14),
    color: colors.grey,
    fontFamily: fontFamily.MontserratRegular,
  },
});
