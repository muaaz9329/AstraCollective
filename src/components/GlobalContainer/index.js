import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../../services/config/theme';
import {colors, widthPixel} from '../../services';

const GlobalContainer = ({children}) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};

export default GlobalContainer;

const styles = StyleSheet.create({});
