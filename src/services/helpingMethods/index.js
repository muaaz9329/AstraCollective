import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import messaging from '@react-native-firebase/messaging';

export const storeDataToStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const GreenSnackbar = text => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    textColor: '#fff',
    backgroundColor: 'green',
  });
};

export const RedSnackbar = text => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    textColor: '#fff',
    backgroundColor: 'red',
  });
};

export const SuccessFlashMessage = (title, message) => {
  if (title && message) {
    showMessage({
      message: title,
      description: message,
      type: 'success',

      duration: 2000,
    });
  } else if (title) {
    showMessage({
      message: title,
      type: 'success',

      duration: 2000,
    });
  } else {
    showMessage({
      message: 'Success',
      description: 'Operation Successfully',
      type: 'success',

      duration: 3000,
    });
  }
};

export const ErrorFlashMessage = (title, message) => {
  if (title && message) {
    showMessage({
      message: title,
      description: message,
      type: 'danger',

      duration: 3000,
    });
  } else {
    showMessage({
      message: 'Error',
      description: 'Operation Failed',
      type: 'danger',

      duration: 3000,
    });
  }
};

export const removeDataFromStorage = async key => {
  await AsyncStorage.removeItem(key);
};

export const getDataFromStorage = async value => {
  let data = await AsyncStorage.getItem(value);
  let newData = JSON.parse(data);
  return newData;
};

import {decode} from 'base64-arraybuffer';
import {S3} from 'aws-sdk';
import {showMessage} from 'react-native-flash-message';

var fs = require('react-native-fs');
// upload to s3
export const uploadImageOnS3 = async (file, successPath) => {
  let fileName = new Date().getTime().toString();
  const s3bucket = new S3({
    region: 'eu-east-2',
    accessKeyId: 'AKIAUTZJXM37S6D4PYFU',
    secretAccessKey: 'YEYVCuyTeN19lWdemoq5XUb5KQD6vX+t9yHFIsdg',
    Bucket: 'go-time',
    signatureVersion: 'v4',
  });
  let contentType = 'image/jpeg';
  let contentDeposition = 'inline;filename="' + fileName + '"';
  const base64 = await fs.readFile(file.path, 'base64');
  const arrayBuffer = decode(base64);
  s3bucket.createBucket(async () => {
    const params = {
      Bucket: 'go-time',
      Key: fileName,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
    };
    await s3bucket
      .upload(params)
      .promise()
      .then(data => {
        console.log(data.Location);
        successPath(data.Location);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export async function imagePicker(
  mediaType = 'photo',
  isMultiple = false,
  isCropping = false,
) {
  const image = await ImageCropPicker.openPicker({
    mediaType: mediaType,
    cropping: isCropping,
    multiple: isMultiple,
  });

  return image;
}

export function formatTimeString(timeString) {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return `${minutes}m ${seconds}s`;
}

export function formatPostDate(date) {
  // Extract components
  const day = date.getDate();
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  // Determine if the date is today
  const today = new Date();
  const isToday =
    date.toISOString().split('T')[0] === today.toISOString().split('T')[0];

  // Construct the final string
  let formattedDate = `${isToday ? 'Today, ' : ''}${formattedHours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${ampm}`;
  if (!isToday) {
    formattedDate = `${day} ${month}, ${year}, ${formattedDate}`;
  }

  return formattedDate;
}

export const statusText = (status = ' ') => {
  console.log('status--->', status);
  if (status.toLowerCase() === 'not-friend') {
    return 'Connect';
  }
  if (status.toLowerCase() === 'pending') {
    return 'Pending';
  }
  if (status.toLowerCase() === 'accepted') {
    return 'Connected';
  }
};

export function formatCommentTime(dateString) {
  const now = new Date();
  const inputDate = new Date(dateString);
  const diffInMilliseconds = now - inputDate;

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Approximation
  const year = month * 12; // Approximation

  if (diffInMilliseconds < minute) {
    return 'just now';
  } else if (diffInMilliseconds < hour) {
    return Math.floor(diffInMilliseconds / minute) + 'm';
  } else if (diffInMilliseconds < day) {
    return Math.floor(diffInMilliseconds / hour) + 'h';
  } else if (diffInMilliseconds < week) {
    return Math.floor(diffInMilliseconds / day) + 'd';
  } else if (diffInMilliseconds < month) {
    return Math.floor(diffInMilliseconds / week) + 'w';
  } else if (diffInMilliseconds < year) {
    return Math.floor(diffInMilliseconds / month) + 'm';
  } else {
    return Math.floor(diffInMilliseconds / year) + 'y';
  }
}

export default function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatMessageTime(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'TODAY';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'YESTERDAY';
  } else if (
    date >= today &&
    date <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
  ) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return (
      (day < 10 ? '0' + day : day) +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date.getFullYear() % 100)
    );
  } else {
    const day = date.getDate();
    const monthName = new Date(date).toLocaleString('default', {
      month: 'short',
    });
    return (
      (day < 10 ? '0' + day : day) + ' ' + monthName + ', ' + date.getFullYear()
    );
  }
}

export function hexToRGBA(hex_color, opacity) {
  // Remove '#' from hex color string
  hex_color = hex_color.replace('#', '');

  // Convert hex to decimal values
  var r = parseInt(hex_color.substring(0, 2), 16);
  var g = parseInt(hex_color.substring(2, 4), 16);
  var b = parseInt(hex_color.substring(4, 6), 16);

  // Construct RGBA string
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}


  export const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('FCM token==>', fcmToken);
    return fcmToken
    // dispatch(deviceTokenSave(fcmToken))
  };