import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, widthPixel} from '../../../../../services';
import AppText from '../../../../../components/text/appText';

const ChooseResultTab = ({onTapAccounts, onTapHashtags, index}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onTapAccounts}
        style={[
          styles.txtContainer,
          index === 0 && {
            borderColor: colors.theme,
            bottomBorderWidth: 2,
          },
        ]}>
        <AppText
          fontSize={14}
          weight={500}
          color={index === 0 ? colors.theme : '#D9D9D9'}>
          Accounts
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onTapHashtags}
        style={[
          styles.txtContainer,
          index === 1 && {
            borderColor: colors.theme,
            bottomBorderWidth: 2,
          },
        ]}>
        <AppText
          fontSize={14}
          weight={500}
          color={index === 1 ? colors.theme : '#D9D9D9'}>
          Hashtags
        </AppText>
      </TouchableOpacity>
      <View style={styles.divider}></View>
    </View>
  );
};

export default ChooseResultTab;

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: widthPixel(-20),
    borderTopWidth: 0.7,
    borderColor: '#D9D9D9',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    position: 'absolute',
    bottom: 0,
    width: '120%',
  },
  txtContainer: {
    borderTopWidth: 0,
    borderColor: '#D9D9D9',
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    alignSelf: 'flex-start',
    width: widthPixel(100),
    height: widthPixel(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: widthPixel(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
