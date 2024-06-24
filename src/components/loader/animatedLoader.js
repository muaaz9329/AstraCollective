import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {colors} from '../../services';
export default function AnimatedLoader({
  children,
  loading = false,
  fullBlank = false,
}) {
  return (
    <>
      {loading && (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',

              zIndex: 9999,
            }}>
            <LottieView
              source={require('../../assets/animations/createStory.json')}
              autoPlay
              loop
              style={{width: '100%', height: '100%'}}
            />
          </View>
        </>
      )}
      {children}
    </>
  );
}

const styles = StyleSheet.create({});
