import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {appIcons, colors, heightPixel, widthPixel} from '../../services';

const SocialLogin = ({icon, handleClick = () => {}}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={handleClick}>
      <Image style={styles.iconStyle} source={icon} />
    </TouchableOpacity>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 100,

    paddingHorizontal: widthPixel(30),
    height: heightPixel(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: widthPixel(32),
    resizeMode: 'contain',
    height: widthPixel(32),
  },
});
