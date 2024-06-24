import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  appIcons,
  appNavigationParam,
  appRoutes,
  colors,
  fontFamily,
  Montserrat,
  routes,
  widthPixel,
  wp,
} from '../../services';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import BookCard from '../bookCard/book-card';
import AppText from '../text/appText';
import {useNavigation} from '@react-navigation/native';
import {statusText} from '../../services/helpingMethods';
import {useDispatch} from 'react-redux';
import {setBook} from '../../redux/Slices/getOneStorySlice';
import DeletePostModel from '../model/delete-post';
import useGlobalApi from '../../hooks/useGlobalApi';
import {
  setCommunityRefresh,
  setUserProfileRefresh,
} from '../../redux/Slices/refreshSlice';
const PostCard = ({
  imgUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  name = 'Bożenka Malina',
  time = '12:10 AM',

  postText = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus suscipit, nihil ab iste, facere accusantium, est accusamus non',
  bookName = 'The Alchemist',
  bookImage = '',
  bookDuration = '2h 30m',
  interests = ['Fiction', 'Romance'],
  genres = ['Drama', 'Thriller'],
  bookId = '123',
  isConnection = false,
  isOwner = true,
  likes,
  comments,
  onPressLike,
  Id,
  isLiked,
  bookData,
  onPressBook,
  isFriend = 'owner',
  onPressConnectBtn,
  userId,
  disableProfileBtn = false,
  showNonBtns = false,
}) => {
  const navigation = useNavigation();
  const {deletePost} = useGlobalApi();
  const modelRef = React.useRef();
  const dispatch = useDispatch();
  const [like, setLike] = useState({
    isLiked,
    likes: likes,
  });
  let showConnectBtn = false;
  let showEditDots = false;

  if (isFriend) {
    showConnectBtn = true;
    showEditDots = false;
  }

  if (showNonBtns) {
    showConnectBtn = false;
    showEditDots = false;
  }

  /**
   * * only God and I knows how this works
   * * if you are trying to debug this, good luck
   * * wasted hours : 0
   */
  if (!isFriend || isFriend === 'owner') {
    showConnectBtn = false;
    showEditDots = true;
  }
  const [friend, setFriend] = useState(isFriend);
  useEffect(() => {
    setFriend(isFriend);
  }, [isFriend]);

  /**
   * Edit Menu Functions
   */
  const editPost = postData => {
    // const {story} = postData;
    dispatch(setBook(bookData));
    navigation.navigate(appRoutes.postInCommunity, {
      comingFor: appNavigationParam['postInCommunity'].editPost,
      postData,
    });
  };

  const PostEditMenu = ({postData}) => {
    return (
      <Menu>
        <MenuTrigger>
          <Image
            source={appIcons.iconEdit}
            style={{
              width: widthPixel(20),
              height: widthPixel(20),
            }}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.popupContainer,
          }}>
          <MenuOption
            onSelect={() => {
              editPost({
                id: Id,
                _id: Id,
                text: postText,
              });
            }}>
            <Text style={styles.popTextItem}>Edit Post</Text>
          </MenuOption>

          <MenuOption
            onSelect={() => {
              modelRef.current.showModel();
            }}>
            <Text style={styles.popTextItem}>Delete Post</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  const DeleteThisPost = () => {
    deletePost(Id).then(() => {
      modelRef.current.hideModel();
      dispatch(setUserProfileRefresh(true));
      dispatch(setCommunityRefresh(true));
    });
  };

  return (
    <>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            disabled={disableProfileBtn}
            onPress={() => {
              if (isOwner) {
                navigation.navigate(appRoutes.profileTab, {
                  comingFor: appNavigationParam['userProfile'].ownProfile,
                });
              } else {
                navigation.navigate(appRoutes.otherProfile, {
                  comingFor: appNavigationParam['userProfile'].otherProfile,
                  id: userId,
                });
              }
            }}>
            <Image
              source={{
                uri: imgUrl,
              }}
              style={styles.imageStyles}
            />
            <View>
              <Text style={styles.textStyles}>{name}</Text>
              <Text style={styles.statusTextStyles}>{time}</Text>
            </View>
          </Pressable>
          {!showNonBtns && showConnectBtn && friend && (
            <TouchableOpacity
              style={styles.connectBtnStyles}
              onPress={() => {
                onPressConnectBtn(friend, setFriend, userId);
              }}>
              <AppText fontSize={13} color={colors.theme} weight={600}>
                {statusText(friend)}
              </AppText>
            </TouchableOpacity>
          )}
          {!showNonBtns && showEditDots && <PostEditMenu />}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fontFamily.MontserratRegular,
              fontSize: widthPixel(15),
              color: colors.black,
            }}>
            {postText}
          </Text>
          <BookCard
            showRightIcon={false}
            bookName={bookName}
            imageUri={bookImage}
            interests={interests}
            genres={genres}
            duration={bookDuration}
            bookData={bookData}
            onPress={onPressBook}
          />
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => {
                onPressLike(like, setLike, Id);
              }}>
              <Image
                source={appIcons.iconHeartFill}
                style={[
                  styles.imgStyles,
                  {
                    tintColor: like.isLiked ? 'red' : 'gray',
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.textStyles}>{like.likes}</Text>
          </View>

          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.CommunityComments, {
                  _id: Id,
                });
              }}>
              <Image source={appIcons.chat} style={styles.imgStyles} />
            </TouchableOpacity>
            <Text style={styles.textStyles}>{comments}</Text>
          </View>
          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.CommunityShare, {
                  _id: Id,
                  typeOfMsg: 'post',
                });
              }}>
              <Image source={appIcons.send} style={styles.imgStyles} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DeletePostModel onPressYes={DeleteThisPost} ref={modelRef} />
    </>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  popTextItem: {
    color: '#000000',
    fontFamily: Montserrat(500),
    fontSize: widthPixel(12),
  },
  popupContainer: {
    width: widthPixel(120),
    borderRadius: widthPixel(12),
    paddingHorizontal: widthPixel(10),
    paddingVertical: widthPixel(5),
  },
  connectBtnStyles: {
    paddingVertical: widthPixel(7),
    paddingHorizontal: widthPixel(20),
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: colors.theme,
    borderRadius: widthPixel(8),
  },
  topContainer: {
    marginBottom: widthPixel(15),
  },
  textContainer: {
    marginVertical: widthPixel(10),
  },
  textStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(15),
    color: colors.black,
  },
  imgStyles: {
    height: widthPixel(20),
    width: widthPixel(20),
    resizeMode: 'contain',
    marginRight: widthPixel(2),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: widthPixel(20),
  },
  btnContainer: {
    marginVertical: widthPixel(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratLight,
    marginLeft: widthPixel(10),
    color: 'rgba(0,0,0,0.5)',
    marginTop: widthPixel(3),
  },
  textStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratRegular,
    marginLeft: widthPixel(10),
    color: colors.black,
  },
  imageStyles: {
    height: widthPixel(45),
    width: widthPixel(45),
    borderRadius: widthPixel(25),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
