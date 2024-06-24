import {useState, useEffect} from 'react';
import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {store} from '../redux/store';
import {accessToken} from '../redux/Slices/userDataSlice';
import {BASE_URL} from './routes';
export const GeneralFetch = async (
  token,
  method,
  Url,
  bodyParams,
  isLoding,
  onSuccess,
  onError,
) => {
  let controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, 18000);

  console.log('Url ==>>   ', Url);
  console.log(
    'BodyParams ==>>   ',
    method == 'POST' ? JSON.stringify(bodyParams) : 'no body for get',
  );
  var body = JSON.stringify(bodyParams);
  var myHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: token,
  });
  var requestOptions =
    method == 'POST'
      ? {
          method: method,
          headers: myHeaders,
          body: body,
          redirect: 'follow',
          signal: controller.signal,
        }
      : {
          method: method,
          headers: myHeaders,
          redirect: 'follow',
          signal: controller.signal,
        };
  try {
    isLoding(true),
      await fetch(Url, requestOptions)
        .then(response => response.json())
        .then(responseJson => {
          isLoding(false);
          console.log('Response ==>>   ', JSON.stringify(responseJson));
          onSuccess(responseJson);
        })
        .catch(function (error) {
          onError(error.message);
          isLoding(false);
          if (error.message == 'Aborted') {
            setTimeout(() => {
              console.log({
                text: 'Network Request Time out',

                textColor: '#fff',
                backgroundColor: 'red',
              });
            }, 100);
          } else {
            setTimeout(() => {
              console.log({
                text: error.message,

                textColor: '#fff',
                backgroundColor: 'red',
              });
            }, 100);
          }
          console.log('fetch catch-->  ', error.message);
        })
        .finally(function (error) {
          isLoding(false);
        });
  } catch (error) {
    isLoding(false);
    console.log('GeneralFetch try catch-->  ', error);
  }
};

// -------------------Call Api--------------------------

// const BASE_URL = 'http://ec2-3-128-30-164.us-east-2.compute.amazonaws.com/';
export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const Status = {
  SUCCESS: 200,
  ERROR: 400,
  AUTHENTICATION_FAIL: 401,
  NOT_FOUND: 400,
};

var defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const callApi = async (
  method,
  Url,
  bodyParams,
  setloading,
  onSuccess,
  onError,
  count = 0,
  multipart,
) => {
  let token = store.getState().userData.accessToken ?? false;
  let refreshToken = store.getState().userData.refreshToken ?? false;
  if (multipart) {
    defaultHeaders['Content-Type'] = 'multipart/form-data';
  } else {
    defaultHeaders['Content-Type'] = 'application/json';
  }
  if (token) {
    defaultHeaders['Authorization'] = token;
  }
  let fetchObject = {
    method: method,
    headers: defaultHeaders,
    body:
      method == 'GET'
        ? null
        : method == 'DELETE'
        ? null
        : multipart
        ? bodyParams
        : JSON.stringify(bodyParams),
  };
  if (bodyParams == null) {
    delete fetchObject.body;
  }
  console.log('fetchObject ==>>   ', fetchObject);
  try {
    setloading(true);
    let response = await fetch(Url, fetchObject);
    // console.log('Response  ==>>   ', response);
    let responseJson = await response.json();
    // console.log('Fetch Response ==>>   ', JSON.stringify(responseJson));
    if (responseJson?.message == 'jwt expired' && count < 2 && refreshToken) {
      let fetchObject = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          device: {
            id: getDeviceId(),
          },
        }),
      };

      await fetch(`${BASE_URL}user/refresh/${refreshToken}`, fetchObject)
        .then(async res => {
          let resJson = await res.json();
          // console.log('Fetch refreshResponse ==>  ', resJson.data);
          store.dispatch(accessToken(resJson.data.accessToken));
          callApi(
            method,
            Url,
            bodyParams,
            setloading,
            onSuccess,
            onError,
            count + 1,
          );
        })
        .catch(err => console.log('error refresh token=> ', err));
    } else if (responseJson?.status < 400 || response.status == 200) {
      onSuccess(responseJson);
      if (responseJson?.errorType) {
        console.log(responseJson?.errorType);
      } else if (responseJson?.message) console.log(responseJson?.message);
      setloading(false);
    } else {
      onError(responseJson?.message);
      if (responseJson?.errorType) {
        console.log(responseJson?.errorType);
      } else if (responseJson?.message) console.log(responseJson?.errorType);
      setloading(false);
    }
  } catch (error) {
    console.log('Network request failed');
    onError(error.message);
    setloading(false);
    console.log('Api call try catch error:', error.message);
  }
};
