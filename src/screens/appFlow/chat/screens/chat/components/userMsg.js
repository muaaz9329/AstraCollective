import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, widthPixel} from '../../../../../../services';

const UserMsg = ({isUser = true, msg = 'test'}) => {
  return (
    <View
      style={[
        styles.userStyleBox,
        {
          alignSelf: isUser ? 'flex-end' : 'flex-start',
        },
        !isUser && styles.messengerStyleBox,
      ]}>
      <Text style={[styles.userText, !isUser && styles.messengerText]}>
        {msg}
      </Text>
    </View>
  );
};

export default UserMsg;

const styles = StyleSheet.create({
  messengerText: {
    color: colors.black,
  },
  userText: {
    color: 'white',
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratMedium,
  },
  messengerStyleBox: {
    borderTopRightRadius: widthPixel(8),
    borderBottomLeftRadius: widthPixel(0),
    backgroundColor: colors.lightWhite,
  },
  userStyleBox: {
    marginVertical: widthPixel(4),
    backgroundColor: colors.theme,
    marginHorizontal: widthPixel(14),
    paddingVertical: widthPixel(10),
    paddingHorizontal: widthPixel(10),
    borderBottomLeftRadius: widthPixel(8),
    borderTopLeftRadius: widthPixel(8),
    borderBottomRightRadius: widthPixel(8),
    maxWidth: '80%',
    flexDirection: 'column',
  },
});
