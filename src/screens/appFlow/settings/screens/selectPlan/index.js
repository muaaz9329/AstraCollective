import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IosPlan from './IosPlan';
import AndroidPlan from './androidPlan';

const SelectPlan = ({navigation}) => {
  if (Platform.OS === 'ios') {
    return <IosPlan navigation={navigation} />;
  } else {
    return <AndroidPlan navigation={navigation} />;
  }
};

export default SelectPlan;

const styles = StyleSheet.create({});
