import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Montserrat,
  appImages,
  colors,
  fontFamily,
  widthPixel,
} from '../../../../services';
import AppText from '../../../../components/text/appText';
import Button from '../../../../components/button';

const FriendRequestCard = (
  props = {
    _id: '661fcb08ea1de098f8bf5782',
    sender: {
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
      _id: '66150efa9fcea9b54cb09e49',
      subscriptionType: 'not-subscribed',
      email: 'maazy9329@gmail.com',
      totalPosts: 0,
      totalLikes: 0,
      isSocial: true,
      isBlocked: false,
      image:
        'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg',
      interests: [
        {
          _id: '65f3e35d1a721037da296baa',
          name: 'just for testing ',
          __v: 0,
        },
      ],
      genres: [
        {
          _id: '65f3e38b1a721037da296bca',
          name: 'only for Testing',
          __v: 0,
        },
      ],
      characters: [
        {
          _id: '65f4345f729e72d22065887d',
          text: 'Mei Lin',
          img: 'https://drivebuddyz.s3.us-east-2.amazonaws.com/10046.png',
          __v: 0,
        },
      ],
      gender: 'male',
      profileCompleted: true,
      interestSelected: true,
      generesSelected: true,
      characterSelected: true,
      role: 'user',
      verified: true,
      customerId: 'cus_PtO4dAsPE15umy',
      isNotification: true,
      createdAt: '2024-04-09T09:48:42.521Z',
      updatedAt: '2024-04-17T13:13:27.764Z',
      __v: 0,
      deviceToken: 'bramble',
      firstName: 'Maazy',
      lastName: 'Khan',
      userName: 'Maazy300',
      id: '66150efa9fcea9b54cb09e49',
    },
    receiver: '65fd5a8c773ae662f0127598',
    status: 'pending',
    __v: 0,
    handleAccept: () => {},
    handleReject: () => {},
  },
) => {
  return (
    <View style={[styles.cardContainer, styles.bottomMargin]}>
      <View style={styles.secondaryContainer}>
        <Image
          source={{
            uri: props?.sender?.image,
          }}
          style={styles.profileImageStyles}
        />
        <View style={styles.textContainer}>
          <AppText weight={500} lineHeight={20}>
            {props.sender.userName}
          </AppText>
          <AppText
            weight={500}
            fontSize={12}
            textStyles={{
              marginTop: widthPixel(3),
            }}>
            {props.sender.firstName} {props.sender.lastName}
          </AppText>
        </View>
      </View>
      <View style={[styles.textContainer, styles.cardContainer]}>
        <Button
          containerStyle={styles.btnContainer}
          style={styles.btnStyles}
          onPress={() => {
            props.handleAccept(props._id);
          }}>
          Accept
        </Button>
        <Button
          containerStyle={styles.secondaryBtnContainer}
          style={styles.secondaryBtnText}
          onPress={() => {
            props.handleReject(props._id);
          }}>
          Reject
        </Button>
      </View>
    </View>
  );
};

export default FriendRequestCard;

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: widthPixel(20),
  },
  secondaryBtnText: {
    fontFamily: Montserrat(500),
    fontSize: widthPixel(12),
    color: colors.theme,
  },
  secondaryBtnContainer: {
    width: widthPixel(75),
    borderRadius: widthPixel(8),
    height: widthPixel(35),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.theme,
  },
  btnStyles: {
    fontFamily: Montserrat(500),
    fontSize: widthPixel(12),
  },
  btnContainer: {
    width: widthPixel(75),
    borderRadius: widthPixel(8),
    height: widthPixel(35),
    marginHorizontal: widthPixel(8),
  },
  textContainer: {
    marginLeft: widthPixel(10),
  },
  profileImageStyles: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
  },
  secondaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
