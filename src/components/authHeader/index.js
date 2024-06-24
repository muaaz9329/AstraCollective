import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { appIcons, colors, fontFamily, fontPixel, heightPixel, widthPixel } from '../../services';
import { useNavigation } from '@react-navigation/native';

const AuthHeader = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer}>
            {
                props.isBack &&
                <TouchableOpacity style={styles.backIconBox} onPress={() => { navigation.goBack() }} >
                    <Image source={appIcons.backIcon} style={styles.backIcon} />

                </TouchableOpacity>
            }
            <Image source={appIcons.logo2} style={styles.logo} />

        </View>
    );
};

export default AuthHeader;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightPixel(50),


    },
    logo: {
        width: widthPixel(100),
        height: heightPixel(100),
        resizeMode: 'contain',

    },
    backIcon: {

        width: widthPixel(20),
        height: heightPixel(20),
        resizeMode: "contain"
    },
    backIconBox: {
        position: "absolute",
        left: 0,
    }

});
