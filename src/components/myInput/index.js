import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import {
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../services';

const AuthInput = ({
  label = '',
  multiline = false,
  placeholder,
  secureTextEntry,
  value,
  editable,
  color = '#0a0f0d',
  secure = false,
  setSecure,
  onChangeText,
  keyboardType = 'default',
  bottomText,
}) => {
  return (
    <View style={{marginTop: heightPixel(20)}}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.mainContainer, multiline && {height: heightPixel(120)}]}>
        <TextInput
          editable={editable}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'middle'}
          value={value}
          onChangeText={text => {
            onChangeText(text);
          }}
          style={[
            styles.textInput,
            {color: color},
            multiline && {height: heightPixel(120)},
          ]}
          placeholderTextColor={'#A0A0A0'}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && secure}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Image
              source={secure ? appIcons.hidepass : appIcons.showpass}
              style={[styles.iconStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
      {bottomText && (
        <Text
          style={{
            marginTop: widthPixel(10),
            fontFamily: fontFamily.MontserratLight,
            color: '#9D9D9D',
            fontSize: widthPixel(15.5),
          }}>
          {bottomText}
        </Text>
      )}
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: heightPixel(48),

    borderBottomWidth: 1,
    borderColor: colors.theme,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: widthPixel(25),
    height: heightPixel(25),
    marginLeft: widthPixel(17),
  },
  textInput: {
    flex: 2,
    fontFamily: fontFamily.MontserratRegular,
    color: colors.blackText,
    fontSize: fontPixel(16),
  },
  iconStyle: {
    width: widthPixel(24),
    height: widthPixel(24),
    marginRight: widthPixel(6),
    tintColor: colors.theme,
  },
  label: {
    fontFamily: fontFamily.MontserratSemiBold,
    color: colors.blackText,
    fontSize: fontPixel(16),
    marginBottom: heightPixel(8),
  },
});
