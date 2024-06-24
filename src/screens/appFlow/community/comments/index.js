import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../../components';
import {
  appIcons,
  appImages,
  colors,
  fontFamily,
  widthPixel,
} from '../../../../services';
import UserComment from './components/userComment';
import {useRoute} from '@react-navigation/native';
import useApi from './hook/useApi';
import Loader from '../../../../components/loader/Loader';
import {commentSelector} from '../../../../redux/Slices/commentSlice';
import {useSelector} from 'react-redux';
import {formatCommentTime} from '../../../../services/helpingMethods';
import BottomReplyContainer from './components/bottomReplyContainer';
import {AppReducers} from '../../../../redux/store';
import useKeyboard from '../../../../hooks/useKeyboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CommentScreen = () => {
  const {_id} = useRoute().params || {
    _id: '66013d4404a90037402ca55f',
  };
  const {loading, addComment, setUserComment, userComment, addReplies} =
    useApi(_id);
  const {comments} = useSelector(commentSelector);
  const [replyIndex, setReplyIndex] = useState(null);
  const {hideKeyboard} = useKeyboard();
  console.log(comments);
  const setReply = index => {
    setReplyIndex(index);
  };
  const closeReplyCont = () => {
    setReplyIndex(null);
  };

  const handleSending = async () => {
    console.log('i ran');
    if (
      userComment.length === 0 &&
      /^(?=.*[a-zA-Z0-9!@#$%^&*()-_=+{}\[\]|;:'",<.>/?]).+$/.test(
        userComment,
      ) === false
    )
      return;
    if (replyIndex != null) {
      console.log('replying');
      let commentId = comments[replyIndex]?.comment?._id;
      addReplies(commentId);
      setReplyIndex(null);
      // setUserComment('');
    } else {
      addComment();
      setUserComment('');
    }
    hideKeyboard();
  };

  return (
    <Loader loading={loading}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header isBack={true} title={'Comments'} />
        <KeyboardAwareScrollView
          nestedScrollEnabled
          style={{}}
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={styles.commentsContainer}>
            <FlatList
              data={comments}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => (
                <UserComment
                  commentData={item}
                  index={index}
                  setReply={setReply}
                />
              )}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              contentContainerStyle={{
                paddingBottom: 100,
                flexGrow: 1,
              }}
            />

            <View style={styles.messageContainer}>
              {replyIndex !== null && (
                <BottomReplyContainer
                  comments={comments}
                  index={replyIndex}
                  closeReplyCont={closeReplyCont}
                />
              )}
              <View style={styles.msgCont}>
                <View style={styles.textInputStyles}>
                  <TextInput
                    placeholder="Add Comment"
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    style={styles.textInputStyle}
                    value={userComment}
                    onChangeText={text => {
                      setUserComment(text);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleSending}>
                  <Image
                    source={appIcons.send3}
                    style={{
                      height: widthPixel(30),
                      width: widthPixel(30),
                      transform: [{rotate: '-45deg'}],
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Loader>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#FAFAFA',
    width: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsContainer: {
    marginVertical: widthPixel(10),
    flex: 1,
    marginHorizontal: widthPixel(15),
    justifyContent: 'space-between',
  },
  textInputStyles: {
    backgroundColor: '#FAFAFA',
    width: '75%',
    borderRadius: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'ios' ? widthPixel(15) : 0,
  },
  messageContainer: {
    width: '100%',

    // marginVertical: 10,
    paddingBottom: 20,
    backgroundColor: 'white',

    paddingTop: 10,
    // borderWidth: 1,
  },
  textInputStyle: {
    fontSize: widthPixel(14),
    fontFamily: fontFamily.MontserratMedium,
    width: '95%',
    color: 'black',
  },
  msgCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
