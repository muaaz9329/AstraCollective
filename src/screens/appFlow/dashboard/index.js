import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';

import {
  appIcons,
  appNavigationParam,
  colors,
  heightPixel,
  routes,
  widthPixel,
} from '../../../services';
import {styles} from './styles';
import themeContext from '../../../services/config/themeContext';
//import messaging from '@react-native-firebase/messaging';
import DashboardHeader from '../../../components/dashboardHeader';
import BookCard from '../../../components/bookCard/book-card';
import useApi from './hooks/useApi';
import Loader from '../../../components/loader/Loader';

import {formatTimeString} from '../../../services/helpingMethods/index';
import ConnectionModel from '../../../components/model/connectionModel';
import useDownload from '../../../hooks/useDownload';
const Dashboard = ({navigation}) => {
  // const {downloadStory} = useDownload();

  const {books, loading,setLoading} = useApi();

  const onBookPress = bookData => {
    navigation.navigate(routes.readings, {
      comingFor: appNavigationParam['reading'].oldStory,
      id: bookData._id,
    });
  };

  const {downloadStory} = useDownload()

  return (
    <Loader loading={loading}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
        <DashboardHeader
          title={'Astra Collective'}
          textStyles={styles.titleStyles}
          showNotificationIcon={true}
          isInSafeAreaView={true}
        />
        <Pressable
          onPress={() => {
            navigation.navigate(routes.CreateStory);
          }}
          style={styles.floatIconBox}>
          <Image style={styles.floatIcon} source={appIcons.floatIcon} />
        </Pressable>

        <View style={styles.seeAllContainer}>
          <Text style={styles.headingStyle}>Daily Recommended</Text>
        </View>

        {books && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: heightPixel(10),
              // paddingTop: heightPixel(20),
            }}
            data={books}
            renderItem={({item, index}) => (
              <BookCard
                key={index}
                bookName={item?.title}
                duration={
                  item?.estimatedTime
                    ? formatTimeString(item?.estimatedTime)
                    : '3m 30s'
                }
                imageUri={item?.coverImage}
                onPress={onBookPress}
                isPremium={false}
                genres={item?.genres}
                interests={item?.interests}
                bookData={item}
                onPressDownload={async (item)=>{
                  setLoading(true)
                  await downloadStory(item)
                  setLoading(false)
                }}
              />
            )}
          />
        )}
      </View>
      <ConnectionModel />
    </Loader>
  );
};

export default Dashboard;
