import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../services';

const BackBtnHeader = ({onPressBack, title}) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          onPressBack();
        }}>
        <Image source={appIcons.backIcon} style={styles.backIcon} />
      </Pressable>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default BackBtnHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPixel(16),
  },
  headerText: {
    fontSize: fontPixel(20),
    color: colors.black,
    fontFamily: fontFamily.MontserratSemiBold,
  },
  backIcon: {
    height: heightPixel(24),
    width: heightPixel(24),
    resizeMode: 'contain',
    marginRight: widthPixel(10),
  },
});
