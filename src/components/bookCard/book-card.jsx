import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {
  Montserrat,
  appIcons,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../services';
import UpgradePlanModel from '../model/upgrade-plan-model';
import useDownload from '../../hooks/useDownload';

export default function BookCard({
  bookName = 'The 7 Habits ',
  // category = 'Self Help',
  duration = '1h 30m',
  isDownloaded = false,
  isMyStory = false,
  imageUri = 'data:image/jpeg;base64,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',
  isPremium = false,
  onPress,
  showRightIcon = true,
  genres = ['Art', 'Craft', 'Comic'],
  interests = ['Adventure'],
  bookData,
  onPressRightIcon = () => {},
  onPressDownload = () => {},
  onPressDelete = () => {},
  _id,
}) {
  const modelRef = useRef();

  const {isAlreadyDownloaded} = useDownload();

  // console.log('isAlreadyDownloaded-->', isAlreadyDownloaded(bookData));

  const BOOK_NAME = (
    bookName.length > 17 ? bookName.slice(0, 17) + '...' : bookName
  )
    .trim()
    .replace(/"/g, '');

  const GENRES =
    genres.length > 3
      ? genres.slice(0, 3).join(', ') + '...'
      : genres.join(', ');

  const INTERESTS =
    interests.length > 3
      ? interests.slice(0, 3).join(', ') + '...'
      : interests.join(', ');

  return (
    <Pressable
      onPress={() => {
        onPress && onPress(bookData);
        isPremium && modelRef.current.showModel();
        //! Uncomment this line to see the model
      }}>
      <UpgradePlanModel ref={modelRef} />
      <View style={styles.itemBox}>
        <View style={styles.showdow}>
          <Image
            style={[styles.bookImage]}
            source={{
              uri: imageUri,
            }}
          />
        </View>

        <View style={{flex: 2, alignSelf: 'center'}}>
          <Text style={styles.name}>{BOOK_NAME}</Text>
          <Text style={styles.title}>
            Interest: <Text style={styles.faded}>{INTERESTS}</Text>{' '}
          </Text>
          <Text style={styles.title}>
            Geners: <Text style={styles.faded}>{GENRES}</Text>{' '}
          </Text>
          <Text style={styles.duration}>{duration}</Text>
        </View>

        {showRightIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressRightIcon && onPressRightIcon();
              if (!isAlreadyDownloaded(bookData)) {
                onPressDownload && onPressDownload(bookData);
              }
              if (isAlreadyDownloaded(bookData)) {
                onPressDelete && onPressDelete(_id);
              }
            }}>
            <Image
              source={
                isPremium
                  ? appIcons.upgrade
                  : isDownloaded || isMyStory
                  ? appIcons.delete
                  : !isAlreadyDownloaded(bookData) && appIcons.iconDownload
              }
              style={styles.itemIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  faded: {
    color: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontFamily: Montserrat(500),
    fontSize: fontPixel(12),
    color: 'black',
    marginVertical: 2,
  },
  showdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  itemBox: {
    width: '97.5%',
    borderRadius: 12,
    backgroundColor: colors.white,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: heightPixel(16),

    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  bookImage: {
    height: heightPixel(92),
    width: widthPixel(70),
    borderRadius: 12,
    marginRight: widthPixel(10),
    // resizeMode: 'contain',
  },
  itemIcon: {
    height: heightPixel(20),
    width: heightPixel(20),
    resizeMode: 'contain',
  },
  name: {
    fontFamily: Montserrat(600),
    fontSize: fontPixel(17),
    color: colors.black,
  },
  category: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(16),
    color: colors.grey,
  },
  duration: {
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: fontPixel(15),

    color: colors.black,
  },
});
