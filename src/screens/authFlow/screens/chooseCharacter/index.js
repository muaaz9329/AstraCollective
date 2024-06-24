import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  appIcons,
  appNavigationParam,
  appRoutes,
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../services';
import BackBtnHeader from '../../components/backBtnHeader';
import CharacterBox from '../../../../components/characterSelection/characterBox';
import CharacterSelection from './components/characterSelection';
import useApi from './hooks/useApi';
import Loader from '../../../../components/loader/Loader';
import Button from '../../../../components/button';
import {useRoute} from '@react-navigation/native';

export default function ChooseCharacter({navigation}) {
  const {comingFor} = useRoute()?.params || {
    comingFor: appNavigationParam['chooseCharacterScreen'].chooseCharacter,
  };

  const {
    loading,
    characters,
    selectedCharacters,
    setSelectedCharacters,
    getInitialSelectedCharacters,
    characterScreenCallback,
  } = useApi(navigation, comingFor);

  const isUpdating =
    comingFor === appNavigationParam['chooseCharacterScreen'].updatingCharacter;
  const isChoosing =
    comingFor === appNavigationParam['chooseCharacterScreen'].chooseCharacter;
  const isNew =
    comingFor === appNavigationParam['chooseCharacterScreen'].newCharacter;

  // console.log({isUpdating, isChoosing, isNew});
  return (
    <Loader loading={loading}>
      <View style={[styles.container]}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />

          <BackBtnHeader
            title={'Choose Character'}
            onPressBack={() => {
              if (isChoosing) {
                navigation.navigate(appRoutes.chooseGenra);
              } else if (isUpdating || isNew) {
                navigation.goBack();
              }
            }}
          />
          <CharacterSelection
            items={characters}
            selectedItems={selectedCharacters}
            setSelectedItems={setSelectedCharacters}
            initialValue={getInitialSelectedCharacters()}
          />
          <Button onPress={characterScreenCallback}>
            {isUpdating && 'Update'}
            {isNew && 'Generate'}
            {isChoosing && 'Continue'}
          </Button>
        </SafeAreaView>
      </View>
    </Loader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(16),
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
