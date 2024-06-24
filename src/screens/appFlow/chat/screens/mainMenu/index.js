import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DashboardHeader from '../../../../../components/dashboardHeader';
import {widthPixel} from '../../../../../services';
import SearchBar from '../../../../../components/searchBar/serachBar';
import {FlashList} from '@shopify/flash-list';
import SearchCard from './components/searchCard';
import useSocket from '../../../../../hooks/useSocket';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AppReducers} from '../../../../../redux/store';
import io from 'socket.io-client';
import {BASE_URL, BASE_URL_SOCKET} from '../../../../../network/routes';

// const socket = io(BASE_URL_SOCKET);

const MainMenu = () => {
  const socket = useSocket();
  const {userData} = useSelector(state => state[AppReducers.UserData]);
  const [msgs, setMsgs] = useState([]);
  const [tempMsgs, setTempMsgs] = useState([]);
 
  // useFocusEffect(() => {
  //   useCallback(() => {
  //     socket.on('get-inboxes', data => console.log({chatData: data}));
  //   }, []);
  // });
  const navigation = useNavigation();

  const runSocket = () => {
    try {
      socket.emit('get-inboxes', {userId: userData?._id});
    
    } catch (e) {
      console.log('Err', e);
    }
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      runSocket();
    });

    return () => {
      navigation.removeListener('focus');
      console.log('navigation');
    };
  }, []);

  socket.on('inboxes', res => {
   
    setMsgs(res?.data?.inboxes);
    setTempMsgs(res?.data?.inboxes);
  });

  const handleTextChange = text => {
    //handle filtering by name written in search

    if (text === '') {
      setMsgs(tempMsgs);
      return;
    }
    const filteredData = msgs.filter(item => item.userName.includes(text));
    setMsgs(filteredData);
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyles} edges={['top']}>
      <DashboardHeader
        title={'Chat'}
        textStyles={styles.dashboardTextStyles}
        showNotificationIcon
      />

      <View style={styles.containerStyles}>
        <View style={styles.searchBarContainer}>
          <SearchBar handleTextChange={handleTextChange} />
        </View>
        <FlatList
          data={msgs}
          renderItem={({item}) => {
            return <SearchCard {...item} navigation={navigation} />;
          }}
          keyExtractor={item => item.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  searchBarContainer: {
    marginBottom: widthPixel(20),
  },
  containerStyles: {
    marginVertical: widthPixel(10),
    paddingHorizontal: widthPixel(15),
    flex: 1,
  },
  dashboardTextStyles: {
    marginRight: widthPixel(15),
  },
  safeAreaViewStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
});
