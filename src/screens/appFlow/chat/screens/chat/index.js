import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../../../components';
import {appIcons, colors, widthPixel} from '../../../../../services';
import UserProfile from './components/userProfile';
import MsgBox from './components/msgBox';
import {styles} from './styles';
import useSocket from '../../../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {AppReducers} from '../../../../../redux/store';
import Loader from '../../../../../components/loader/Loader';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {hexToRGBA, statusText} from '../../../../../services/helpingMethods';
import AppText from '../../../../../components/text/appText';
import BookCard from '../../../../../components/bookCard/book-card';
import PostComponent from './components/postComponent';

const ChatScreen = ({navigation}) => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const {userData} = useSelector(state => state[AppReducers['UserData']]);
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const shouldShowLoadingRef = useRef(true);
  const {userToMsg} = useRoute()?.params;
  const {userName, image, id: Id} = userToMsg;

  useEffect(() => {
    socket.emit(
      'join-room',
      {
        userId: userData?._id,
        inbox: Id,
      },
      data => {
        console.log(data);
      },
    );
  }, []);

  socket.on('messages', data => {
    console.log(JSON.stringify(data));
    const {messages} = data;

    //* frequency Counter Pattern
    let dateSet = new Set();
    messages.map(item => {
      let date = new Date(item.createdAt).toISOString().split('T')[0];
      dateSet.add(date);
    });

    const obj = {};
    dateSet.forEach(itemVal => {
      obj[itemVal] = [];
      for (let item of messages) {
        if (
          new Date(item.createdAt).toISOString().split('T')[0] ===
          String(itemVal)
        ) {
          obj[itemVal].push(item);
        }
      }
      obj[itemVal] = obj[itemVal].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
    });
    //*------------------------------
    setMessage(obj);
    setUserMsg('');
    if (shouldShowLoadingRef.current) {
      setLoading(false);
      shouldShowLoadingRef.current = false;
    }
  });

  const handleMsgSubmit = async () => {
    Keyboard.dismiss();
    if (userMsg.length > 0) {
      console.log({
        userId: userData?._id,
        to: Id,
        message: userMsg,
        messageType: 'text',
        messageTime: new Date(),
      });
      socket.emit('send-message', {
        userId: userData?._id,
        to: Id,
        message: userMsg,
        messageType: 'text',
        messageTime: Date.now(),
      });
    } else {
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Loader loading={loading}>
        <Header isBack={true}>
          <UserProfile imgUrl={image} name={userName} />
        </Header>

        <KeyboardAwareScrollView
          nestedScrollEnabled
          style={{}}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              paddingVertical: widthPixel(10),
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {message && (
                <MsgBox
                  messages={message}
                  userId={userData?._id}
                  formatDate={formatDate}
                />
              )}

              {/* <PostComponent isUser={true} /> */}
            </ScrollView>

            <View style={styles.messageContainer}>
              <TextInput
                placeholder="Message..."
                value={userMsg}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                onChangeText={text => {
                  setUserMsg(text);
                }}
                style={styles.textInputStyle}
                onSubmitEditing={handleMsgSubmit}
              />

              <TouchableOpacity onPress={handleMsgSubmit}>
                <Image source={appIcons.send3} style={styles.sendStyle} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Loader>
    </SafeAreaView>
  );
};

export default ChatScreen;

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (
    date >= today &&
    date <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
  ) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
      (day < 10 ? '0' + day : day) +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      year
    );
  }
}
