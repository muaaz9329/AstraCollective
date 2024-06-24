import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useAnimatedValue,
} from 'react-native';
import React from 'react';
import {
  colors,
  fontFamily,
  routes,
  widthPixel,
} from '../../../../../../services';
import {useNavigation} from '@react-navigation/native';
import {formatMessageTime} from '../../../../../../services/helpingMethods';
import AppText from '../../../../../../components/text/appText';
const SearchCard = ({
  isSocial,
  _id,
  name,
  email,
  totalPosts,
  isBlocked,
  image,
  interests,
  genres,
  characters,
  gender,
  passwordChangedAt,
  profileCompleted,
  interestSelected,
  role,
  otp,

  otpExpires,
  verified,
  customerId,
  isNotification,
  connectionRequests,
  friends,
  createdAt,
  updatedAt,
  __v,
  deviceToken,
  totalLikes,
  firstName,
  lastName,
  characterSelected,
  generesSelected,
  subscriptionType,
  userName,
  id,
  lastMessage,
  lastMessageTime,
  unreadMessagesCount,
  navigation,
}) => {
  const message = lastMessage || '';

  //! change the Created at u stupid fuck
  return (
    <TouchableOpacity
      style={styles.Container}
      onPress={() => {
        navigation.navigate(routes.ChatScreen, {
          userToMsg: {
            userName: userName,
            image: image,
            id: _id,
          },
        });
      }}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.imageStyles}
      />
      <View style={styles.secondaryContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameStyles}>{userName}</Text>

          <Text style={styles.nameStyles}>
            {formatMessageTime(new Date(lastMessageTime))}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.messageStyles}>
            {message.length > 40 ? message.slice(0, 40) + '...' : message}
          </Text>

          {unreadMessagesCount > 0 && (
            <View style={styles.unreadMsgContainer}>
              <AppText fontSize={10}>{unreadMessagesCount}</AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  unreadMsgContainer: {
    // borderWidth: 1,
    width: widthPixel(15),
    height: widthPixel(15),
    borderRadius: widthPixel(7.5),
    backgroundColor: colors.themeSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthPixel(5),
  },
  messageStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratLight,
    color: 'black',
    marginTop: widthPixel(3),
  },
  nameStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(15),
    color: 'black',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  secondaryContainer: {
    flex: 1,
    marginLeft: widthPixel(10),
  },
  imageStyles: {
    width: widthPixel(60),
    height: widthPixel(60),
    borderRadius: widthPixel(30),
  },

  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: widthPixel(10),
  },
});
