import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  userType: 'seeker',
  accessToken: '',
  refreshToken: '',
  profileComplete: false,
  isSurvey: false,
  deviceToken: '',
  isVerified: false,
  isLoggedIn: false,
  otpToResetPass: null,
  canRememberYou: true,
  fcmToken: '',
  isSocial: false,
};

export const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDataSave: (state, action) => {
      state.userData = action.payload;
    },
    userProfileComplete: (state, action) => {
      state.profileComplete = action.payload;
    },
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    userSurveySave: (state, action) => {
      state.isSurvey = action.payload;
    },
    deviceTokenSave: (state, action) => {
      state.deviceToken = action.payload;
    },
    userTypeSave: (state, action) => {
      state.userType = action.payload;
    },
    setOtpVerification: (state, action) => {
      state.isVerified = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      if (state.canRememberYou) {
        state.isLoggedIn = action.payload;
      }
    },
    setOtpToResetPass: (state, action) => {
      state.otpToResetPass = action.payload;
    },
    setRememberMe: (state, action) => {
      state.canRememberYou = action.payload;
    },
    setLogout: (state, action) => {
      state.userData = {};
      state.userType = 'seeker';
      state.accessToken = '';
      state.refreshToken = '';
      state.profileComplete = false;
      state.isSurvey = false;
      state.deviceToken = '';
      state.isVerified = false;
      state.isLoggedIn = false;
      state.otpToResetPass = null;
      state.canRememberYou = true;
      state.fcmToken = '';
      state.isSocial = false;
    },
    setUserFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setSocialLogin: (state, action) => {
      state.isSocial = action.payload;
    },
  },
});

export const userDataSelector = (
  state = {
    userData: {
      userData: {},
      userType: 'seeker',
      accessToken: '',
      refreshToken: '',
      profileComplete: false,
      isSurvey: false,
      deviceToken: '',
      isVerified: false,
      isLoggedIn: false,
      otpToResetPass: null,
      canRememberYou: true,
      fcmToken: '',
    },
  },
) => state.userData;

export const {
  userDataSave,
  accessToken,
  refreshToken,
  userProfileComplete,
  userSurveySave,
  deviceTokenSave,
  userTypeSave,
  setOtpVerification,
  setIsLoggedIn,
  setLogout,
  setOtpToResetPass,
  setRememberMe,
  setUserFcmToken,
  setSocialLogin,
} = userDataSlice.actions;

export default userDataSlice.reducer;
