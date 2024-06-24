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
  appNavigationParam,
  appRoutes,
  colors,
  widthPixel,
} from '../../../../../services';
import Button from '../../../../../components/button';
import AppText from '../../../../../components/text/appText';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../components/loader/Loader';
import {statusText} from '../../../../../services/helpingMethods';
import useGlobalApi from '../../../../../hooks/useGlobalApi';
// import globalStyles from '../../../../../services/constants/globalStyles';

const UserCard = ({onPress, userInfo, handleFriendRequest}) => {
  const {_id, firstName, lastName, userName, isFriend, image} = userInfo;
  const [isFriendStatus, setIsFriendStatus] = React.useState(isFriend);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.userImgStyles}
        />
        <View
          style={{
            marginLeft: widthPixel(10),
          }}>
          <Text
            style={styles.fullNameStyles}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.userNameStyles}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnStyles}
        onPress={() => {
          handleFriendRequest(isFriendStatus, setIsFriendStatus, _id);
        }}>
        <AppText fontSize={13} weight={500} color={colors.white}>
          {statusText(isFriendStatus)}
        </AppText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const UserResults = ({loading, data}) => {
  const navigation = useNavigation();
  const {handleFriendRequest} = useGlobalApi();
  return (
    <Loader loading={loading} fullBlank>
      {data ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <UserCard
              key={index}
              userInfo={item}
              onPress={() => {
                navigation.navigate(appRoutes.otherProfile, {
                  comingFor: appNavigationParam['userProfile'].otherProfile,
                  id: item._id,
                });
              }}
              handleFriendRequest={handleFriendRequest}
            />
          )}
          contentContainerStyle={{
            marginVertical: widthPixel(10),
            // paddingHorizontal: widthPixel(15),
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <AppText
          textStyles={{textAlign: 'center', marginVertical: widthPixel(40)}}>
          No User Found
        </AppText>
      )}
    </Loader>
  );
};

export default UserResults;

const styles = StyleSheet.create({
  btnStyles: {
    backgroundColor: colors.theme,
    paddingVertical: widthPixel(8),
    paddingHorizontal: widthPixel(25),
    borderRadius: widthPixel(8),
  },
  userNameStyles: {
    fontSize: widthPixel(12),
    fontFamily: Montserrat(400),
    color: 'rgba(0,0,0,0.6)',
    marginTop: widthPixel(3),
  },
  fullNameStyles: {
    fontSize: widthPixel(14),
    fontFamily: Montserrat(500),
    color: 'black',
  },
  userImgStyles: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: widthPixel(12),
  },
});
