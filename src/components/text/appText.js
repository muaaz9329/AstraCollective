import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Montserrat, widthPixel} from '../../services';

const AppText = ({
  children,
  fontSize = 16,
  color = 'black',
  weight = 400,
  lineHeight,
  textStyles,
}) => {
  return (
    <Text
      style={{
        fontFamily: Montserrat(weight),
        fontSize: widthPixel(fontSize),
        color: color,
        lineHeight: lineHeight,
        ...textStyles,
      }}>
      {children}
    </Text>
  );
};

export default AppText;
