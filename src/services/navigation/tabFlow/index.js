import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {DashboardStack} from '../appFlow/dashboardStack';
import {CommunityStack} from '../appFlow/communityStack';
import {ProfileStack} from '../appFlow/profileStack';
import {appIcons, colors, fontFamily} from '../../utilities';
import {fontPixel, heightPixel, hp, widthPixel} from '../../constants';
import {ChatStack} from '../appFlow/chatStack';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const tabArray = [
  {
    route: 'Home',
    icon: appIcons.tabHome,
    activeIcon: appIcons.tabHomeActive,
    component: DashboardStack,
    color: colors.theme,
  },
  {
    route: 'Community',
    icon: appIcons.tabCommunity,
    activeIcon: appIcons.tabCommunityActive,
    component: CommunityStack,
    color: colors.theme,
  },
  {
    route: 'Chat',
    icon: appIcons.tabChat,
    activeIcon: appIcons.tabChatActive,
    component: ChatStack,
    color: colors.theme,
  },
  {
    route: 'Account',
    icon: appIcons.tabProfile,
    activeIcon: appIcons.tabProfileActive,
    component: ProfileStack,
    color: colors.theme,
  },
];

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container]}>
      <View style={[styles.btn]}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={focused ? item.activeIcon : item.icon}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.label,
              focused && {
                color: colors.theme,
                fontFamily: fontFamily.MontserratMedium,
              },
            ]}>
            {item.route}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function TabNavigator() {
  const userType = useSelector(state => state.userData.userType);

  const renderTab = array => {
    return array.map((item, index) => {
      return (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: colors.white,
              height: hp(10),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingTop: Platform.OS == 'ios' ? 10 : 5,
              display: item.route == 'Create' ? 'none' : 'flex',
            },

            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      );
    });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.barStyle,
      }}>
      {renderTab(tabArray)}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: colors.white,
    height: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS == 'ios' ? 10 : 5,
  },
  tabIcon: {
    width: heightPixel(30),
    height: heightPixel(30),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  dotStyle: {
    width: widthPixel(100),
    position: 'absolute',
    height: heightPixel(4),
    top: Platform.OS == 'ios' ? -heightPixel(10) : -heightPixel(20),
    backgroundColor: colors.theme,
  },
  label: {
    color: colors.greyIcon,
    fontFamily: fontFamily.MontserratLight,
    fontSize: fontPixel(12),
    marginTop: heightPixel(3),
  },
  createIcon: {
    height: heightPixel(58),
    resizeMode: 'contain',
    width: heightPixel(58),
  },
});
