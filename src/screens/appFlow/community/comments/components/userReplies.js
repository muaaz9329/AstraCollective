import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appImages, fontFamily, widthPixel} from '../../../../../services';
import {formatCommentTime} from '../../../../../services/helpingMethods';

const UserReply = ({replyData}) => {
  const {user} = replyData;
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagesStyles}
        source={{
          uri: user?.image,
        }}
      />
      <View
        style={{
          marginLeft: widthPixel(10),
        }}>
        <Text style={styles.nameStyles}>
          {user?.userName || user?.firstName + ' ' + user?.lastName}{' '}
          <Text style={styles.dayStyles}>
            {formatCommentTime(replyData?.createdAt)}
          </Text>
        </Text>
        <Text style={styles.commentStyles}>{replyData.text}</Text>
      </View>
    </View>
  );
};

export default UserReply;

const styles = StyleSheet.create({
  replyStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(13),
    color: 'rgba(0,0,0,0.4)',
    marginTop: widthPixel(5),
  },
  commentStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(16),
    color: 'black',
    marginTop: widthPixel(5),
  },
  dayStyles: {
    color: 'rgba(0,0, 0, 0.4)',
    fontSize: widthPixel(13),
  },
  nameStyles: {
    fontSize: widthPixel(14),
    fontFamily: fontFamily.MontserratRegular,
    color: 'black',
  },
  imagesStyles: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  container: {
    flexDirection: 'row',
    marginVertical: widthPixel(14),
  },
});
