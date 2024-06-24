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

const UpgradePlanModel = forwardRef((props, ref) => {
  const {open,hideModel} = useModel(ref);
  return (
    <View>
      <Modal isVisible={open} onBackdropPress={hideModel} onBackButtonPress={hideModel}>
        <View style={styles.modelContainer}>
          <Image source={appIcons.sadEmoji} style={styles.emojiStyles} />
          <Text style={styles.titleStyles}>You are using free version</Text>
          <Text style={styles.description}>
            Sed dignissim nisl a vehicula fringilla. Nulla faucibus dui tellus,
            ut dignissim
          </Text>
          <TouchableOpacity>
            <Text style={styles.upgradeBtn}>Upgrade Your Plan</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
});

export default UpgradePlanModel;

const styles = StyleSheet.create({
  emojiStyles: {
    width: widthPixel(80),
    height: heightPixel(80),
  },
  titleStyles: {
    color: 'black',
    fontFamily: fontFamily.MontserratMedium,
    fontSize: widthPixel(18),
    marginTop: 20,
  },
  description: {
    color: 'black',
    opacity: 0.5,
    fontSize: widthPixel(14),
    marginVertical: 15,
    fontFamily: fontFamily.MontserratLight,
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
    height: heightPixel(270),
    borderRadius: widthPixel(40),
    alignSelf: 'center',
    alignItems: 'center',
    padding: widthPixel(20),
  },
});
