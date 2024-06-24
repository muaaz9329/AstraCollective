import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {appIcons, heightPixel, widthPixel} from '../../../../services';

const RatingStars = ({rating, setRating}) => {
  const NoOfStars = [1, 2, 3, 4, 5];
  const ratingHandler = item => {
    if (rating === item) {
      setRating(0);
    } else {
      setRating(item);
    }
  };
  return (
    <View style={styles.container}>
      {NoOfStars.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => ratingHandler(item)}>
            <Image
              source={
                item <= rating ? appIcons.iconFilledStar : appIcons.iconStar
              }
              style={styles.starStyles}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: heightPixel(10),
  },
  starStyles: {
    width: widthPixel(40),
    height: heightPixel(40),
    resizeMode: 'contain',
    marginHorizontal: widthPixel(10),
  },
});
