import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {appIcons, colors, routes, appNavigationParam} from '../../../services';
import {styles} from './styles';

import {Header} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import useCreateStory from './hooks/useCreateStory';
import AppText from '../../../components/text/appText';

const CreateStory = ({navigation}) => {
  const {desc, setDesc, handlePrompt} = useCreateStory(navigation);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Header title={'Generate Story'} isBack={true} />

      <View style={[styles.container]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>How can I help you today?</Text>
          <View style={styles.storyInputWrapper}>
            <TextInput
              value={desc}
              onChangeText={text => {
                setDesc(text);
              }}
              placeholder="Dream Story"
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              style={styles.storyInput}
              multiline={true}
            />

            <AppText
              textStyles={{
                alignSelf: 'flex-end',
                opacity: 0.5,
              }}
              fontSize={12}>
              {`${desc.length} / 350`}
            </AppText>
          </View>
        </KeyboardAwareScrollView>

        <Pressable onPress={handlePrompt} style={styles.generateRow}>
          <Text style={styles.continueText}>Generate</Text>
          <Image source={appIcons.backIcon} style={styles.forwardIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateStory;
