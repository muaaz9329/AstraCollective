import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { routes } from '../../constants'
import * as App from '../../../screens/appFlow';

const MyStack = createStackNavigator()
export class ChatStack extends Component {
    render() {
        return (
            <MyStack.Navigator initialRouteName={routes.favorite} screenOptions={{ headerShown: false }}>
                <MyStack.Screen name={routes.ChatMainMenu} component={App.ChatMainMenu} />
            </MyStack.Navigator>
        )
    }
}
