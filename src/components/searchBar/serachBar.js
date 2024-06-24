import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {appIcons, colors, fontFamily, widthPixel} from '../../services';

const SearchBar = ({handleTextChange, onPress, onFocus, searchTerm}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        onFocus={onFocus}
        style={styles.textInputStyles}
        placeholder="Search"
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        onChangeText={handleTextChange}
        onSubmitEditing={e => {
          onPress && onPress();
          handleTextChange && handleTextChange(e.nativeEvent.text);
        }}
        value={searchTerm}
      />

      <Pressable style={styles.searchBtnStyles} onPress={onPress}>
        <Image source={appIcons.iconSearch} style={styles.searchImage} />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchImage: {
    width: widthPixel(20),
    height: widthPixel(20),
  },
  searchBtnStyles: {
    padding: widthPixel(5),
    marginLeft: widthPixel(8),
  },
  textInputStyles: {
    flex: 1,
    color: 'black',
    padding: 0,
    margin: 0,
    paddingVertical: widthPixel(5),
    fontFamily: fontFamily.MontserratRegular,
    fontSize: widthPixel(14),
  },
  searchContainer: {
    width: '100%',
    paddingVertical: widthPixel(7),
    backgroundColor: colors.white,
    borderRadius: widthPixel(100),
    paddingLeft: widthPixel(18),
    paddingRight: widthPixel(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});
