/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './src/hooks/useNotifee';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  //
  console.log('Message handled in the background!', remoteMessage);
  onDisplayNotification(remoteMessage);
});

messaging()
  .getInitialNotification()
  .then(async remoteMessage => {
    if (remoteMessage) {
      console.log('Message handled in the background!', remoteMessage);
      onDisplayNotification(remoteMessage);
    }
  });

AppRegistry.registerComponent(appName, () => App);
