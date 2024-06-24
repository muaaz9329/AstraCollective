import {GoogleSignin} from '@react-native-google-signin/google-signin';

const useSocialLogins = () => {
  const googleLoginData = async () => {
    GoogleSignin.configure({
      webClientId:
        '882383021286-f1l9vpf6he84ejao7ssgolv9kn3d9v9b.apps.googleusercontent.com',
    });
    return new Promise(async (resolve, reject) => {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        resolve(userInfo);
        GoogleSignin.signOut();
      } catch (error) {
        reject(error);
      }
    });
  };

  return {googleLoginData};
};
export default useSocialLogins;
