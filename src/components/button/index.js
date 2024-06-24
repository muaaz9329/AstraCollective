import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

import {colors, fontFamily, heightPixel, widthPixel, wp} from '../../services';

const Button = ({
  style,
  disable,
  containerStyle,
  onPress,
  themeColor,
  shadow,
  children,
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        shadow && styles.shadow,
        {
          ...styles.container,

          backgroundColor: themeColor ? themeColor : colors.theme,
          marginBottom:
            Platform.OS === 'ios' ? heightPixel(12) : heightPixel(0),
        },
        containerStyle,
      ]}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...styles.label, ...style}}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 100,
    height: 48,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  label: {
    color: colors.white,
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: 16,
  },
});

export default Button;
