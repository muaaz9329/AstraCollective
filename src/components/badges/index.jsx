import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../services';
import useBadge from './hooks/use-badge';

const Badge = ({
  items,
  setValue,
  value,
  initialSelectedValues = [],
  disabled = false,
}) => {
  const {checkSelected, selectItem} = useBadge(
    setValue,
    value,
    initialSelectedValues,
  );

  // useEffect(() => {
  //   if (items && initialSelectedValues) {
  //     initialSelectedValues.map(item => {
  //       setValue(item);
  //     });
  //   }
  //   setValue(initialSelectedValues);
  // }, []);

  return (
    <View style={styles.listBox}>
      {items.map((item, index) => {
        return (
          <Pressable
            onPress={() => {
              selectItem(item._id);
            }}
            disabled={disabled}
            key={index}
            style={[
              styles.item,
              checkSelected(item._id) && {backgroundColor: colors.theme},
            ]}>
            <Text
              style={[
                styles.itemText,
                checkSelected(item._id) && {color: colors.white},
              ]}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

Badge.defaultProps = {
  items: [
    {
      _id: 0,
      name: 'Food',
    },
    {
      _id: 1,
      name: 'Sports',
    },
    {
      _id: 2,
      name: 'Dancing',
    },
    {
      _id: 3,
      name: 'Singing',
    },
    {
      _id: 4,
      name: 'Cooking',
    },
    {
      _id: 5,
      name: 'Art & Craft',
    },
    {
      _id: 6,
      name: 'Business',
    },
    {
      _id: 7,
      name: 'Language',
    },
    {
      _id: 8,
      name: 'Tango',
    },
    {
      _id: 9,
      name: 'Guitar',
    },
    {
      _id: 10,
      name: 'Accordion',
    },
    {
      _id: 11,
      name: 'Food',
    },
    {
      _id: 12,
      name: 'Sports',
    },
    {
      _id: 13,
      name: 'Dancing',
    },
    {
      _id: 14,
      name: 'Singing',
    },
    {
      _id: 15,
      name: 'Cooking',
    },
    {
      _id: 16,
      name: 'Art & Craft',
    },
    {
      _id: 17,
      name: 'Business',
    },
    {
      _id: 18,
      name: 'Language',
    },
    {
      _id: 19,
      name: 'Tango',
    },
    {
      _id: 20,
      name: 'Guitar',
    },
    {
      _id: 21,
      name: 'Accordion',
    },
  ], // array of items to be displayed
  setValue: () => {}, // function to set value that are selected
  value: [], // empty if no value is selected in the beginning , else array of selected values
};

export default Badge;
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
  listBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: heightPixel(16),
  },
});
