import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Switch,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {
  appIcons,
  appRoutes,
  colors,
  heightPixel,
  routes,
  widthPixel,
} from '../../../../../services';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import themeContext from '../../../../../services/config/themeContext';
import {useDispatch, useSelector} from 'react-redux';
import DashboardHeader from '../../../../../components/dashboardHeader';

import ToggleSwitch from 'toggle-switch-react-native';
import useLogout from '../../../../../hooks/useLogout';
import useProfile from './hooks/useProfile';
const Profile = () => {
  const userType = useSelector(state => state.userData.userType);
  const navigation = useNavigation();
  console.log('----<<<<<', userType);
  const theme = useContext(themeContext);

  const {logout} = useLogout();
  const {
    listActions,
    userInfo,
    loading,
    updateNotification,
    toggle,
    setToggle,
  } = useProfile();

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <DashboardHeader title={'Profile'} isInSafeAreaView={true} />
      <ScrollView>
        <View style={[styles.wrapper, {backgroundColor: theme.background}]}>
          <Image
            source={{
              uri: userInfo.image,
            }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{userInfo.userName}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>

          <Pressable
            onPress={() => {
              navigation.navigate(routes.selectPlan);
            }}
            style={styles.premiumBox}>
            <Image source={appIcons.upgrade} style={styles.upgrade} />
            <View style={{flex: 2, marginLeft: widthPixel(8)}}>
              <Text style={styles.planText}>Premium Plan</Text>
              <Text style={styles.planPrice}>$49.00 / Per Month</Text>
            </View>
            <Image
              style={[
                styles.iconForward,
                {tintColor: colors.theme, height: heightPixel(16)},
              ]}
              source={appIcons.iconForward}
            />
          </Pressable>

          {listActions.map((item, index) => {
            if (!item.name) {
              return; // if name is not present in the object then return
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  if (item.data) {
                    navigation.navigate(item.navigate, {
                      passedType: item.data,
                    });
                    return;
                  }
                  if (item.name == 'Logout') {
                    logout();
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {name: appRoutes.auth, routes: appRoutes.wizard},
                        ],
                      }),
                    );
                  }

                  item.navigate && navigation.navigate(item.navigate);
                  item.name == 'Notification' && setToggle(!toggle);
                }}
                key={index}
                style={[
                  styles.row,
                  item.name == 'Logout' && {borderBottomWidth: 0},
                ]}>
                <Image
                  style={[
                    styles.listIcon,
                    item.shouldColor && {tintColor: item.color},
                  ]}
                  source={item.icon}
                />
                <Text
                  style={[
                    styles.listName,
                    item.shouldColor && {color: item.color},
                  ]}>
                  {item.name}
                </Text>
                {item.component ? (
                  <View>
                    <ToggleSwitch
                      isOn={toggle}
                      onColor={colors.theme}
                      offColor={colors.grey}
                      size="small"
                      onToggle={async isOn => {
                        await updateNotification(isOn);
                      }}
                    />
                  </View>
                ) : (
                  <Image
                    style={styles.iconForward}
                    source={appIcons.iconForward}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
