import React, {useContext, useState, useEffect} from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

import {
  appIcons,
  colors,
  heightPixel,
  routes,
  widthPixel,
} from '../../../services';
import {styles} from './styles';
import themeContext from '../../../services/config/themeContext';
//import messaging from '@react-native-firebase/messaging';

import {Header} from '../../../components';
import BookCard from '../../../components/bookCard/book-card';
import {SafeAreaView} from 'react-native-safe-area-context';

const Results = ({navigation, route}) => {
  const theme = useContext(themeContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />

      <Header isBack={true} title={'Result'} />

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: heightPixel(10),
          // paddingTop: heightPixel(20),
        }}
        data={data}
        renderItem={({item, index}) => (
          <BookCard
            key={index}
            category={'Funny'}
            bookName={'Crowned Majesty'}
            duration={'3m 30s'}
            imageUri={
              'https://m.media-amazon.com/images/I/71YBjMz8GfL._AC_UF1000,1000_QL80_.jpg'
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Results;
