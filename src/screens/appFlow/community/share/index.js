import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../../components';
import {widthPixel} from '../../../../services';
import SearchBar from '../../../../components/searchBar/serachBar';
import ShareCard from './components/shareCard';
import globalStyles from '../../../../services/constants/globalStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiService} from '../../../../network';
import routes from '../../../../network/routes';
import useSocket from '../../../../hooks/useSocket';
import {store} from '../../../../redux/store';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../services/helpingMethods';

const ShareScreen = () => {
  const navigation = useNavigation();
  const socket = useSocket();
  const userId = store.getState().userData?.userData?._id;
  const {_id, typeOfMsg} = useRoute().params;
  const handleSend = async (senderId, storyId, setSend) => {
    try {
      await socket.emit(
        'join-room',
        {
          userId: userId,
          inbox: senderId,
        },
        data => {
          // console.log(data);
        },
      );

      const socketMessageBody = {
        userId: userId,
        to: senderId,

        messageTime: Date.now(),
        message: '',
      };

      if (typeOfMsg === 'post') {
        socketMessageBody.messageType = 'post';
        socketMessageBody.postId = storyId;
      } else if (typeOfMsg === 'story') {
        socketMessageBody.messageType = 'story';
        socketMessageBody.storyId = storyId;
      }

      // console.log(socketMessageBody);

      await socket.emit('send-message', socketMessageBody);
      setSend(true);
      SuccessFlashMessage('Post shared successfully');
    } catch (err) {
      setSend(false);
      ErrorFlashMessage('Failed to share post');
      console.log(err);
    }
  };
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [Temp, setTemp] = useState([]);
  const [search, setSearch] = useState('');
  const handleSearch = text => {
    if (text.length > 0) {
      let temp = friends.filter(item => {
        return item.userName.toLowerCase().includes(text.toLowerCase());
      });
      setFriends(temp);
    } else {
      setFriends(Temp);
    }
  };

  const getAllFriends = async () => {
    setLoading(true);
    apiService.Get({
      url: routes.getMyFriends,
      OnSuccess: res => {
        console.log(JSON.stringify(res, null, 2));
        setFriends(res?.data?.friends);
        setTemp(res?.data?.friends);
      },
      OnError: err => {
        console.log(err);
      },
      setLoading,
    });
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search]);
  return (
    <SafeAreaView style={globalStyles.container} edges={['top']}>
      <Header isBack={true} title={'Share with Friend'} />
      <View style={globalStyles.secondaryContainer}>
        <View
          style={{
            marginVertical: widthPixel(10),
          }}>
          <SearchBar handleTextChange={setSearch} />
        </View>
        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {friends.map((item, index) => {
              return (
                <ShareCard storyId={_id} {...item} handleSend={handleSend} />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: widthPixel(10),
    flex: 1,
  },
  container: {
    marginHorizontal: widthPixel(10),
    marginVertical: widthPixel(10),
    flex: 1,
  },
  safeAreaViewStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
});
