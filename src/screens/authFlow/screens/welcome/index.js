import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  routes,
} from '../../../../services';
import {styles} from './styles';

const WelcomeScreen = ({navigation}) => {
  useEffect(() => {
    function moveToNextScreen() {
      setTimeout(() => {
        navigation.navigate(routes.tab);
      }, 1500);
    }
    moveToNextScreen();
  }, []);

  return (
    <View style={[styles.container]}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Image source={appIcons.welcome} style={styles.image} />
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.desc}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </Text>
    </View>
  );
};

export default WelcomeScreen;
