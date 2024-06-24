import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, widthPixel} from '../../../../../../services';
import {
  formatPostDate,
  hexToRGBA,
} from '../../../../../../services/helpingMethods';
import UserProfile from './userProfile';
import AppText from '../../../../../../components/text/appText';
import BookCard from '../../../../../../components/bookCard/book-card';

const PostComponent = ({
  isUser = true,
  msg = {
    _id: '66025fee9009b714572a26c2',
    user: {
      _id: '65fd5a8c773ae662f0127598',
      image: 'https://astraappbucket.s3.us-east-2.amazonaws.com/1711436730244',
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
      firstName: 'Muaaz',
      lastName: 'Khan',
      userName: 'Maazy9329',
      id: '65fd5a8c773ae662f0127598',
    },
    story: {
      character: [],
      _id: '65f4302cb8706e4d9d2cc9e8',
      title: '"The Ballroom Chef: A Magical Journey of Music and Food"',
      coverImage:
        'https://astraappbucket.s3.amazonaws.com/astra-collection-1710501928510-%22The%20Ballroom%20Chef%3A%20A%20Magical%20Journey%20of%20Music%20and%20Food%22.png',
      interests: ['Cooking', 'Music'],
      genres: ['Tap Dance', 'Ballroom Dance'],
    },
    text: 'This is edited post',
    title: '"The Ballroom Chef: A Magical Journey of Music and Food"',
    cover:
      'https://astraappbucket.s3.amazonaws.com/astra-collection-1710501928510-%22The%20Ballroom%20Chef%3A%20A%20Magical%20Journey%20of%20Music%20and%20Food%22.png',
    totalLikes: 2,
    totalComments: 1,
    createdAt: '2024-03-26T05:41:02.966Z',
    updatedAt: '2024-04-05T05:26:30.696Z',
    __v: 1,
    genres: [],
    interests: [],
    id: '66025fee9009b714572a26c2',
  },
}) => {
  return (
    <View
      style={[
        {
          width: '90%',
          paddingVertical: widthPixel(10),
          paddingHorizontal: widthPixel(10),
          borderRadius: widthPixel(10),

          backgroundColor: isUser
            ? hexToRGBA(colors.theme, 0.7)
            : 'rgba(248, 248, 248, 1)',

          alignSelf: isUser ? 'flex-end' : 'flex-start',
          marginVertical: widthPixel(4),
          marginHorizontal: widthPixel(14),
        },
        isUser
          ? {
              borderTopRightRadius: 0,
            }
          : {
              borderBottomLeftRadius: 0,
            },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <UserProfile
          status={String(msg?.createdAt).split("T")[0]}
          imgUrl={msg?.user?.image}
          name={msg?.user?.userName}
          textColor={isUser ? 'white' : 'black'}
        />
      </View>
      <View
        style={{
          marginTop: widthPixel(10),
        }}>
        <AppText color={isUser ? 'white' : 'black'}>{msg?.text}</AppText>
      </View>
      <BookCard
        bookData={msg?.story}
        bookName={msg?.story?.title}
        interests={msg?.story?.interests}
        genres={msg?.story?.genres}
        imageUri={msg?.story?.coverImage}
        duration={' '}
        showRightIcon={false}
      />
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({});
