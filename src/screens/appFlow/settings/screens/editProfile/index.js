import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  appIcons,
  appNavigationParam,
  colors,
  fontFamily,
  heightPixel,
  routes,
} from '../../../../../services';
import {styles} from './styles';

import {imagePicker} from '../../../../../services/helpingMethods';
import Button from '../../../../../components/button';
import {AuthInput, Header} from '../../../../../components';
import Badge from '../../../../../components/badges';
import {SafeAreaView} from 'react-native-safe-area-context';
import useApi from './hooks/useApi';
import EditHeader from './components/editHeader';
import BadgeComponent from '../../../../../components/badges/components/badgeComponent';
import CharacterBox from '../../../../../components/characterSelection/characterBox';
import Loader from '../../../../../components/loader/Loader';
import useS3 from '../../../../../hooks/useS3';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    loading,
    userInfo,
    setUserInfo,
    getSelectedItemsForAllTypes,
    updateUser,
    changeUserImage,
  } = useApi(navigation);

  return (
    <Loader loading={loading}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <Header title={'Edit Profile'} isBack={true} />

        <View style={[styles.container]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: userInfo?.image,
                  }}
                  style={styles.imageStyle}
                />
                <Pressable
                  onPress={changeUserImage}
                  style={styles.iconContainer}>
                  <Image
                    source={appIcons.iconCamera}
                    style={styles.iconStyle}
                  />
                </Pressable>
              </View>

              <AuthInput
                label={'User Name'}
                value={userInfo.userName}
                onChangeText={val => {
                  setUserInfo({...userInfo, userName: val});
                }}
                placeholder={'Enter Your Name'}
                bottomText={'Username must be one Unique.'}
              />

              <AuthInput
                label={'First Name'}
                value={userInfo.firstName}
                onChangeText={val => {
                  setUserInfo({...userInfo, firstName: val});
                }}
                placeholder={'Enter Your Name'}
              />
              <AuthInput
                label={'Last Name'}
                value={userInfo.lastName}
                onChangeText={val => {
                  setUserInfo({...userInfo, lastName: val});
                }}
                placeholder={'Enter Your Number'}
              />
            </KeyboardAwareScrollView>
            <View>
              <EditHeader
                title={'Your Interests'}
                onPressPlus={() => {
                  navigation.navigate(routes.updateInterest, {
                    comingFor:
                      appNavigationParam['chooseInterestScreen']
                        .updatingInterest,
                  });
                }}
              />
              <View style={styles.wrapContainer}>
                {getSelectedItemsForAllTypes
                  .getInterest()
                  .map((item, index) => {
                    return (
                      <BadgeComponent
                        key={index}
                        item={item}
                        isSelectedDefault
                      />
                    );
                  })}
              </View>
            </View>
            <View>
              <EditHeader
                title={'Your Genres'}
                onPressPlus={() => {
                  navigation.navigate(routes.updateGenra, {
                    comingFor:
                      appNavigationParam['chooseGenraScreen'].updatingGenra,
                  });
                }}
              />
              <View style={styles.wrapContainer}>
                {getSelectedItemsForAllTypes.getGenre().map((item, index) => {
                  return (
                    <BadgeComponent key={index} item={item} isSelectedDefault />
                  );
                })}
              </View>
            </View>
            <View>
              <EditHeader
                title={'Your Characters'}
                onPressPlus={() => {
                  navigation.navigate(routes.updateCharacter, {
                    comingFor:
                      appNavigationParam['chooseCharacterScreen']
                        .updatingCharacter,
                  });
                }}
              />
              <View style={styles.wrapContainer}>
                {getSelectedItemsForAllTypes
                  .getCharacter()
                  .map((item, index) => {
                    return (
                      <CharacterBox
                        imageUri={item.img}
                        id={item._id}
                        isSelectedDefault
                        disabled
                        containerStyles={{
                          marginRight: 10,
                          marginTop: 10,
                        }}
                      />
                    );
                  })}
              </View>
            </View>
          </ScrollView>

          <Button onPress={updateUser}>Save Changes</Button>
        </View>
      </SafeAreaView>
    </Loader>
  );
};

export default EditProfile;
