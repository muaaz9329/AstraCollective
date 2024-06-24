import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../../../components';
import BookCard from '../../../../../components/bookCard/book-card';
import {useNavigation} from '@react-navigation/native';
import {appNavigationParam, routes} from '../../../../../services';
import useApi from './hooks/useApi';
import Loader from '../../../../../components/loader/Loader';
import {formatTimeString} from '../../../../../services/helpingMethods';
import WarningModel from '../../../../../components/model/warning-model';
const MyStories = () => {
  const navigation = useNavigation();
  const {loading, data, DeleteStory} = useApi();
  const modelRef = React.useRef();
  const [deleteId, setDeleteId] = React.useState('');
  const handleDelete = async () => {
    DeleteStory(deleteId);
  };
  return (
    <Loader loading={loading}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header isBack={true} title={'My Stories'} />
        <View
          style={{
            flex: 1,
          }}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <BookCard
                    key={item.id}
                    isMyStory={true}
                    onPress={() => {
                      navigation.navigate(routes.readings, {
                        id: item?._id,
                        comingFor: appNavigationParam['reading'].oldStory,
                      });
                    }}
                    bookData={item}
                    bookName={item?.title}
                    genres={item?.genres}
                    interests={item?.interests}
                    duration={formatTimeString(item?.estimatedTime || '3:30')}
                    imageUri={item?.coverImage}
                    onPressRightIcon={() => {
                      setDeleteId(item._id);
                      modelRef.current?.showModel();
                    }}
                  />
                );
              }}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                No Stories Found
              </Text>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
      <WarningModel
        title={'Delete Story'}
        description={'Are you sure you want to delete story?'}
        ref={modelRef}
        onPressYes={handleDelete}
      />
    </Loader>
  );
};

export default MyStories;

const styles = StyleSheet.create({});
