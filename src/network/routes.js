export const BASE_URL =
  'http://ec2-3-138-124-225.us-east-2.compute.amazonaws.com/api/v1';

export const BASE_URL_SOCKET =
  'http://ec2-3-138-124-225.us-east-2.compute.amazonaws.com';

export default {
  // -----AUTH------//
  signUp: BASE_URL + '/user/signup',
  signIn: BASE_URL + '/user/login',
  socialLogin: BASE_URL + '/user/socialLogin',
  sendOTP: BASE_URL + '/user/sendOTP',
  verifyOTP: BASE_URL + '/user/verify',
  forgotPassword: BASE_URL + '/user/forgotPassword',
  resetPassword: BASE_URL + '/user/resetPassword',
  verifyOTPresetPassword: BASE_URL + '/user/verifyOTPResetPassword',
  updateMe: BASE_URL + '/user/updateMe',
  updatePassword: BASE_URL + '/user/updateMyPassword',
  forgatPass: BASE_URL + '/user/forgotpassword',
  deleteAccount: BASE_URL + '/user/deleteMe',
  deleteVerify: BASE_URL + '/user/verifyOtpAndDelete',
  socialLogin: BASE_URL + '/user/socialLogin',

  //Profile
  allInterest: BASE_URL + '/interest',
  allGenre: BASE_URL + '/genere',
  allCharacters: BASE_URL + '/character',
  getMyFriends: BASE_URL + '/friends/getMyFriends',

  //Content
  termsAndConditions: BASE_URL + '/termsandcondition/getTerms',
  aboutUs: BASE_URL + '/about',
  contactUs: BASE_URL + '/contact',
  // privacyPolicy: BASE_URL + '/privacy',

  //Story
  createStory: BASE_URL + '/story/generateStory',
  recommendedStories: BASE_URL + '/story/recommended',
  getOneStory: BASE_URL + '/story/one',
  getMyStories: BASE_URL + '/story/my-stories',
  deleteStory: BASE_URL + '/story/delete',

  //reviews
  AddReview: BASE_URL + '/review',

  //posts
  createPost: BASE_URL + '/post/create',
  getAllPosts: BASE_URL + '/post/all',
  likePost: BASE_URL + '/like/create',
  unlikePost: BASE_URL + '/like/dislike',
  editPost: BASE_URL + '/post/update',
  deletePost: BASE_URL + '/post/delete',
  getPostByTag: BASE_URL + '/post/hashtag',

  // Friend Requests
  sendFriendRequest: BASE_URL + '/friends/send-friend-request',
  cancelFriendRequest: BASE_URL + '/friends/cancel-request',
  unfriend: BASE_URL + '/friends/unfriend',
  acceptFriendRequest: BASE_URL + '/friends/accept',
  rejectFriendRequest: BASE_URL + '/friends/reject-request',

  // Comments
  getComments: BASE_URL + '/comment/get-post-comments',
  createReply: BASE_URL + '/reply/create',
  createComment: BASE_URL + '/comment/create',

  //profile
  getMyProfile: BASE_URL + '/post/get-my-profile',
  getProfile: BASE_URL + '/post/get-profile-data',

  //Searches
  getUsersByUsername: BASE_URL + '/friends/search-by-username',
  getHashTagResults: BASE_URL + '/post/getHashTags',

  //notification

  getAllNotification: BASE_URL + '/user/mynotifications',
  friendRequest: BASE_URL + '/friends/friend-requests',

  //subscription
  createIntent: BASE_URL + '/subscription/create-subscription',
  confirmPayment: BASE_URL + '/subscription/confirm',
  cancelSubscription: BASE_URL + '/subscription/cancel',

  privacyPolicy: BASE_URL + '/privacy',
};
