import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../../constants';
import * as App from '../../../screens/appFlow';

const MyStack = createStackNavigator();
export class CommunityStack extends Component {
  render() {
    return (
      <MyStack.Navigator
        initialRouteName={routes.favorite}
        screenOptions={{headerShown: false}}>
        <MyStack.Screen
          name={routes.CommunityMainMenu}
          component={App.CommunityMainMenu}
        />
      </MyStack.Navigator>
    );
  }
}
