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

const DropDown = ({
    label = "",
    placeholder,
    data = [],
    value,
    onSelect,
    selected = ""

}) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <View style={{ marginTop: heightPixel(20) }} >
            {
                label &&
                <Text style={styles.label} >{label}</Text>
            }
            <Pressable onPress={() => { setExpanded(!expanded) }} style={styles.mainContainer}>
                <Text style={styles.textInput}>{selected ? selected : placeholder}</Text>
                <Image
                    source={appIcons.iconForward}
                    style={styles.iconStyle}
                />
            </Pressable>
            {
                expanded ?
                    <View style={styles.body} >
                        <ScrollView style={{ maxHeight: heightPixel(100) }} nestedScrollEnabled={true} >
                            {
                                data.map((item, index) => {
                                    return (
                                        <Text key={index} onPress={() => { onSelect(item), setExpanded(false) }} style={styles.bodyItem} >{item}</Text>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    :
                    <></>
            }
        </View>
    );
};

export default DropDown;

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
        width: widthPixel(14),
        resizeMode: "contain",
        height: widthPixel(14),

        marginRight: widthPixel(8),
        transform: [{ rotate: '90deg' }]
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
