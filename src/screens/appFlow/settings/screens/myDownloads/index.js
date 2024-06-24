import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../../../components';
import BookCard from '../../../../../components/bookCard/book-card';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteStoryFromStorage,
  inAppDownloadSelector,
} from '../../../../../redux/Slices/inAppDownload';
import {useNavigation} from '@react-navigation/native';
import {appNavigationParam, routes} from '../../../../../services';
import AppText from '../../../../../components/text/appText';

const MyDownloads = () => {
  const {stories} = useSelector(inAppDownloadSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header isBack={true} title={'My Downloads'} />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
          }}>
          {stories.length > 0 &&
            stories.map((item, index) => {
              return (
                <BookCard
                  key={index}
                  isDownloaded={true}
                  _id={item?._id}
                  bookData={item}
                  bookName={item?.title}
                  duration={item?.duration}
                  imageUri={item?.coverImage}
                  genres={item?.genres}
                  interests={item?.interests}
                  onPress={() => {
                    navigation.navigate(routes.downloadReading, {
                      comingFor: appNavigationParam['reading'].oldStory,
                      downloadedStory: item,
                    });
                  }}
                  onPressDelete={id => {
                    dispatch(deleteStoryFromStorage(id));
                  }}
                />
              );
            })}

          {stories.length === 0 && (
            <AppText
              weight={600}
              textStyles={{
                marginTop: 20,
                textAlign: 'center',
              }}>
              No Stories Downloaded
            </AppText>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyDownloads;

const styles = StyleSheet.create({});
