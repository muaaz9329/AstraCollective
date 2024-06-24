import AsyncStorage from '@react-native-async-storage/async-storage';
import splashReducer from './Slices/splashSlice';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import userDataSlice from './Slices/userDataSlice';
import signupSlice from './Slices/signupSlice';
import createStorySlice from './Slices/createStorySlice';
import getOneStorySlice from './Slices/getOneStorySlice';
import commentSlice from './Slices/commentSlice';
import SearchTermsSlice from './Slices/searchSlice';
import refreshSlice from './Slices/refreshSlice';
import globalModelSlice from './Slices/globalModelSlice';
import inAppDownload from './Slices/inAppDownload';
const reducer = combineReducers({
  splash: splashReducer,
  userData: userDataSlice,
  signupSlice: signupSlice,
  createStory: createStorySlice,
  getOneStory: getOneStorySlice,
  comment: commentSlice,
  searchTerms: SearchTermsSlice,
  refresh: refreshSlice,
  globalModel: globalModelSlice,
  inAppDownload: inAppDownload,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    'userData',
    'signupSlice',
    'splash',
    'searchTerms',
    'inAppDownload',
  ],
};

export const AppReducers = {
  Splash: 'splash',
  UserData: 'userData',
  SignupSlice: 'signupSlice',
  createStory: 'createStory',
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
