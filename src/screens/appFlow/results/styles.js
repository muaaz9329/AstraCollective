import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontPixel, heightPixel, widthPixel, wp } from '../../../services';





export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    itemBox: {
        width: "94%",
        borderRadius: 12,
        backgroundColor: colors.white,
        elevation: 5,
        alignSelf: "center",
        flexDirection: "row",
        marginTop: heightPixel(16),
        padding: 12
    },
    bookImage: {
        height: heightPixel(96),
        width: widthPixel(78),
        resizeMode: "contain"
    },
    itemIcon: {
        height: heightPixel(24),
        width: heightPixel(24),
        resizeMode: "contain",
    },
    name: {
        fontFamily: fontFamily.MontserratSemiBold,
        fontSize: fontPixel(20),
        color: colors.black,
    },
    category: {
        fontFamily: fontFamily.MontserratSemiBold,
        fontSize: fontPixel(16),
        color: colors.grey,
    },
    duration: {
        fontFamily: fontFamily.MontserratSemiBold,
        fontSize: fontPixel(15),
        marginTop: heightPixel(24),
        color: colors.black,
    },


})