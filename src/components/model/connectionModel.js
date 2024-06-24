import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {forwardRef} from 'react';
import useModel from './hooks/use-model';
import Modal from 'react-native-modal';
import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from '../../services';
import LottieView from 'lottie-react-native';
const ConnectionModel = forwardRef(({onPressYes}, ref) => {
  const {open, hideModel} = useModel(ref);
  return (
    <View>
      <Modal
        isVisible={open}
        onBackdropPress={hideModel}
        onBackButtonPress={hideModel}>
        <View style={styles.modelContainer}>
          <LottieView
            source={require('../../assets/animations/alert.json')}
            autoPlay
            loop
            style={styles.emojiStyles}
          />
          <Text style={styles.titleStyles}>Unfriend User</Text>
          <Text style={styles.description}>
            Are you sure you want to unfriend this person?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                onPressYes();
                hideModel();
              }}
              style={{
                backgroundColor: '#ED2939',
                paddingVertical: widthPixel(10),
                paddingHorizontal: widthPixel(20),
                borderRadius: 10,

                marginTop: 10,
              }}>
              <Text style={styles.upgradeBtn}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                hideModel();
              }}
              style={{
                backgroundColor: colors.theme,
                paddingVertical: widthPixel(10),
                paddingHorizontal: widthPixel(20),
                borderRadius: 10,

                marginTop: 10,
              }}>
              <Text style={styles.upgradeBtn}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default ConnectionModel;

const styles = StyleSheet.create({
  emojiStyles: {
    width: widthPixel(80),
    height: heightPixel(72),
    // resizeMode: 'contain',
  },
  titleStyles: {
    color: 'black',
    fontFamily: fontFamily.MontserratBold,
    fontSize: widthPixel(16),
    marginTop: 5,
  },
  description: {
    color: 'black',
    opacity: 0.5,
    fontSize: widthPixel(14),
    marginVertical: 15,
    marginHorizontal: widthPixel(10),
    fontFamily: fontFamily.MontserratMedium,
    textAlign: 'center',
  },
  upgradeBtn: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: widthPixel(16),
    color: 'white',
  },
  modelContainer: {
    backgroundColor: 'white',
    width: widthPixel(280),
    height: widthPixel(250),
    borderRadius: widthPixel(40),
    alignSelf: 'center',
    alignItems: 'center',
    padding: widthPixel(5),
  },
});
