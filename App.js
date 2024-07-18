import React, {Component} from 'react';
import {SafeAreaView, LogBox, View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {MainNavigator} from './src/services/navigation';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import FlashMessage from 'react-native-flash-message';
import {colors} from './src/services';
import {withIAPContext} from 'react-native-iap';

import {MenuProvider} from 'react-native-popup-menu';
import TempScreen from './src/temp';
import {ClaimAnimationContextProvider} from './src/Provider/claimModel';

class App extends Component {
  render() {
    let persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ClaimAnimationContextProvider>
            <StatusBar
              translucent
              backgroundColor={'transparent'}
              barStyle={'light-content'}
            />
            <TempScreen />
          </ClaimAnimationContextProvider>

          <FlashMessage position="bottom" />
        </PersistGate>
      </Provider>
    );
  }
}

export default withIAPContext(App);
