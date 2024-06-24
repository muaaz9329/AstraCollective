import {FlatList, ScrollView, StyleSheet, Text, View ,RefreshControl } from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserCard from './components/userCard';
import DashboardHeader from '../../../../components/dashboardHeader';
import {appNavigationParam, appRoutes, widthPixel} from '../../../../services';
import PostCard from '../../../../components/postCard/postCard';
import useApi from './hooks/useApi';
import Loader from '../../../../components/loader/Loader';
import {
  formatPostDate,
  formatTimeString,
} from '../../../../services/helpingMethods';
import useGlobalApi from '../../../../hooks/useGlobalApi';
import {useNavigation} from '@react-navigation/native';
import {AppReducers} from '../../../../redux/store';
import {useSelector} from 'react-redux';
const MainMenu = () => {
  const {loading, posts,onRefresh,refresh} = useApi();
  const {handleLike, handleFriendRequest} = useGlobalApi();
  const navigation = useNavigation();
  const {userData} = useSelector(state => state[AppReducers['UserData']]);
  const onPressBook = bookData => {
    navigation.navigate(appRoutes.readings, {
      comingFor: appNavigationParam['reading'].oldStory,
      id: bookData._id,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyles}>
      <Loader loading={loading}>
        <DashboardHeader
          title={'Community'}
          showNotificationIcon
          showSearchIcon
          textStyles={{
            marginLeft: 0,
          }}
        />
        <View style={styles.scrollViewStyles}>
          <FlatList
            data={posts}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                colors={['#007AFF']} // Change the color of the refresh indicator
                tintColor={'#007AFF'} // Change the color of the refresh indicator
                progressBackgroundColor={'#ffffff'} // Change the background color of the refresh indicator
              />
            }
            renderItem={({item}) => (
              <PostCard
                imgUrl={item?.user?.image}
                postText={item?.text}
                genres={item?.story?.genres}
                interests={item?.story?.interests}
                time={formatPostDate(new Date(item?.createdAt))}
                isOwner={item?.user?._id === userData?._id}
                isConnection={item?.isFriend}
                name={item?.user?.userName}
                bookName={item?.story?.title}
                bookImage={item?.story?.coverImage}
                bookDuration={formatTimeString(
                  item?.story.estimatedTime || '3:30',
                )}
                // showConnectBtn={item?.isFriend ? false : true}
                // showEditDots={item?.isFriend ? false : true}p
                likes={item?.totalLikes}
                comments={item?.totalComments}
                onPressLike={handleLike}
                Id={item?._id}
                isLiked={item?.isLiked}
                bookData={item?.story}
                onPressBook={onPressBook}
                isFriend={item?.isFriend}
                onPressConnectBtn={handleFriendRequest}
                userId={item?.user?._id}
              />
            )}
          />
        </View>
      </Loader>
    </SafeAreaView>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  scrollViewStyles: {
    marginVertical: widthPixel(10),
    paddingHorizontal: widthPixel(15),
    flex: 1,
  },
  safeAreaViewStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
});
