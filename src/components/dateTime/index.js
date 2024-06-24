import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import React, { useState } from 'react';

import {
    appIcons,
    colors,
    fontFamily,
    fontPixel,
    heightPixel,
    widthPixel,
} from '../../services';
import DatePicker from 'react-native-date-picker';

const DateTime = ({
    label = "",
    mode = "date",
    onSelect,
    selected = ""

}) => {

    const [open, setOpen] = useState(false)

    return (
        <View style={{ marginTop: heightPixel(20) }} >
            {
                label &&
                <Text style={styles.label} >{label}</Text>
            }
            <Pressable onPress={() => { setOpen(true) }} style={styles.mainContainer}>
                {
                    mode == "date" ?
                        <Text style={styles.textInput}>{new Date(selected).toLocaleDateString()}</Text>
                        :
                        <Text style={styles.textInput}>{new Date(selected).toTimeString().slice(0, 5)}</Text>

                }
                <Image
                    source={mode == "date" ? appIcons.calenderTab : appIcons.iconClock}
                    style={styles.iconStyle}
                />
            </Pressable>

            <DatePicker
                modal
                mode={mode}
                open={open}
                date={new Date(selected)}
                onConfirm={(date) => {
                    setOpen(false)
                    onSelect(date.getTime())
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

        </View>
    );
};

export default DateTime;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: heightPixel(48),
        borderRadius: heightPixel(10),
        backgroundColor: colors.lightBackground,
        flexDirection: 'row',
        alignItems: 'center',
    },

    textInput: {
        flex: 2,
        fontFamily: fontFamily.MontserratRegular,
        color: colors.lightText,
        fontSize: fontPixel(16),
        marginHorizontal: widthPixel(8),

    },
    iconStyle: {
        width: widthPixel(18),
        resizeMode: "contain",
        height: widthPixel(18),
        tintColor: colors.greyIcon,

        marginRight: widthPixel(8),
    },
    label: {
        fontFamily: fontFamily.MontserratSemiBold,
        color: colors.blackText,
        fontSize: fontPixel(16),
        marginBottom: heightPixel(8)
    },
    body: {
        backgroundColor: colors.lightBackground,
        width: "99%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 16,
        borderRadius: heightPixel(10),

    },
    bodyItem: {
        marginVertical: heightPixel(6),
        fontSize: fontPixel(16),
        fontFamily: fontFamily.MontserratRegular,
        color: colors.black,
        borderBottomWidth: 1,
        borderColor: colors.grey
    }
});
