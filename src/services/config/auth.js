import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDeviceId,
  getDeviceToken,
  getUniqueId,
} from 'react-native-device-info';
import {store} from '../../redux/store';
import { getFcmToken } from '../helpingMethods';
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log('Error while getting token', error);
  }
};

export const setAuthToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('Error while setting token', error);
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log('Error while removing token', error);
  }
};

export const getDeviceObject = async () => {
  try {
    const deviceId = await getDeviceId();
    const uniqueId = await getFcmToken() ;
    return {
      device: {id: deviceId, deviceToken: uniqueId},
    };
  } catch (e) {
    console.log(e);
    console.warn('Returning Default dummy value for Simulator');
    const uniqueId = await getFcmToken() || "test Token"
    return {
      device: {
        id: '3242fwefwe4324',
        deviceToken: uniqueId,
      },
    };
  }
};
