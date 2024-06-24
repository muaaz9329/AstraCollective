import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  Montserrat,
  appImages,
  appRoutes,
  colors,
  widthPixel,
} from '../../../../../services';
import Button from '../../../../../components/button';
import AppText from '../../../../../components/text/appText';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../components/loader/Loader';

const TagCard = ({onPress, tagInfo = {postCount: 6, tag: 'Cooking'}}) => {
  const {postCount, tag} = tagInfo;
  return (
    <TouchableOpacity style={styles.tagContainer} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.hashContainer}>
          <AppText fontSize={20} weight={500}>
            #
          </AppText>
        </View>
        <View
          style={{
            marginLeft: widthPixel(10),
          }}>
          <Text style={styles.tagName}>{tag}</Text>
          <Text style={styles.tagNameCount}>{postCount} posts</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HashtagResult = ({loading, data}) => {
  const navigation = useNavigation();
  return (
    <Loader loading={loading} fullBlank>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <TagCard
              key={index}
              tagInfo={item}
              onPress={() => {
                navigation.navigate(appRoutes.SearchResultTag, {
                  name: item.tag,
                });
              }}
            />
          )}
          contentContainerStyle={{
            marginVertical: widthPixel(10),
            // paddingHorizontal: widthPixel(15),
            paddingHorizontal: widthPixel(10),
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <AppText
          textStyles={{
            textAlign: 'center',
            marginTop: widthPixel(20),
          }}>
          No Hashtags Found
        </AppText>
      )}
    </Loader>
  );
};

export default HashtagResult;

const styles = StyleSheet.create({
  tagNameCount: {
    fontSize: widthPixel(12),
    fontFamily: 'Montserrat-Light',
    color: 'rgba(0, 0,0,0.5)',
    marginTop: widthPixel(3),
  },
  tagName: {
    fontSize: widthPixel(16),
    fontFamily: Montserrat(500),
    color: 'black',
  },
  hashContainer: {
    width: widthPixel(48),
    height: widthPixel(48),
    borderRadius: widthPixel(999),
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: widthPixel(12),
  },
});
