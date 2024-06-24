import React, {useState} from 'react';
import {View, Text, StatusBar, Image, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  appIcons,
  appNavigationParam,
  appRoutes,
  routes,
} from '../../../../services';
import {styles} from './styles';

import Button from '../../../../components/button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Badge from '../../../../components/badges';
import useApi from './hooks/useApi';
import Loader from '../../../../components/loader/Loader';
import {useRoute} from '@react-navigation/native';

const ChooseGeners = ({navigation}) => {
  const dispatch = useDispatch();
  const {comingFor} = useRoute()?.params || {
    comingFor: appNavigationParam['chooseGenraScreen'].chooseGenra,
  };
  // const [genre, setGenre] = useState([]);
  const {
    loading,
    selected,
    setSelected,
    genreScreenCallBack,
    value,
    initialValue,
  } = useApi(navigation, comingFor);
  const isUpdating =
    comingFor === appNavigationParam['chooseGenraScreen'].updatingGenra;
  const isChoosing =
    comingFor === appNavigationParam['chooseGenraScreen'].chooseGenra;
  const isNew = comingFor === appNavigationParam['chooseGenraScreen'].newGenra;

  console.log({isUpdating, isChoosing, isNew});

  return (
    <Loader loading={loading} fullBlank>
      <View style={[styles.container]}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />

          <View style={styles.header}>
            <Pressable
              onPress={() => {
                if (isChoosing) {
                  navigation.navigate(appRoutes.chooseInterest);
                } else if (isUpdating) {
                  navigation.goBack();
                } else if (isNew) {
                  navigation.goBack();
                }
              }}>
              <Image source={appIcons.backIcon} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.headerText}>Choose Genres</Text>
          </View>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>

            <View>
              {value && (
                <Badge
                  items={value}
                  setValue={setSelected}
                  value={selected}
                  initialSelectedValues={initialValue}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
          <Button onPress={genreScreenCallBack}>
          {isUpdating && 'Update'}
            {isNew && "Next"}
            {
              isChoosing && 'Continue'
            }
          </Button>
        </SafeAreaView>
      </View>
    </Loader>
  );
};

export default ChooseGeners;
