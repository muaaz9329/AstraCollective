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

class App extends Component {
  render() {
    let persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <StatusBar
              backgroundColor={colors.background}
              barStyle={'dark-content'}
            />
            <MenuProvider>
              <MainNavigator />
            </MenuProvider>
          </View>

          <FlashMessage position="bottom" />
        </PersistGate>
      </Provider>
    );
  }
}

export default withIAPContext(App)
