import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, fontPixel, widthPixel} from '../../../services';

const BadgeComponent = ({
  item,

  selectItem,
  checkSelected,
  disabled,

  isSelectedDefault,
}) => {
  return (
    <Pressable
      onPress={() => {
        selectItem && selectItem(item._id);
      }}
      disabled={disabled}
      style={[
        styles.item,
        checkSelected &&
          checkSelected(item._id) && {backgroundColor: colors.theme},
        isSelectedDefault && {backgroundColor: colors.theme},
      ]}>
      <Text
        style={[
          styles.itemText,
          checkSelected && checkSelected(item._id) && {color: colors.white},
          isSelectedDefault && {color: colors.white},
        ]}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export default BadgeComponent;

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: widthPixel(12),
    paddingVertical: widthPixel(5),
    margin: 4,
    borderColor: colors.grey,
  },
  itemText: {
    fontSize: fontPixel(14),
    color: colors.grey,
    fontFamily: fontFamily.MontserratRegular,
  },
});
