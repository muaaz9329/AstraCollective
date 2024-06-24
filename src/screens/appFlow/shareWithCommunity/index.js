import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../services/constants/globalStyles';
import {Header} from '../../../components';
import {appNavigationParam, widthPixel} from '../../../services';
import UserCard from './components/userCard';
import BookCard from '../../../components/bookCard/book-card';
import useKeyboard from '../../../hooks/useKeyboard';
import styles from './styles';
import useApi from './hooks/useApi';
import {useSelector} from 'react-redux';
import {getOneStorySelector} from '../../../redux/Slices/getOneStorySlice';
import {userDataSelector} from '../../../redux/Slices/userDataSlice';
import {formatTimeString} from '../../../services/helpingMethods';
import Loader from '../../../components/loader/Loader';
import {useRoute} from '@react-navigation/native';
const PostComponent = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.postTextStyles}>Post</Text>
    </TouchableOpacity>
  );
};

const ShareWithCommunity = ({navigation}) => {
  const {hideKeyboard} = useKeyboard();
  const {_id, coverImage, title, interests, genres, estimatedTime} =
    useSelector(getOneStorySelector); // from store
  const {comingFor, postData} = useRoute()?.params || {
    comingFor: appNavigationParam['postInCommunity'].newPost,

    postData: '',
  };

  const {userData} = useSelector(userDataSelector); // from store

  const {userName, image} = userData;

  const {postText, setPostText, loading, createPost, updatePost} = useApi(
    comingFor,

    postData,
  );
  const postInCommunity = () => {
    if (comingFor === appNavigationParam['postInCommunity'].newPost) {
      createPost(_id);
    } else if (comingFor === appNavigationParam['postInCommunity'].editPost) {
      updatePost();
    }
  };
  return (
    <Loader loading={loading}>
      <SafeAreaView style={globalStyles.container}>
        <Header
          isBack={true}
          title={'Share in Community'}
          rightSideComponent={() => {
            return <PostComponent onPress={postInCommunity} />;
          }}
        />
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <View style={globalStyles.secondaryContainer}>
            <UserCard image={image} name={userName} />
            <View
              style={{
                marginVertical: widthPixel(15),
              }}>
              <TextInput
                placeholder={'Write something...'}
                placeholderTextColor={'#BDBDBD'}
                style={styles.textInputStyles}
                value={postText}
                onChangeText={txt => {
                  setPostText(txt);
                }}
                multiline
              />
            </View>
            <BookCard
              showRightIcon={false}
              imageUri={coverImage}
              bookName={title}
              genres={genres}
              interests={interests}
              duration={
                estimatedTime ? formatTimeString(estimatedTime) : '3m 30s'
              }
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Loader>
  );
};

export default ShareWithCommunity;
