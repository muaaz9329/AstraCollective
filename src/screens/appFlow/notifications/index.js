import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

import {
  appIcons,
  appRoutes,
  colors,
  heightPixel,
  widthPixel,
} from '../../../services';
import {styles} from './styles';
import themeContext from '../../../services/config/themeContext';
//import messaging from '@react-native-firebase/messaging';

import {Header} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../../../components/text/appText';
import FriendRequestCard from '../friendRequests/components/friendRequestCard';
import {apiService} from '../../../network';
import routes from '../../../network/routes';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../services/helpingMethods';
import Loader from '../../../components/loader/Loader';

const Notifications = ({n, route}) => {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState();
  const [friendRequests, setFriendRequests] = useState();

  const getAllNotificationAndFriendRequest = async () => {
    setLoading(true);
    await apiService.Get({
      url: routes.getAllNotification,
      setLoading: () => {},
      OnSuccess: res => {
        // console.log(JSON.stringify(res, null, 2));
        setNotification(res?.data?.pageData);
      },
      OnError: res => {
        ErrorFlashMessage(res.data.message);
      },
    });

    await apiService.Get({
      url: routes.friendRequest,
      setLoading,
      OnSuccess: res => {
        if (res?.data?.friendRequests.length > 3) {
          setFriendRequests(res?.data?.friendRequests);
        } else {
          setFriendRequests(res?.data?.friendRequests.slice(0, 3));
        }

        console.log(JSON.stringify(res, null, 2));
      },
      OnError: res => {
        ErrorFlashMessage(res.data.message);
      },
    });
  };

  // const notificationClicked = data => {
  //   console.log(data);
  // };

  // const notif

  const handleAcceptFriendRequest = async id => {
    await apiService.Post({
      url: routes.acceptFriendRequest + '/' + id,
      OnSuccess: res => {
        console.log(res);
        const filteredFriendRequests = friendRequests.filter(
          item => item._id !== id,
        );
        setFriendRequests(filteredFriendRequests);
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
        const filteredFriendRequests = friendRequests.filter(
          item => item._id !== id,
        );
        setFriendRequests(filteredFriendRequests);
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
    navigation.addListener('focus', () => {
      getAllNotificationAndFriendRequest();
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <Loader loading={loading} />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <Header isBack={true} title={'Notifications'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: widthPixel(15),
            color: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: heightPixel(10),
            }}>
            <AppText weight={500} fontSize={14}>
              Friend Requests
            </AppText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(appRoutes.friendRequest);
              }}>
              <AppText weight={500} fontSize={14} color={colors.theme}>
                See All
              </AppText>
            </TouchableOpacity>
          </View>
          {friendRequests &&
            friendRequests.map((item, index) => {
              return (
                <FriendRequestCard
                  handleAccept={handleAcceptFriendRequest}
                  handleReject={handleRejectFriendRequest}
                  {...item}
                  key={index}
                />
              );
            })}
          {notification &&
            notification.map((item, index) => {
              return <ItemRender {...item} key={index} />;
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ItemRender = ({
  _id,
  notifyType,
  sender,
  receiver,
  multireceiver,
  isSeen,
  title,
  text,
  data = {
    user: '',
    usrname: '',
    body: '',
  },
  additionalData,
  actionTaken,
  createdAt,
  updatedAt,
}) => {
  // console.log(item?.createdAt, 'item');
  let ImageSource = notifyType.includes('Friend Request')
    ? appIcons.notifAccountSetup
    : appIcons.notifAccountSetup;
  return (
    <View key={_id} style={styles.notifiView}>
      <View style={styles.notiInnerOne}>
        <View style={styles.notiInnerTwo}>
          <Image style={styles.iconStyle} source={ImageSource} />
          <View>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.time}>
              {formatDateTime(new Date(String(createdAt)))}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.des}>{text}</Text>
    </View>
  );
};
export default Notifications;

function formatDateTime(dateTime) {
  const today = new Date();
  const timeOptions = {hour: 'numeric', minute: '2-digit', hour12: true};

  if (dateTime.toDateString() === today.toDateString()) {
    return 'Today | ' + dateTime.toLocaleTimeString('en-US', timeOptions);
  } else {
    const dateOptions = {month: 'short', day: '2-digit', year: 'numeric'};
    const dateStr = dateTime.toLocaleDateString('en-US', dateOptions);
    return dateStr + ' | ' + dateTime.toLocaleTimeString('en-US', timeOptions);
  }
}
