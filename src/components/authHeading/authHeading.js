import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../services';
import {useNavigation} from '@react-navigation/native';

const AuthHeading = ({
  text1,
  text2,
  isBack = false,
  icon = null,
  onPressIsBack,
}) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    if (onPressIsBack) {
      onPressIsBack();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.mainContainer}>
      {isBack && (
        <Pressable onPress={handleBackPress}>
          <Image source={appIcons.backIcon} style={styles.back} />
        </Pressable>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textStyle}>{text1}</Text>
        {icon && <Image source={icon} style={styles.icon} />}
      </View>
      {text2 && <Text style={styles.text2Style}>{text2}</Text>}
    </View>
  );
};

export default AuthHeading;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: heightPixel(30),
  },
  textStyle: {
    fontFamily: fontFamily.MontserratBold,
    color: colors.black,
    fontSize: fontPixel(24),
  },
  text2Style: {
    color: colors.blackText,
    fontFamily: fontFamily.MontserratRegular,
    fontSize: fontPixel(16),
    marginTop: heightPixel(16),
  },
  back: {
    height: heightPixel(24),
    resizeMode: 'contain',
    marginVertical: heightPixel(24),
    width: widthPixel(20),
  },
  icon: {
    height: heightPixel(24),
    resizeMode: 'contain',
    marginLeft: widthPixel(4),
    width: widthPixel(20),
  },
});
