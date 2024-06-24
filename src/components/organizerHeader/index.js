import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { appIcons, colors, fontFamily, fontPixel, heightPixel, routes, widthPixel } from '../../services';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const OrganizerHeader = (props) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <Pressable onPress={() => { navigation.navigate(routes.profile) }} >
                    <Image source={{ uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" }} style={styles.userImage} />
                </Pressable>

                <View style={{ flex: 2, marginLeft: widthPixel(8) }} >
                    <View style={styles.welcomeBox} >
                        <Text style={styles.welcomeText} >Welcome Organiser!</Text>
                        <Image source={appIcons.welcomeHand} style={styles.hand} />
                    </View>
                    <Text style={styles.userName} >Gohar Ayub</Text>

                </View>
                <View style = {{flex : 1 , flexDirection : 'row'}}>
                <TouchableOpacity style = {{flex : 1 , alignSelf :'center'}} onPress={() => { navigation.navigate(routes.qrScanner) }} >
                    <Image source={appIcons.snanner} style={styles.scanner} />
                </TouchableOpacity>
                <TouchableOpacity style = {{flex : 1}} onPress={() => { navigation.navigate(routes.notifications) }} >
                    <Image source={appIcons.iconNotification} style={styles.notification} />
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OrganizerHeader;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: heightPixel(8),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: widthPixel(16),
        marginBottom: heightPixel(16)

    },
    welcomeBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    welcomeText: {
        fontSize: fontPixel(14),
        color: colors.lightBlack,
        fontFamily: fontFamily.MontserratLight,
        marginRight: widthPixel(4)
    },
    address: {
        fontSize: fontPixel(14),
        color: colors.theme,
        fontFamily: fontFamily.MontserratMedium,
        marginLeft: widthPixel(4)
    },
    hand: {
        width: widthPixel(20),
        height: widthPixel(20),
        resizeMode: "contain",

    },
    userName: {
        fontSize: fontPixel(16),
        color: colors.blackText,
        fontFamily: fontFamily.MontserratMedium,
        marginTop: heightPixel(6)
    },
    userImage: {
        height: heightPixel(60),
        width: heightPixel(60),
        borderRadius: heightPixel(60) / 2,
        resizeMode: "contain"
    },
    notification: {
        width: widthPixel(32),
        height: widthPixel(32),
        resizeMode: "contain"
    },
    scanner: {
        width: widthPixel(22),
        height: widthPixel(22),
        resizeMode: "contain"
    }
});
