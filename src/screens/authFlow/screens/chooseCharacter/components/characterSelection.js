import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CharacterBox from '../../../../../components/characterSelection/characterBox';
import {appImages, widthPixel} from '../../../../../services';

const CharacterSelection = ({
  items,
  selectedItems,
  setSelectedItems,
  initialValue,
}) => {
  const selectItems = id => {
    let array = [...selectedItems];
    let index = array.findIndex(item => item._id === id);

    if (index === -1) {
      setSelectedItems([...selectedItems, {_id: id}]);
    } else {
      selectedItems.splice(index, 1);
      setSelectedItems([...selectedItems]);
    }
  };
  const checkSelected = id => {
    const isIdInArray =
      selectedItems.filter(item => item._id === id).length > 0;
    if (isIdInArray) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    //
    if (initialValue.length > 0) {
      console.log('initial values set', initialValue);
      setSelectedItems([...initialValue]);
    }
  }, []);

  return (
    <FlatList
      data={[...items]}
      renderItem={({item}) => {
        return (
          <CharacterBox
            checkSelected={checkSelected}
            selectItem={selectItems}
            id={item._id}
            imageUri={item.img}
          />
        );
      }}
      horizontal={true}
      contentContainerStyle={styles.flatlistStyles}
      //   numColumns={3}
    />
  );
};

export default CharacterSelection;

const styles = StyleSheet.create({
  flatlistStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: widthPixel(10),
  },
});
