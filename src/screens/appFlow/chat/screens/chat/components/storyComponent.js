import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BookCard from '../../../../../../components/bookCard/book-card';
import {hexToRGBA} from '../../../../../../services/helpingMethods';
import {colors, widthPixel} from '../../../../../../services';

const StoryComponent = ({
  isUser = true,
  story = {
    character: [],
    _id: '65f41c90cd70e1fea478a38d',
    title: '"The Rhythms of Nature: Alex\'s Journey to Fame and Success"',
    coverImage:
      'https://astraappbucket.s3.amazonaws.com/astra-collection-1710496908311-%22The%20Rhythms%20of%20Nature%3A%20Alex%27s%20Journey%20to%20Fame%20and%20Success%22.png',
    interests: ['Cooking', 'Music'],
    genres: ['Tap Dance', 'Ballroom Dance'],
    user: '65f2a65822af809c2cf2ee9c',
    __v: 0,
  },
}) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
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
      <BookCard
        bookData={story}
        bookName={story?.title}
        duration=" "
        genres={story?.genres}
        interests={story?.interests}
        imageUri={story?.coverImage}
        showRightIcon={false}
      />
    </View>
  );
};

export default StoryComponent;

const styles = StyleSheet.create({});
