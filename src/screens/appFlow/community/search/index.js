import {
  Keyboard,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../../../services/constants/globalStyles';
import {Header} from '../../../../components';
import SearchBar from '../../../../components/searchBar/serachBar';
import RecentSearches from './components/recentSearches';
import SearchResult from './components/searchResult';
import UserResults from './components/userResults';
import HashtagResult from './components/hashtagResults';
import ChooseResultTab from './components/chooseResultTab';
import {TabView, SceneMap} from 'react-native-tab-view';
import useApi from './hooks/useApi';
import {useDispatch} from 'react-redux';
import {addNewTerm} from '../../../../redux/Slices/searchSlice';
const SearchPage = () => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const {
    loading,
    setSearchTerm,
    searchTerm,
    handleSearchTerm,
    searchUser,
    searchHashtag,
  } = useApi(index);
  const [isTyping, setIsTyping] = useState(true);

  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  useEffect(() => {
    // Keyboard.addListener('keyboardDidHide', () => {
    //   setIsTyping(false);
    // });
    Keyboard.addListener('keyboardDidShow', () => {
      setIsTyping(true);
    });
  }, []);

  const UserSearch = () => {
    return <UserResults loading={loading} data={searchUser} />;
  };
  const HashTagSearch = () => {
    return <HashtagResult loading={loading} data={searchHashtag} />;
  };

  const handleTextChange = text => {
    setSearchTerm(text);
  };

  const onPressSearchBtn = () => {
    Keyboard.dismiss();
    setIsTyping(false);
  };

  const renderScene = SceneMap({
    first: UserSearch,
    second: HashTagSearch,
  });

  const changeIndex = () => {
    setIndex(prevIndex => (prevIndex + 1) % routes.length);
  };

  const moveNext = () => {
    setIndex(0);
  };
  const movePrev = () => {
    setIndex(1);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm && !isTyping) {
      handleSearchTerm(searchTerm);
      dispatch(addNewTerm(searchTerm));
    }
  }, [searchTerm, isTyping, index]); // this function is where the searching is  done

  return (
    <SafeAreaView style={globalStyles.container} edges={['top']}>
      <Header title={'Search'} isBack />
      <View style={globalStyles.secondaryContainer}>
        <SearchBar
          handleTextChange={handleTextChange}
          onPress={onPressSearchBtn}
          onFocus={() => setIsTyping(true)}
          searchTerm={searchTerm}
        />

        {isTyping ? (
          <RecentSearches
            setSearchTerm={setSearchTerm}
            setIsTyping={setIsTyping}
          />
        ) : (
          <>
            <ChooseResultTab
              onTapAccounts={moveNext}
              onTapHashtags={movePrev}
              index={index}
            />
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              renderTabBar={() => {}}
              onIndexChange={changeIndex}
              initialLayout={{width: layout.width}}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({});
