import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  appIcons,
  colors,
  fontFamily,
  routes,
  widthPixel,
} from '../../../../../services';
import {useNavigation} from '@react-navigation/native';
import BookCard from '../../../../../components/bookCard/book-card';
import AppText from '../../../../../components/text/appText';
const UserCard = ({
  imgUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  name = 'Bożenka Malina',
  time = '12:10 AM',
  showConnectBtn = false,
}) => {
  // const navigation = useNavigation();
  const [like, setLike] = useState(false);
  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: imgUrl,
            }}
            style={styles.imageStyles}
          />
          <View>
            <Text style={styles.textStyles}>{name}</Text>
            <Text style={styles.statusTextStyles}>{time}</Text>
          </View>
        </View>
        {showConnectBtn && (
          <TouchableOpacity style={styles.connectBtnStyles}>
            <AppText fontSize={13} color={colors.theme} weight={600}>
              Connect
            </AppText>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: fontFamily.MontserratRegular,
            fontSize: widthPixel(15),
            color: colors.black,
          }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
          suscipit, nihil ab iste, facere accusantium, est accusamus non
        </Text>
        <BookCard showRightIcon={false} />
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
            }}>
            <Image source={appIcons.iconHeartFill} style={styles.imgStyles} />
          </TouchableOpacity>
          <Text style={styles.textStyles}>44, 389</Text>
        </View>

        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.CommunityComments);
            }}>
            <Image source={appIcons.chat} style={styles.imgStyles} />
          </TouchableOpacity>
          <Text style={styles.textStyles}>26,376</Text>
        </View>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.CommunityShare);
            }}>
            <Image source={appIcons.send} style={styles.imgStyles} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  connectBtnStyles: {
    paddingVertical: widthPixel(7),
    paddingHorizontal: widthPixel(20),
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: colors.theme,
    borderRadius: widthPixel(8),
  },
  topContainer: {
    marginBottom: widthPixel(15),
  },
  textContainer: {
    marginVertical: widthPixel(10),
  },
  textStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(15),
    color: colors.black,
  },
  imgStyles: {
    height: widthPixel(20),
    width: widthPixel(20),
    resizeMode: 'contain',
    marginRight: widthPixel(2),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: widthPixel(20),
  },
  btnContainer: {
    marginVertical: widthPixel(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratLight,
    marginLeft: widthPixel(10),
    color: 'rgba(0,0,0,0.5)',
    marginTop: widthPixel(3),
  },
  textStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratRegular,
    marginLeft: widthPixel(10),
    color: colors.black,
  },
  imageStyles: {
    height: widthPixel(50),
    width: widthPixel(50),
    borderRadius: widthPixel(25),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
