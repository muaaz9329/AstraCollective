import React, {createContext, useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {widthPixel} from '../services';
import LottieView from 'lottie-react-native';

// Create the context
export const ClaimAnimationContext = createContext();

// Create a provider component
export const ClaimAnimationContextProvider = ({children}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setState(false);
      }, 2500);
    }
  }, [state]);

  return (
    <ClaimAnimationContext.Provider value={{state, setState}}>
      <View
        style={{
          position: 'relative',
        }}>
        {children}
        {state && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,

              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LottieView
              source={require('../temp/assest/claimAnimation.json')}
              autoPlay
              loop={false}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
            />
          </View>
        )}
      </View>
    </ClaimAnimationContext.Provider>
  );
};
