import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MaterialIndicator} from 'react-native-indicators';
import {colors} from '../../services';
export default function Loader({children, loading = false, fullBlank = false}) {
  return (
    <>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: fullBlank ? 'white' : 'rgba(255,255,255,0.5)',
            zIndex: 9999,
          }}>
          <MaterialIndicator color={colors.theme} />
        </View>
      )}
      {children}
    </>
  );
}

const styles = StyleSheet.create({});
