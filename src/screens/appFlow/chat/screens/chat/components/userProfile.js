import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, widthPixel} from '../../../../../../services';

const UserProfile = ({
  imgUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  name = 'Bożenka Malina',
  status,
  textColor,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imgUrl,
        }}
        style={styles.imageStyles}
      />
      <View>
        <Text
          style={[
            styles.textStyles,
            textColor && {
              color: textColor,
            },
          ]}>
          {name}
        </Text>
        {status && (
          <Text
            style={[
              styles.statusTextStyles,
              textColor && {
                color: textColor,
              },
            ]}>
            {status}
          </Text>
        )}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  statusTextStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratLight,
    marginLeft: widthPixel(10),
    color: 'rgba(0,0,0,0.5)',
    marginTop: widthPixel(3),
  },
  textStyles: {
    fontSize: widthPixel(13),
    fontFamily: fontFamily.MontserratSemiBold,
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
  },
});
