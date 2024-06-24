import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../services/constants/globalStyles';
import {Header} from '../../../components';
import {
  appIcons,
  appImages,
  appNavigationParam,
  appRoutes,
  colors,
  widthPixel,
} from '../../../services';
import AppText from '../../../components/text/appText';
import Button from '../../../components/button';
import BookCard from '../../../components/bookCard/book-card';
import PostCard from '../../../components/postCard/postCard';
import DashboardHeader from '../../../components/dashboardHeader';
import {useNavigation} from '@react-navigation/native';
import {AppReducers, store} from '../../../redux/store';
import {useSelector} from 'react-redux';
import useApi from './hooks/useApi';
import {
  formatPostDate,
  formatTimeString,
  statusText,
  SuccessFlashMessage,
} from '../../../services/helpingMethods';
import useGlobalApi from '../../../hooks/useGlobalApi';
import Loader from '../../../components/loader/Loader';
import ConnectionModel from '../../../components/model/connectionModel';
function TextContainer({title, no, containerStyle}) {
  return (
    <View style={containerStyle}>
      <AppText
        weight={600}
        fontSize={18}
        textStyles={{
          textAlign: 'center',
        }}>
        {no}
      </AppText>
      <AppText
        weight={600}
        fontSize={14}
        textStyles={{
          textAlign: 'center',
        }}>
        {title}
      </AppText>
    </View>
  );
}

const UserInfo = ({
  name = 'Andrew_Ainsley',
  image = appImages.imageUser,
  post = 100,
  connected = '77.5k',
  like = '100',
}) => {
  return (
    <View style={styles.userInfoContainer}>
      <View>
        <Image source={image} style={styles.imgStyles} />
        <AppText weight={600} fontSize={14} textStyles={styles.userNameStyles}>
          {name}
        </AppText>
      </View>
      <View style={styles.secondaryContainer}>
        <TextContainer title={'Post'} no={post} />
        <TextContainer
          title={'Connection'}
          no={connected}
          containerStyle={{
            marginHorizontal: widthPixel(30),
          }}
        />
        <TextContainer title={'Like'} no={like} />
      </View>
    </View>
  );
};

const UserProfile = ({
  route = {
    params: {
      comingFor: appNavigationParam['userProfile'].ownProfile,
      id: '',
    },
  },
}) => {
  console.log({route});
  const {comingFor, id} = route?.params;
  const {userData} = useSelector(state => state[AppReducers['UserData']]);
  const [friend, setFriend] = useState('pending');
  const {handleFriendRequest, handleLike, onPressBook} = useGlobalApi();
  const isComingForOwn =
    comingFor === appNavigationParam['userProfile'].ownProfile;
  const isComingForUser =
    comingFor === appNavigationParam['userProfile'].otherProfile;
  const navigation = useNavigation();
  const {
    userData: incomingUserData,
    loading,
    onRefresh,
    refresh,
  } = useApi(id, isComingForOwn, isComingForUser, setFriend);

  console.log({id});

  const {user, posts, ConnectedFriends, TotalPosts, totalLikes} =
    incomingUserData;

  const modelRef = useRef(null);
  const handleUnfriendRequest = async () => {
    const response = await handleFriendRequest(friend, setFriend, user?._id);

    modelRef.current?.hideModel();
    SuccessFlashMessage('Friend Removed Successfully');
  };

  console.log(JSON.stringify(incomingUserData, null, 2));

  return (
    <SafeAreaView style={globalStyles.container} edges={['top']}>
      <Loader loading={loading} fullBlank>
        {isComingForUser && (
          <Header title={user?.firstName + ' ' + user?.lastName} isBack />
        )}
        {isComingForOwn && (
          <DashboardHeader
            title={'Profile'}
            onPressRightIcon={() => {
              navigation.navigate(appRoutes.setting);
            }}
            rightIcon={() => {
              return (
                <Image
                  source={appIcons.iconSetting}
                  style={{
                    width: widthPixel(25),
                    height: widthPixel(25),
                  }}
                />
              );
            }}
          />
        )}
        <View style={globalStyles.secondaryContainer}>
          <UserInfo
            name={
              user?.userName
                ? user?.userName
                : user?.firstName + ' ' + user?.lastName
            }
            connected={ConnectedFriends}
            post={TotalPosts}
            like={totalLikes}
            image={{
              uri: user?.image,
            }}
          />
          {isComingForUser && (
            <Button
              containerStyle={[styles.btnStyles]}
              onPress={() => {
                if (friend === 'accepted') {
                  modelRef.current?.showModel();
                  return;
                }
                handleFriendRequest(friend, setFriend, user?._id);
              }}>
              {statusText(friend)}
            </Button>
          )}
          <FlatList
            contentContainerStyle={{paddingTop: widthPixel(20)}}
            data={posts}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                colors={['#007AFF']} // Change the color of the refresh indicator
                tintColor={'#007AFF'} // Change the color of the refresh indicator
                progressBackgroundColor={'#ffffff'} // Change the background color of the refresh indicator
              />
            }
            renderItem={({item}) => {
              return (
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
                  disableProfileBtn={true}
                  showNonBtns={isComingForUser}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Loader>
      <ConnectionModel ref={modelRef} onPressYes={handleUnfriendRequest} />
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  btnStyles: {
    borderRadius: widthPixel(10),
    marginVertical: widthPixel(20),
  },
  secondaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameStyles: {
    marginTop: widthPixel(5),
    textAlign: 'center',
  },
  imgStyles: {
    width: widthPixel(80),
    height: widthPixel(80),
    borderRadius: widthPixel(40),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: widthPixel(5),
    justifyContent: 'space-between',
  },
});
