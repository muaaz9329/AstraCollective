import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {
  appIcons,
  colors,
  fontFamily,
  routes,
  widthPixel,
} from '../../../../services';
import {useNavigation} from '@react-navigation/native';
import {store} from '../../../../redux/store';
const Container = ({children}) => {
  return <View style={styles.containerStyles}>{children}</View>;
};

const ShareBottomSheet = ({
  open,
  setOpen,
  onPressCommunityShare,
  onPressUserShare,
}) => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    function controlSheet() {
      if (open) {
        bottomSheetRef.current?.show();
      } else {
        bottomSheetRef.current?.hide();
      }
    }
    controlSheet();
  }, [open]);

  const userId = store.getState().userData?.userData?._id;

  return (
    <ActionSheet
      ref={bottomSheetRef}
      containerStyle={styles.bottomSheetStyles}
      onClose={() => setOpen(false)}>
      <Text style={styles.titleStyles}>Share</Text>

      <Container>
        <Text style={styles.mainContainerTextStyles}>Share with Friends</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(routes.CommunityShare, {
              _id: userId,
              typeOfMsg: 'story',
            });
            setOpen(false);
          }}>
          <Image source={appIcons.send2} style={styles.imgStyles} />
        </TouchableOpacity>
      </Container>
      <Container>
        <Text style={styles.mainContainerTextStyles}>Share with community</Text>
        <TouchableOpacity
          onPress={() => {
            onPressCommunityShare && onPressCommunityShare();
            navigation.navigate(routes.postInCommunity);
            setOpen(false);
          }}>
          <Image source={appIcons.send2} style={styles.imgStyles} />
        </TouchableOpacity>
      </Container>
      <Container>
        <Text style={styles.mainContainerTextStyles}>
          Share outside the app
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={appIcons.copy} style={styles.imgStyles} />

          <Text style={styles.copylinkTextStyles}>Copy Link</Text>
        </TouchableOpacity>
      </Container>
    </ActionSheet>
  );
};

export default ShareBottomSheet;

const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: 'row',
    height: widthPixel(50),
    borderRadius: widthPixel(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPixel(10),
    marginVertical: widthPixel(10),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,

    backgroundColor: 'white',
  },
  copylinkTextStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(12),
    color: colors.grey,
  },
  imgStyles: {
    width: widthPixel(20),
    height: widthPixel(20),
    resizeMode: 'contain',
    marginHorizontal: widthPixel(10),
  },
  mainContainerTextStyles: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(15),
    color: 'black',
  },
  titleStyles: {
    textAlign: 'center',
    color: colors.theme,
    fontFamily: fontFamily.MontserratMedium,
    fontSize: widthPixel(17),
  },
  bottomSheetStyles: {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? widthPixel(270) : widthPixel(250),
    borderTopLeftRadius: widthPixel(20),
    borderTopRightRadius: widthPixel(20),
    paddingVertical: widthPixel(20),
    paddingHorizontal: widthPixel(10),
    justifyContent: 'flex-start',
  },
});
