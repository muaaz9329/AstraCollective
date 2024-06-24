import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {appIcons, appNavigationParam, appRoutes} from '../../../../services';
import {styles} from './styles';

import Button from '../../../../components/button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Badge from '../../../../components/badges';
import Loader from '../../../../components/loader/Loader';
import useApi from './hooks/useApi';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const ChooseInterest = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {comingFor} = useRoute()?.params || {
    // this is set optional for profile creation and exit strategy
    comingFor: appNavigationParam['chooseInterestScreen'].chooseInterest,
  };

  const {
    loading,
    value,
    selected,
    setSelected,
    interestScreenCallBack,
    initialValue,
  } = useApi(navigation, comingFor);
  const isUpdating =
    comingFor === appNavigationParam['chooseInterestScreen'].updatingInterest; // when user is updating the interest from setting
  const isChoosing =
    comingFor === appNavigationParam['chooseInterestScreen'].chooseInterest; // when user is logging in and choosing the interest at profile creation
  const isNew =
    comingFor === appNavigationParam['chooseInterestScreen'].newInterest; // when user is creating a new story and choosing the interest

  console.log({
    isUpdating,
    isChoosing,
    isNew,
  });

  return (
    <Loader loading={loading} fullBlank>
      <SafeAreaView style={[styles.container]}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />

          <View style={styles.header}>
            <Pressable
              onPress={() => {
                if (isUpdating) {
                  navigation.goBack();
                  // console.log(navigation.getState());
                } else if (isChoosing) {
                  navigation.navigate(appRoutes.createProfileScreen);
                } else if (isNew) {
                  navigation.goBack();
                }
              }}>
              <Image source={appIcons.backIcon} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.headerText}>Choose Interests</Text>
          </View>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>

            <View>
              {value && (
                <Badge
                  setValue={setSelected}
                  value={selected}
                  items={value}
                  initialSelectedValues={initialValue}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
          <Button onPress={interestScreenCallBack}>
            {isUpdating && 'Update'}
            {isNew && 'Next'}
            {isChoosing && 'Continue'}
          </Button>
        </View>
      </SafeAreaView>
    </Loader>
  );
};

export default ChooseInterest;
