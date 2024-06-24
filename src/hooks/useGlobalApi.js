import {apiService} from '../network';
import routes from '../network/routes';
import {appNavigationParam, appRoutes} from '../services';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../services/helpingMethods';
import {useNavigation} from '@react-navigation/native';
const useGlobalApi = () => {
  const navigation = useNavigation();
  const setPostLike = async (setLike, postId) => {
    console.log('like');
    setLike(prev => {
      return {
        isLiked: true,
        likes: prev.likes + 1,
      };
    });
    await apiService.Post({
      url: routes.likePost,
      setLoading: val => console.log({val}),
      body: {
        post: postId,
      },
      OnSuccess: res => {},
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
        setTimeout(() => {
          setLike(prev => {
            return {
              isLiked: false,
              likes: prev.likes - 1,
            };
          });
        }, 1000);
      },
    });
  };

  const setPostUnlike = async (setLike, postId) => {
    console.log('unlike');
    setLike(prev => {
      return {
        isLiked: false,
        likes: prev.likes - 1,
      };
    });
    await apiService.Post({
      url: routes.unlikePost + '/' + postId,
      setLoading: val => console.log({val}),
      OnSuccess: res => {},
      OnError: e => {
        console.log('error');
        console.log(e);
        ErrorFlashMessage('Something went wrong');
        setTimeout(() => {
          setLike(prev => {
            return {
              isLiked: true,
              likes: prev.likes + 1,
            };
          });
        }, 1000);
      },
    });
  };

  const sendFriendRequest = async (setFriend, userId) => {
    setFriend('Pending');
    await apiService.Post({
      url: routes.sendFriendRequest,
      body: {
        receiver: userId,
      },
      setLoading: val => console.log({val}),
      OnSuccess: res => {},
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
        setTimeout(() => {
          setFriend('not-friend');
        }, 1000);
      },
    });
  };

  const cancelFriendRequest = async (setFriend, userId) => {
    setFriend('not-friend');
    await apiService.Post({
      url: routes.cancelFriendRequest + '/' + userId,

      setLoading: val => console.log({val}),
      OnSuccess: res => {},
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
        setTimeout(() => {
          setFriend('Pending');
        }, 1000);
      },
    });
  };

  const unfriendUser = async (setFriend, userId) => {
    setFriend('not-friend');
    await apiService.Post({
      url: routes.unfriend + '/' + userId,

      setLoading: val => console.log({val}),
      OnSuccess: res => {},
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
        setTimeout(() => {
          setFriend('Friend');
        }, 1000);
      },
    });
  };

  const handleLike = async (like, setLike, postId) => {
    if (like.isLiked) {
      await setPostUnlike(setLike, postId);
    } else {
      await setPostLike(setLike, postId);
    }
  };

  const handleFriendRequest = async (friend, setFriend, userId) => {
    console.log({
      friend,
      setFriend,
      userId,
    });
    if (friend === 'not-friend') {
      console.log('sendFriendRequest');
      await sendFriendRequest(setFriend, userId);
    } else if (friend.toLowerCase() === 'pending') {
      console.log('cancelFriendRequest');
      await cancelFriendRequest(setFriend, userId);
    } else {
      await unfriendUser(setFriend, userId);
    }
  };

  const onPressBook = bookData => {
    navigation.navigate(appRoutes.readings, {
      comingFor: appNavigationParam['reading'].oldStory,
      id: bookData._id,
    });
  };

  const deletePost = async id => {
    await apiService.Delete({
      url: routes.deletePost + '/' + id,
      setLoading: val => console.log({val}),
      OnSuccess: res => {
        SuccessFlashMessage('Post deleted successfully');
      },
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  return {
    setPostLike,
    setPostUnlike,
    handleLike,
    handleFriendRequest,
    onPressBook,
    deletePost,
  };
};
export default useGlobalApi;
