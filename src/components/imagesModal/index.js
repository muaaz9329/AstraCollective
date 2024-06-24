import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { appIcons, colors, fontFamily, fontPixel, heightPixel, routes, widthPixel } from '../../services';


const ImagesView = (props) => {
    const images = [
        "https://www.thestreet.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY4NjM4OTY4NjkyNzQ2MTM1/best-amusement-parks-in-the-world.jpg",
        "https://trevo.my/stories/wp-content/uploads/2022/03/Theme-Parks-Water-Parks-in-KL-1200x600.jpg",
        "https://i.tribune.com.pk/media/images/1022962-IMG_copy-1452094566/1022962-IMG_copy-1452094566.jpg"
    ]
    const [index, setIndex] = useState(0)

    return (

        <Modal transparent={true} onRequestClose={() => { props.setActive(false) }} visible={props.active}>
            <View style={styles.mainContainer} >
                <Pressable onPress={() => { props.setActive(false) }} style={styles.closeButton} >
                    <Text style={styles.closeText} >X</Text>
                </Pressable>
                <View style={styles.body} >
                    <View style={styles.row} >
                        <Pressable onPress={() => { index > 0 && setIndex(index - 1) }} >
                            <Image source={appIcons.iconForward} style={[styles.icon, { transform: [{ rotate: '180deg' }] }]} />
                        </Pressable>
                        <Image source={{ uri: images[index] }} style={styles.imageView} />
                        <Pressable onPress={() => { index < images.length - 1 && setIndex(index + 1) }} >
                            <Image source={appIcons.iconForward} style={styles.icon} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ImagesView;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        paddingHorizontal: widthPixel(16),
        justifyContent: "center"

    },
    body: {
        height: heightPixel(400),
        borderRadius: heightPixel(12),
        width: "100%",
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
    },
    closeButton: {
        height: heightPixel(32),
        width: heightPixel(32),
        borderRadius: heightPixel(32) / 2,
        backgroundColor: colors.greyIcon,
        margin: heightPixel(8),
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center"
    },
    closeText: {
        fontSize: fontPixel(19),
        color: colors.white,
        fontFamily: fontFamily.MontserratSemiBold
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "98%",
        alignItems: "center"

    },
    imageView: {
        height: heightPixel(280),
        width: heightPixel(290),
        borderRadius: heightPixel(12),

    },
    icon: {
        height: heightPixel(32),
        width: heightPixel(32),
        resizeMode: "contain",
        tintColor: colors.white,
    }
});
