import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
} from '../../../../../../services';

const EditHeader = ({title, onPressPlus}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TouchableOpacity onPress={onPressPlus}>
        <Image source={appIcons.iconPlus} style={styles.imgStyles} />
      </TouchableOpacity>
    </View>
  );
};

export default EditHeader;

const styles = StyleSheet.create({
  imgStyles: {
    height: heightPixel(22),
    width: heightPixel(22),
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: heightPixel(20),
  },
  label: {
    fontFamily: fontFamily.MontserratSemiBold,
    color: colors.blackText,
    fontSize: fontPixel(16),
  },
});
