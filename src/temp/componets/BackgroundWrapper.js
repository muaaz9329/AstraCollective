import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const BackgroundWrapper = ({children}) => {
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={require('../assest/bg.png')}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

export default BackgroundWrapper;

const styles = StyleSheet.create({});
