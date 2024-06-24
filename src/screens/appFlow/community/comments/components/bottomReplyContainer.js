import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appIcons, fontFamily, widthPixel} from '../../../../../services';
import {formatCommentTime} from '../../../../../services/helpingMethods';

function BottomReplyContainer({comments, props, index, closeReplyCont}) {
  return (
    <View style={styles.replyCont}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={styles.replyUser}
          source={{
            uri: comments[index].comment?.user?.image,
          }}
        />
        <View>
          <Text style={styles.nameStyles}>
            {comments[index].comment?.user?.userName ||
              comments[index].comment?.user?.firstName +
                ' ' +
                comments[index].comment?.user?.lastName}{' '}
            <Text style={styles.dayStyles}>
              {formatCommentTime(comments[index].comment?.createdAt)}
            </Text>
          </Text>
          <Text style={styles.commentStyles}>
            {comments[index].comment?.text.length > 24
              ? comments[index].comment?.text.slice(0, 24) + '...'
              : comments[index].comment?.text}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={closeReplyCont}>
        <Image source={appIcons.cross} style={styles.replyContCrossBtn} />
      </TouchableOpacity>
    </View>
  );
}

export default BottomReplyContainer;

const styles = StyleSheet.create({
  replyCont: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: widthPixel(12),
    justifyContent: 'space-between',
  },
  replyUser: {
    width: widthPixel(40),
    height: widthPixel(40),
    borderRadius: widthPixel(40) / 2,
    marginRight: widthPixel(10),
  },
  replyContCrossBtn: {
    height: widthPixel(10),
    width: widthPixel(10),
    alignSelf: 'flex-start',
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
});
