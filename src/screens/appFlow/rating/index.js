import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../services';
import {Header} from '../../../components';
import RatingStars from './components/rating-stars';
import Button from '../../../components/button';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getOneStorySelector} from '../../../redux/Slices/getOneStorySlice';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import useApi from './hooks/useApi';
import Loader from '../../../components/loader/Loader';

const Rating = () => {
  const navigation = useNavigation();

  const {_id, coverImage} = useSelector(getOneStorySelector);

  const {addRating, loading, review, setReview, rating, setRating} = useApi(
    _id,
    navigation,
  );
  return (
    <Loader loading={loading}>
      <SafeAreaView style={styles.safeAreaViewStyles}>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginBottom: 30,
          }}>
          <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />

          <Header isBack={true} />
          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: coverImage,
                }}
                style={styles.imageStyles}
              />
            </View>
            <Text style={styles.titleStyles}>Let’s rate Book!</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt{' '}
            </Text>

            <RatingStars rating={rating} setRating={setRating} />

            <View style={styles.textContainer}>
              <TextInput
                style={[
                  styles.textStyles,
                  Platform.OS === 'android' && {
                    textAlignVertical: 'top',
                  },
                ]}
                placeholder="Write a review"
                placeholderTextColor={colors.grey}
                multiline={true}
                numberOfLines={3}
                value={review}
                onChangeText={text => setReview(text)}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.btnContainer}>
          <Button
            containerStyle={styles.cancelBtnStyles}
            themeColor={'white'}
            style={styles.cancelTextStyles}
            onPress={() => navigation.goBack()}>
            Cancel
          </Button>
          <Button
            containerStyle={styles.submitBtnStyles}
            onPress={() => {
              addRating();
            }}>
            Submit
          </Button>
        </View>
      </SafeAreaView>
    </Loader>
  );
};

export default Rating;
