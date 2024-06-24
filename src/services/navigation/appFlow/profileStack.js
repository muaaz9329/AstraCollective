import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {appNavigationParam, routes} from '../../constants';
import * as App from '../../../screens/appFlow';

const MyStack = createStackNavigator();
export class ProfileStack extends Component {
  render() {
    return (
      <MyStack.Navigator
        initialRouteName={routes.profileTab}
        screenOptions={{headerShown: false}}>
        <MyStack.Screen
          name={routes.profileTab}
          component={() => {
            return (
              <App.UserProfile
                route={{
                  params: {
                    comingFor: appNavigationParam['userProfile'].ownProfile,
                  },
                }}
              />
            );
          }}
        />
      </MyStack.Navigator>
    );
  }
}
