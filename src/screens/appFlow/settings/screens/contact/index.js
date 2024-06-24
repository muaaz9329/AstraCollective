import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from '../../../../../services';
import {Header} from '../../../../../components';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import Loader from '../../../../../components/loader/Loader';

const ContactScreen = () => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});
  const handleApi = async () => {
    await apiService.Get({
      url: routes.contactUs,
      setLoading,
      OnSuccess: res => {
        setContact(res?.data?.contact[0]);
      },
      OnError: e => {
        setLoading(false);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  useEffect(() => {
    handleApi();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Loader loading={loading} fullBlank />
      <View style={styles.container}>
        <Header isBack={true} title={'Contact'} />
        <Text style={styles.descriptionStyles}>{contact?.text}</Text>

        <View style={styles.flexContainer}>
          <View style={styles.imgStyles}>
            <Image source={appIcons.contactUs} style={styles.imgStylesss} />
          </View>
          <View>
            <Text style={styles.text1Styles}>Chat to us</Text>
            <Text style={styles.textStyles2}>
              Our friendly team is here to help.
            </Text>
            <Text style={styles.textStyles3}>{contact?.email}</Text>
          </View>
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.imgStyles}>
            <Image source={appIcons.phone} style={styles.imgStylesss} />
          </View>
          <View>
            <Text style={styles.text1Styles}>Phone</Text>
            <Text style={styles.textStyles2}>Lorem ipsum dolor sit amet.</Text>
            <Text style={styles.textStyles3}>{contact?.phone}</Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: heightPixel(80),
            flex: 1,

            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.imgStyles}>
            <Image source={appIcons.fbIcon} style={styles.imgStylesss} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgStyles}>
            <Image source={appIcons.twitter} style={styles.imgStylesss} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgStyles}>
            <Image source={appIcons.linkedin} style={styles.imgStylesss} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgStyles}>
            <Image source={appIcons.web} style={styles.imgStylesss} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  textStyles3: {
    color: 'black',
    fontFamily: fontFamily.MontserratMedium,
    fontSize: widthPixel(14),
    marginBottom: widthPixel(5),
  },
  textStyles2: {
    color: 'black',
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(14),
    marginBottom: widthPixel(5),
  },
  text1Styles: {
    color: 'black',
    fontFamily: fontFamily.MontserratSemiBold,
    fontSize: widthPixel(14),
    marginBottom: widthPixel(5),
  },
  imgStylesss: {
    width: widthPixel(25),
    height: widthPixel(25),
    resizeMode: 'contain',
  },
  imgStyles: {
    padding: widthPixel(10),
    borderRadius: widthPixel(12),
    borderWidth: 1,

    marginRight: widthPixel(10),
    alignSelf: 'flex-start',
    borderColor: 'rgba(0,0,0,0.3)',
  },
  flexContainer: {
    flexDirection: 'row',
    marginVertical: widthPixel(20),
  },
  descriptionStyles: {
    fontFamily: fontFamily.MontserratMedium,
    fontSize: widthPixel(14),
    color: colors.black,
    marginTop: widthPixel(10),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: widthPixel(15),
    marginVertical: widthPixel(10),
  },
});
