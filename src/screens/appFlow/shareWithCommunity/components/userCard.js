import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../../../../components/text/appText';
import {appImages, widthPixel} from '../../../../services';

const UserCard = ({name = 'Andrew Ainsley', image = appImages.imageUser}) => {
  image = image ? {uri: image} : appImages.imageUser;
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.imageStyles} />
      <AppText weight={600} fontSize={17} textStyles={styles.txtStyles}>
        {name}
      </AppText>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyles: {
    width: widthPixel(40),
    height: widthPixel(40),
    borderRadius: widthPixel(20),
  },
  txtStyles: {
    marginLeft: widthPixel(10),
  },
});
