import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appImages, colors, widthPixel} from '../../services';

const CharacterBox = ({
  checkSelected,
  selectItem,
  imageUri = appImages.dummyImage,
  id,
  isSelectedDefault = false,
  disabled = false,
  containerStyles,
}) => {
  const isSelected = (checkSelected && checkSelected(id)) || isSelectedDefault;
  const borderStyles = isSelected
    ? {borderWidth: 3, borderColor: colors.theme}
    : {borderWidth: 0.5, borderColor: colors.grey};
  return (
    <TouchableOpacity
      onPress={() => {
        selectItem(id);
      }}
      disabled={disabled}
      style={[styles.container, borderStyles, containerStyles]}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.imgStyles}
      />
    </TouchableOpacity>
  );
};

export default CharacterBox;

const styles = StyleSheet.create({
  imgStyles: {
    height: widthPixel(100),
    width: widthPixel(108),
    resizeMode: 'cover',
  },
  container: {
    height: widthPixel(97),
    width: widthPixel(105),
    borderRadius: widthPixel(20),
    marginTop: widthPixel(10),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
