import React, {useContext} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {useSelector} from 'react-redux';

import {appIcons, appRoutes, routes} from '../../../../services';
import {styles} from './styles';
import themeContext from '../../../../services/config/themeContext';
import {AppReducers} from '../../../../redux/store';
import {InitialSignUpStep} from '../../../../redux/Slices/signupSlice';

const Splash = ({navigation}) => {
  const theme = useContext(themeContext);
  const {stepNo} = useSelector(state => state[AppReducers.SignupSlice]);
  const {isLoggedIn} = useSelector(state => state[AppReducers.UserData]);
  React.useEffect(() => {
    performTimeConsumingTask();
    console.log(stepNo);
  }, []);

  const performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.navigate(appRoutes.tab);
        } else {
          if (stepNo === InitialSignUpStep.VerifyEmail) {
            navigation.replace(appRoutes.verifyEmail);
          } else if (stepNo === InitialSignUpStep.ProfileCreation) {
            navigation.replace(appRoutes.createProfileScreen);
          } else if (stepNo === InitialSignUpStep.AddInterest) {
            navigation.replace(appRoutes.chooseInterest);
          } else if (stepNo === InitialSignUpStep.AddGenre) {
            navigation.replace(appRoutes.chooseGenra);
          } else if (stepNo === InitialSignUpStep.AddCharacters) {
            navigation.replace(appRoutes.chooseCharacter);
          } else {
            navigation.replace(appRoutes.wizard);
          }
        }
      }, 3000),
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={theme.theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={appIcons.logo} />
      </View>
      <Image style={styles.loaderIcon} source={appIcons.splashLoader} />
    </View>
  );
};

export default Splash;
