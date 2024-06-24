import React, {useContext} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

import {
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
  wp,
} from '../../services';
import themeContext from '../../services/config/themeContext';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Header = ({
  isBack,
  rightPress,
  rightIcon,
  title,
  children,
  rightSideComponent,
  titleAndIconContainerStyle,
  onPressBack,
}) => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={[styles.titleAndIconContainer, titleAndIconContainerStyle]}>
        {isBack && (
          <TouchableOpacity
            onPress={() => {
              onPressBack ? onPressBack() : navigation.goBack();
            }}
            style={styles.backBox}>
            <Image source={appIcons.backIcon} style={styles.backIcon} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.textStyle}>{title}</Text>}
        {children}
      </View>
      {rightIcon && (
        <TouchableOpacity
          onPress={() => {
            rightPress();
          }}
          style={styles.rightBox}>
          <Image source={rightIcon} style={styles.rightIcon} />
        </TouchableOpacity>
      )}
      {rightSideComponent && rightSideComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  titleAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    marginVertical: heightPixel(10),
    paddingHorizontal: widthPixel(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPixel(15),
  },
  backBox: {
    marginLeft: widthPixel(8),
    marginRight: widthPixel(14),
  },
  backIcon: {
    height: heightPixel(20),
    width: heightPixel(20),
    resizeMode: 'contain',
  },
  rightBox: {
    position: 'absolute',
    right: widthPixel(16),
    top: heightPixel(4),
  },
  rightIcon: {
    height: heightPixel(26),
    width: heightPixel(26),
    resizeMode: 'contain',
  },

  textStyle: {
    fontSize: fontPixel(16),
    color: colors.black,
    fontFamily: fontFamily.MontserratSemiBold,
  },
});
export default Header;
