import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  appImages,
  colors,
  fontFamily,
  widthPixel,
} from '../../../../../services';
import Button from '../../../../../components/button';

const ShareCard = (
  props = {
    _id: '65ded0e2083996eeadd7561e',
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
    firstName: 'Muhammad',
    lastName: 'Asif',
    userName: 'mike',
    id: '65ded0e2083996eeadd7561e',
    handleSend: () => {},
    storyId,
  },
) => {
  const [status, setStatus] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image source={{uri: props.image}} style={styles.imgStyles} />
        <Text style={styles.textStyles}>
          {props.userName || `${props.firstName} ${props.lastName}`}{' '}
        </Text>
      </View>
      <View>
        <Button
          containerStyle={[
            styles.btnStyles,
            status && {
              backgroundColor: 'white',
              borderColor: colors.theme,
              borderWidth: 1,
            },
          ]}
          style={{
            fontFamily: fontFamily.MontserratMedium,
            color: status ? colors.theme : 'white',
          }}
          disable={status}
          onPress={() => {
            props.handleSend(props._id, props?.storyId, setStatus);
          }}>
          {status ? 'Sent' : 'Send'}
        </Button>
      </View>
    </View>
  );
};

export default ShareCard;

const styles = StyleSheet.create({
  btnStyles: {
    width: '60%',
    borderRadius: 12,
    height: widthPixel(36),
  },
  textStyles: {
    fontSize: widthPixel(15),
    fontFamily: fontFamily.MontserratMedium,
    marginLeft: widthPixel(10),
    color: colors.black,
  },
  imgStyles: {
    height: widthPixel(40),
    width: widthPixel(40),
    borderRadius: widthPixel(20),
    marginLeft: widthPixel(10),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginVertical: widthPixel(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
