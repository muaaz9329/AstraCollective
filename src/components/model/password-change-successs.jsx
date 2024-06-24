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

const PasswordChangeModel = forwardRef((props, ref) => {
  const {open, hideModel} = useModel(ref);
  return (
    <View>
      <Modal
        isVisible={open}
        onBackdropPress={hideModel}
        onBackButtonPress={hideModel}>
        <View style={styles.modelContainer}>
          <Image style={styles.emojiStyles} source={appIcons.success} />
          <Text style={styles.titleStyles}>Reset Password Successful!</Text>
          <Text style={styles.description}>
            Your password has been successfully changed
          </Text>
        </View>
      </Modal>
    </View>
  );
});

export default PasswordChangeModel;

const styles = StyleSheet.create({
  emojiStyles: {
    width: widthPixel(130),
    height: heightPixel(130),
  },
  titleStyles: {
    color: colors.theme,
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: widthPixel(22),
    textAlign: 'center',
  },
  description: {
    color: 'black',
    opacity: 0.5,
    fontSize: widthPixel(16),
    marginVertical: 15,
    fontFamily: fontFamily.MontserratRegular,
    textAlign: 'center',
  },
  upgradeBtn: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: widthPixel(16),
    color: colors.theme,
    marginVertical: 10,
  },
  modelContainer: {
    backgroundColor: 'white',
    width: widthPixel(300),
    height: heightPixel(300),
    borderRadius: widthPixel(40),
    alignSelf: 'center',
    alignItems: 'center',
    padding: widthPixel(20),
  },
});
