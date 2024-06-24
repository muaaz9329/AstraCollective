import {Dimensions, PixelRatio} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const storageKey = {};

{
  /* <MyStack.Screen name={routes.Search} component={App.Search}/>
<MyStack.Screen name={routes.SearchResultTab} component={App.SearchResultTab}/>
<MyStack.Screen name={routes.TagsSearchResult} component={TagsSearchResult}/>
<MyStack.Screen name={routes.shareWithCommunity} component={App.ShareWithCommunity} />
<MyStack.Screen name={routes.othersProfile} component={App.UserProfile} /> */
}

export const routes = {
  auth: 'auth',
  tab: 'tabNavigator',
  drawer: 'drawer',

  //tabs
  dashboard: 'dashboard',
  CommunityMainMenu: 'CommunityMainMenu',
  profileTab: 'Account',
  ChatMainMenu: 'ChatMainMenu',

  //auth
  setting: 'setting',
  app: 'app',
  splash: 'splash',
  welcome: 'welcome',
  wizard: 'wizard',
  selectAccount: 'selectAccount',
  resetPassword: 'resetPassword',
  chooseInterest: 'chooseInterest',
  chooseGenra: 'chooseGenra',
  chooseCharacter: 'chooseCharacter',
  login: 'login',
  createProfileScreen: 'createProfileScreen',
  signup: 'signup',

  selectPlan: 'selectPlan',
  notifications: 'notifications',

  forget: 'forget',
  verifyEmail: 'verifyEmail',

  //chat
  chat: 'chat',
  ChatScreen: 'ChatScreen',

  //story generation
  newInterestSelection: 'newInterestSelection',
  newGenreSelection: 'newGenreSelection',
  newCharacterSelection: 'newCharacterSelection',
  readings: 'readings',
  rating: 'rating',
  Results: 'Results',
  CreateStory: 'CreateStory',
  // Community
  CommunityShare: 'CommunityShare',
  CommunityComments: 'CommunityComments',
  // postToCommunity: 'postToCommunity',
  Search: 'Search',
  SearchResultTag: 'SearchResultTag',
  postInCommunity: 'postInCommunity',
  otherProfile: 'otherProfile',

  //settings
  deleteAccount: 'deleteAccount',
  deleteVerify: 'deleteVerify',
  updateInterest: 'updateInterest',
  updateGenra: 'updateGenra',
  updateCharacter: 'updateCharacter',
  changePassword: 'changePassword',
  editProfile: 'editProfile',
  setting: 'setting',
  language: 'language',
  termsPrivacy: 'termsPrivacy',
  myDownloads: 'myDownloads',
  contactMe: 'contactMe',
  myStories: 'myStories',
  downloadReading: 'downloadReading',

  //app flow

  friendRequest: 'friendRequest',
};

export const appNavigationParam = {
  verificationScreen: {
    VerificationOfEmail: 'VerificationOfEmail',
    VerificationOfPassword: 'VerificationOfPassword',
  },
  chooseInterestScreen: {
    chooseInterest: 'chooseInterest',
    updatingInterest: 'updatingInterest',
    newInterest: 'newInterest',
  },
  chooseGenraScreen: {
    chooseGenra: 'chooseGenra',
    updatingGenra: 'updatingGenra',
    newGenra: 'newGenra',
  },
  chooseCharacterScreen: {
    chooseCharacter: 'chooseCharacter',
    updatingCharacter: 'updatingCharacter',
    newCharacter: 'newCharacter',
  },
  userProfile: {
    ownProfile: 'ownProfile',
    otherProfile: 'otherProfile',
  },
  reading: {
    newStory: 'newStory',
    oldStory: 'oldStory',
  },
  postInCommunity: {
    editPost: 'editPost',
    newPost: 'newPost',
  },
};

export const appRoutes = routes;

export const loaderStyles = {
  CircleFlip: 'CircleFlip',
  Bounce: 'Bounce',
  Wave: 'Wave',
  WanderingCubes: 'WanderingCubes',
  Pulse: 'Pulse',
  ChasingDots: 'ChasingDots',
  ThreeBounce: 'ThreeBounce',
  Circle: 'Circle',
  CubeGrid: '9CubeGrid',
  WordPress: 'WordPress',
  FadingCircle: 'FadingCircle',
  FadingCircleAlt: 'FadingCircleAlt',
  Arc: 'Arc',
};

export const wp = p => WINDOW_WIDTH * (p / 100);
export const hp = p => WINDOW_HEIGHT * (p / 100);
export {WINDOW_HEIGHT, WINDOW_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH};

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
const widthPixel = size => {
  return normalize(size, 'width');
};
const heightPixel = size => {
  return normalize(size, 'height');
};
const fontPixel = size => {
  return heightPixel(size);
};

export {widthPixel, heightPixel, fontPixel};

export const API_KEY = 'AIzaSyDN7lHPbUtmCz0cO3Ln0Ync6uKPokXGe5E';
