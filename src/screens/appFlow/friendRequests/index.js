import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import GlobalContainer from '../../../components/GlobalContainer';
import {Header} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../services/constants/globalStyles';
import FriendRequestCard from './components/friendRequestCard';
import {apiService} from '../../../network';
import routes from '../../../network/routes';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../services/helpingMethods';
import Loader from '../../../components/loader/Loader';

const FriendRequest = () => {
  const [loading, setLoading] = useState();
  const [friendRequest, setFriendRequest] = useState();
  const getAllRequests = async () => {
    await apiService.Get({
      url: routes.friendRequest,
      OnSuccess: res => {
        setFriendRequest(res?.data?.friendRequests);
      },
      setLoading,
      OnError: err => {
        ErrorFlashMessage(err);
      },
    });
  };

  const handleAcceptFriendRequest = async id => {
    await apiService.Post({
      url: routes.acceptFriendRequest + '/' + id,
      OnSuccess: res => {
        console.log(res);
        const filteredFriendRequests = friendRequest.filter(
          item => item._id !== id,
        );
        setFriendRequest(filteredFriendRequests);
        SuccessFlashMessage('Friend Request Accepted');
      },
      OnError: res => {
        console.log(res);
        ErrorFlashMessage(res.data.message);
      },
      setLoading: setLoading,
    });
  };

  const handleRejectFriendRequest = async id => {
    await apiService.Delete({
      url: routes.rejectFriendRequest + '/' + id,
      OnSuccess: res => {
        console.log(res);
        const filteredFriendRequests = friendRequest.filter(
          item => item._id !== id,
        );
        setFriendRequest(filteredFriendRequests);
        SuccessFlashMessage('Friend Request Rejected');
      },
      OnError: res => {
        console.log(res);
        ErrorFlashMessage(res.data.message);
      },
      setLoading: setLoading,
    });
  };

  useEffect(() => {
    getAllRequests();
  }, []);
  return (
    <SafeAreaView style={globalStyles.container}>
      <Loader loading={loading} />
      <Header isBack={true} title={'Friend Requests'} />
      {friendRequest && (
        <FlatList
          data={friendRequest}
          renderItem={({item}) => (
            <FriendRequestCard
              handleAccept={handleAcceptFriendRequest}
              handleReject={handleRejectFriendRequest}
              {...item}
            />
          )}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={globalStyles.secondaryContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
