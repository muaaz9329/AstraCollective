import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, widthPixel} from '../../../../../../services';
import UserMsg from './userMsg';
import PostComponent from './postComponent';
import StoryComponent from './storyComponent';

const MsgBox = ({
  messages = {
    ['2024-03-13']: (messages = [
      {
        _id: '661e7f9b6f824ffe73f23c75',
        chatId: '661e7f9b6f824ffe73f23c73',
        sender: {
          location: {
            type: 'Point',
            coordinates: [0, 0],
          },
          isSocial: false,
          _id: '65fd5a8c773ae662f0127598',
          subscriptionType: 'not-subscribed',
          email: 'muaazkhan1575@gmail.com',
          totalPosts: 42,
          totalLikes: 49,
          isBlocked: false,
          image:
            'https://astraappbucket.s3.us-east-2.amazonaws.com/1711436730244',
          interests: [
            {
              _id: '65f3e35d1a721037da296baa',
              name: 'just for testing ',
              __v: 0,
            },
          ],
          genres: [
            {
              _id: '65dd990815031bac650580f7',
              name: 'French Cuisine',
              __v: 0,
            },
            {
              _id: '65dd98b815031bac650580f0',
              name: 'Tap Dance',
              __v: 0,
            },
          ],
          characters: [
            {
              _id: '65f434d0729e72d220658890',
              text: 'Alexei Volkov',
              img: 'https://drivebuddyz.s3.us-east-2.amazonaws.com/11147.png',
              __v: 0,
            },
          ],
          gender: 'male',
          passwordChangedAt: '2024-03-22T10:16:44.075Z',
          profileCompleted: true,
          interestSelected: true,
          generesSelected: true,
          characterSelected: true,
          role: 'user',
          otp: 2907,
          otpExpires: '2024-03-22T10:17:44.075Z',
          verified: true,
          customerId: 'cus_PmeSf4lXo3hM9n',
          isNotification: true,
          createdAt: '2024-03-22T10:16:44.077Z',
          updatedAt: '2024-04-16T10:31:46.074Z',
          __v: 0,
          firstName: 'Muaaz',
          lastName: 'Khan',
          userName: 'Maazy9329',
          deviceToken: '3242fwefwe4324',
          id: '65fd5a8c773ae662f0127598',
        },
        receiver: {
          location: {
            type: 'Point',
            coordinates: [0, 0],
          },
          isSocial: false,
          _id: '65ded0e2083996eeadd7561e',
          name: 'Muaz Ali',
          email: 'asifali6374077@gmail.com',
          totalPosts: 7,
          isBlocked: false,
          image:
            'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg',
          interests: [
            {
              _id: '65dd97eb15031bac650580e2',
              name: 'Cooking',
              __v: 0,
            },
            {
              _id: '65dd980515031bac650580e5',
              name: 'Music',
              __v: 0,
            },
          ],
          genres: [
            {
              _id: '65dd98a515031bac650580ed',
              name: 'Jazz Dance',
              __v: 0,
            },
            {
              _id: '65dd991a15031bac650580fa',
              name: 'Mexican Cuisine',
              __v: 0,
            },
          ],
          characters: [],
          gender: 'male',
          passwordChangedAt: '2024-02-28T12:17:19.282Z',
          profileCompleted: false,
          interestSelected: false,
          role: 'user',
          otp: 3320,
          otpExpires: '2024-03-13T08:31:43.716Z',
          verified: true,
          customerId: 'cus_PdyTx0m1QuniPm',
          isNotification: true,
          connectionRequests: ['65df2c17c1c640bf4773ba77'],
          friends: [],
          createdAt: '2024-02-28T06:21:22.859Z',
          updatedAt: '2024-04-16T11:42:39.661Z',
          __v: 3,
          deviceToken: '3242fwefwe4324',
          totalLikes: 4,
          firstName: 'Muhammad',
          lastName: 'Asif',
          characterSelected: false,
          generesSelected: false,
          subscriptionType: 'not-subscribed',
          userName: 'mike',
          id: '65ded0e2083996eeadd7561e',
        },
        message: 'Hello, how are you?',
        seen: true,
        type: 'text',
        createdAt: '2024-04-16T13:39:39.722Z',
        updatedAt: '2024-04-16T13:39:39.722Z',
        __v: 0,
      },
    ]),
  },
  userId,
  formatDate,
}) => {
  const msgArr = Object.keys(messages).sort();
  return (
    <View>
      {msgArr.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginVertical: widthPixel(10),
            }}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayTextStyles}>{formatDate(item)}</Text>
            </View>
            {messages[item] &&
              messages[item].map((msg, index) => {
                // console.log(msg?.type);
                if (msg?.type === 'text') {
                  return (
                    <UserMsg
                      key={index}
                      isUser={msg?.sender?._id === userId}
                      msg={msg.message}
                    />
                  );
                } else if (msg?.type === 'post') {
                  //
                  // console.log(JSON.stringify(msg, null, 2));
                  return (
                    <PostComponent
                      isUser={msg?.sender?._id === userId}
                      msg={msg?.post}
                    />
                  );
                } else if (msg?.type === 'story') {
                  console.log(JSON.stringify(msg, null, 2));
                  return (
                    <StoryComponent
                      isUser={msg?.sender?._id === userId}
                      story={msg?.story}
                    />
                  );
                }
              })}
          </View>
        );
      })}
    </View>
  );
};

export default MsgBox;

const styles = StyleSheet.create({
  dayTextStyles: {
    color: colors.grey,
    fontSize: widthPixel(11),
    fontFamily: fontFamily.MontserratMedium,
  },
  dayContainer: {
    paddingVertical: widthPixel(8),
    paddingHorizontal: widthPixel(8),
    backgroundColor: 'rgba(0,0,0, 0.05)',
    alignSelf: 'center',
    borderRadius: widthPixel(6),
    marginBottom: widthPixel(10),
  },
});

{
  /* <View>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {msg.sender}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {msg.msg}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {msg.time}
                  </Text>
                </View> */
}
