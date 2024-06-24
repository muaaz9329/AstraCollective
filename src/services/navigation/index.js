import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {routes} from '..';
import {AuthNavigation} from './authFlow';
import themeContext from '../config/themeContext';
import theme from '../config/theme';
import {useDispatch} from 'react-redux';
import {TabNavigator} from './tabFlow';
import * as App from '../../screens/appFlow';
import * as AppAuth from '../../screens/authFlow';
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
const MyStack = createStackNavigator();
import {onDisplayNotification} from '../../hooks/useNotifee';
import {setUserFcmToken} from '../../redux/Slices/userDataSlice';
export const MainNavigator = () => {
  const [mode, setMode] = useState();
  const dispatch = useDispatch();

  // useEffect(() => {
  //     let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
  //         setMode(data);
  //     });
  //     return () => {
  //         EventRegister.removeEventListener(eventListener);
  //     }
  // })

  // const MyTheme = {
  //     ...DefaultTheme,
  //     colors: {
  //         ...DefaultTheme.colors,
  //         background: mode === true ? '#0000' : '#fff'
  //     },
  // };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(val => {
          console.log({val});
        });
      try {
        messaging()
          .getToken()
          .then(fcmToken => {
            console.log('fcmToken:', fcmToken);
            dispatch(setUserFcmToken(fcmToken));
          });
      } catch (e) {
        console.log('e,', e);
      }
    } else console.log('Not Authorization status:', authStatus);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();

      console.log('authStatus ', authStatus);
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } else if (Platform.OS === 'android') {
      const val = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return val === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  // useEffect(() => {
  //   getFcmToken();
  // }, []);



  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <MyStack.Navigator
          initialRouteName={routes.auth}
          screenOptions={{headerShown: false}}>
          <MyStack.Screen name={routes.auth} component={AuthNavigation} />
          <MyStack.Screen name={routes.tab} component={TabNavigator} />
          <MyStack.Screen name={routes.dashboard} component={App.Dashboard} />
          <MyStack.Screen
            name={routes.CreateStory}
            component={App.CreateStory}
          />

          <MyStack.Screen
            name={routes.notifications}
            component={App.Notifications}
          />

          <MyStack.Screen name={routes.Results} component={App.Results} />
          <MyStack.Screen
            name={routes.changePassword}
            component={App.ChangePassword}
          />
          <MyStack.Screen name={routes.selectPlan} component={App.SelectPlan} />

          <MyStack.Screen
            name={routes.termsPrivacy}
            component={App.TermsPrivacy}
          />

          <MyStack.Screen
            name={routes.editProfile}
            component={App.EditProfile}
          />
          <MyStack.Screen
            name={routes.updateInterest}
            component={AppAuth.ChooseInterest}
          />
          <MyStack.Screen
            name={routes.updateGenra}
            component={AppAuth.ChooseGeners}
          />
          <MyStack.Screen
            name={routes.updateCharacter}
            component={AppAuth.ChooseCharacter}
          />

          <MyStack.Screen
            name={routes.deleteAccount}
            component={App.DeleteAccount}
          />
          <MyStack.Screen
            name={routes.deleteVerify}
            component={App.DeleteVerify}
          />
          <MyStack.Screen name={routes.setting} component={App.Profile} />

          <MyStack.Screen name={routes.readings} component={App.Reading} />
          <MyStack.Screen name={routes.rating} component={App.Rating} />

          <MyStack.Screen
            name={routes.ChatMainMenu}
            component={App.ChatMainMenu}
          />
          <MyStack.Screen name={routes.ChatScreen} component={App.ChatScreen} />
          <MyStack.Screen
            name={routes.CommunityMainMenu}
            component={App.CommunityMainMenu}
          />
          <MyStack.Screen
            name={routes.CommunityShare}
            component={App.CommunityShare}
          />
          <MyStack.Screen
            name={routes.CommunityComments}
            component={App.CommunityComments}
          />

          <MyStack.Screen
            name={routes.myDownloads}
            component={App.MyDownloads}
          />
          <MyStack.Screen
            name={routes.downloadReading}
            component={App.DownloadReading}
          />
          <MyStack.Screen name={routes.myStories} component={App.MyStories} />
          <MyStack.Screen name={routes.contactMe} component={App.Contact} />
          <MyStack.Screen name={routes.Search} component={App.Search} />
          <MyStack.Screen
            name={routes.SearchResultTag}
            component={App.SearchResultTag}
          />

          <MyStack.Screen
            name={routes.postInCommunity}
            component={App.ShareWithCommunity}
          />
          <MyStack.Screen
            name={routes.otherProfile}
            component={App.UserProfile}
          />
          <MyStack.Screen
            name={routes.newInterestSelection}
            component={AppAuth.ChooseInterest}
          />
          <MyStack.Screen
            name={routes.newGenreSelection}
            component={AppAuth.ChooseGeners}
          />
          <MyStack.Screen
            name={routes.newCharacterSelection}
            component={AppAuth.ChooseCharacter}
          />
          <MyStack.Screen
            name={routes.friendRequest}
            component={App.FriendRequest}
          />

          {/* <MyStack.Screen name={routes.drawer} component={DrawerNavigator} /> */}
        </MyStack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};
