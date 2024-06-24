import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from '../../../../../components/text/appText';
import {appIcons, appImages, widthPixel} from '../../../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeTerm,
  SearchTermsSelector,
} from '../../../../../redux/Slices/searchSlice';
const RecentSearchCard = ({name, deleteItem, onPressName}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressName(name);
      }}
      style={styles.flexContainer}>
      <AppText>{name}</AppText>

      <TouchableOpacity
        onPress={() => {
          deleteItem(name);
        }}>
        <Image source={appIcons.cross} style={styles.crossStyles} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const RecentSearches = ({setSearchTerm, setIsTyping}) => {
  const {searchTerm, noOfTerms} = useSelector(SearchTermsSelector);
  const dispatch = useDispatch();
  const deleteItem = name => {
    dispatch(removeTerm(name));
  };
  const onPressName = name => {
    setSearchTerm(name);
    console.log('name', name);
    setIsTyping(false);
  };
  return (
    <View
      style={{
        marginTop: widthPixel(15),
      }}>
      <AppText weight={500} fontSize={16}>
        Results({noOfTerms})
      </AppText>
      {searchTerm && (
        <FlatList
          data={searchTerm}
          renderItem={({item, index}) => (
            <RecentSearchCard
              key={index}
              name={item}
              deleteItem={deleteItem}
              onPressName={onPressName}
            />
          )}
        />
      )}
    </View>
  );
};

export default RecentSearches;

const styles = StyleSheet.create({
  crossStyles: {
    height: widthPixel(12),
    width: widthPixel(12),
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: widthPixel(10),
  },
});
