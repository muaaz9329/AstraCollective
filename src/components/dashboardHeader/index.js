import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  Montserrat,
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  routes,
  widthPixel,
} from '../../services';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const RenderHeader = ({
  navigation,
  containerStyles,
  showNotificationIcon,
  textStyles,
  title,
  showSearchIcon,
  rightIcon,
  onPressRightIcon,
}) => {
  return (
    <View style={[styles.mainContainer, containerStyles]}>
      <View style={styles.secondaryContainer}>
        <Image source={appIcons.logoHeader} style={styles.userImage} />
        {title && <Text style={[styles.title, textStyles]}>{title}</Text>}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {showSearchIcon && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.Search);
              }}>
              <Image
                source={appIcons.iconSearch2}
                style={[
                  styles.notification,
                  {
                    marginRight: widthPixel(12),
                    // resizeMode: 'contain',
                  },
                ]}
              />
            </TouchableOpacity>
          )}
          {showNotificationIcon && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.notifications);
              }}>
              <Image
                source={appIcons.iconNotification}
                style={styles.notification}
              />
            </TouchableOpacity>
          )}
          {rightIcon && (
            <TouchableOpacity
              onPress={() => {
                onPressRightIcon();
              }}>
              {rightIcon()}
            </TouchableOpacity>
          )}
          {!showNotificationIcon && !showSearchIcon && !rightIcon && (
            <View style={{width: 60}} />
          )}
        </View>
      </View>
    </View>
  );
};

const DashboardHeader = ({
  title,
  textStyles,
  containerStyles,
  showNotificationIcon = false,
  isInSafeAreaView = false,
  showSearchIcon = false,
  rightIcon,
  onPressRightIcon,
}) => {
  const navigation = useNavigation();

  return isInSafeAreaView ? (
    <SafeAreaView edges={['top']}>
      <RenderHeader
        navigation={navigation}
        containerStyles={containerStyles}
        textStyles={textStyles}
        title={title}
        showNotificationIcon={showNotificationIcon}
        showSearchIcon={showSearchIcon}
        rightIcon={rightIcon}
        onPressRightIcon={onPressRightIcon}
      />
    </SafeAreaView>
  ) : (
    <RenderHeader
      navigation={navigation}
      containerStyles={containerStyles}
      textStyles={textStyles}
      title={title}
      showNotificationIcon={showNotificationIcon}
      showSearchIcon={showSearchIcon}
      rightIcon={rightIcon}
      onPressRightIcon={onPressRightIcon}
    />
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  secondaryContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  mainContainer: {
    marginTop: heightPixel(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: widthPixel(16),
    marginBottom: heightPixel(16),
    // borderWidth: 1,
  },

  title: {
    // flex: 2,
    fontSize: fontPixel(18),
    // marginLeft: widthPixel(6),
    // color: 'black',
    // fontFamily: fontFamily.MontserratSemiBold,
    fontFamily: Montserrat(500),
    // top: 2,
    marginLeft:-10,

    alignSelf: 'center',
    marginTop: heightPixel(8),
    // textAlign: 'center',
    color: colors.theme,
  },

  notification: {
    width: widthPixel(24),
    height: widthPixel(24),
    
  },
  userImage: {
    height: heightPixel(60),
    width: widthPixel(60),
    resizeMode: 'contain',
  },
});
