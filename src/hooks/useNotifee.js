import {appIcons} from '../services';
import notifee, {AndroidImportance} from '@notifee/react-native';
async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data?.title ? data?.title : data?.notification?.title,
    body: data?.body ? data?.body : data?.notification?.body,
    android: {
      channelId,
      largeIcon: `${appIcons.iconLogo}`,
      importance: AndroidImportance.HIGH,
    },
  });
}

export {onDisplayNotification};
