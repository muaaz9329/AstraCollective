import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../../../services/constants/globalStyles';
import {Header} from '../../../../../components';
import BookCard from '../../../../../components/bookCard/book-card';
import {widthPixel} from '../../../../../services';
import UserCard from '../../mianMenu/components/userCard';
import {useRoute} from '@react-navigation/native';
import useApi from './hooks/useApi';
import Loader from '../../../../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import useGlobalApi from '../../../../../hooks/useGlobalApi';
import {AppReducers} from '../../../../../redux/store';
import PostCard from '../../../../../components/postCard/postCard';
import {
  formatPostDate,
  formatTimeString,
} from '../../../../../services/helpingMethods';
const TagsSearchResult = () => {
  const {name} = useRoute()?.params || {
    name: 'Dancing',
  };
  const {loading, posts} = useApi();
  const {handleLike, handleFriendRequest, onPressBook} = useGlobalApi();
  const navigation = useNavigation();
  const {userData} = useSelector(state => state[AppReducers['UserData']]);
  // const onPressBook = bookData => {
  //   navigation.navigate(appRoutes.readings, {
  //     comingFor: appNavigationParam['reading'].oldStory,
  //     id: bookData._id,
  //   });
  // };
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header title={`#${name}`} isBack />
      <Loader loading={loading}>
        <View style={globalStyles.secondaryContainer}>
          <FlatList
            data={posts}
            keyExtractor={item => item._id}
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

export default TagsSearchResult;

const styles = StyleSheet.create({});
