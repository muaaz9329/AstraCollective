import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {routes} from '../../constants';
import * as Auth from '../../../screens/authFlow';

const AuthStack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={routes.splash}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}>
      <AuthStack.Screen name={routes.splash} component={Auth.Splash} />
      <AuthStack.Screen name={routes.wizard} component={Auth.Wizard} />
      <AuthStack.Screen name={routes.login} component={Auth.Signin} />
      <AuthStack.Screen name={routes.signup} component={Auth.Signup} />
      <AuthStack.Screen
        name={routes.createProfileScreen}
        component={Auth.CreateProfileScreen}
      />
      <AuthStack.Screen name={routes.forget} component={Auth.ForgetScreen} />
      <AuthStack.Screen
        name={routes.resetPassword}
        component={Auth.ResetPassword}
      />
      <AuthStack.Screen
        name={routes.verifyEmail}
        component={Auth.VerifyEmail}
      />
      <AuthStack.Screen
        name={routes.chooseInterest}
        component={Auth.ChooseInterest}
      />
      <AuthStack.Screen
        name={routes.chooseGenra}
        component={Auth.ChooseGeners}
      />
      <AuthStack.Screen name={routes.welcome} component={Auth.WelcomeScreen} />
      <AuthStack.Screen
        name={routes.chooseCharacter}
        component={Auth.ChooseCharacter}
      />
    </AuthStack.Navigator>
  );
};
