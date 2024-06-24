import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../../constants';
import * as App from '../../../screens/appFlow';

const MyStack = createStackNavigator();
export class DashboardStack extends Component {
  render() {
    return (
      <MyStack.Navigator
        initialRouteName={routes.readings}
        screenOptions={{headerShown: false}}>
        <MyStack.Screen name={routes.readings} component={App.Reading} />
        <MyStack.Screen name={routes.rating} component={App.Rating} />
      </MyStack.Navigator>
    );
  }
}
