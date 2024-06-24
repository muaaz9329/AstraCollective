import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RenderHtml from 'react-native-render-html';
import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  Montserrat,
  routes,
} from '../../../../../services';
import {styles} from './styles';

import {AuthHeader, AuthInput, Header} from '../../../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '../../../../../components/loader/Loader';
import useApi from './hooks/useApi';
import {useRoute} from '@react-navigation/native';
import capitalizeFirstLetter from '../../../../../services/helpingMethods';
import AppText from '../../../../../components/text/appText';
const TermsPrivacy = ({
  navigation,
  route = {
    params: {
      passedType: 'privacy',
    },
  },
}) => {
  const routes = useRoute();

  const passedType = routes?.params?.passedType || 'terms';

  console.log('passedType', passedType);
  const dispatch = useDispatch();

  // const onPressLoginn = () => {
  //   dispatch(userSave(true));
  //   navigation.replace(routes.tab);
  // };

  const {Loading, content} = useApi(passedType);
  console.log('content', content);
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Header title={capitalizeFirstLetter(passedType)} isBack={true} />

      <Loader loading={Loading} fullBlank>
        <View style={[styles.container]}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {passedType === 'terms' && (
              <RenderHtml
                source={{
                  html: content,
                }}
                tagsStyles={{
                  p: {
                    fontFamily: Montserrat(500),
                    fontSize: heightPixel(16),
                    color: colors.black,
                    lineHeight: heightPixel(24),
                  },
                  strong: {
                    fontFamily: Montserrat(700),
                    fontSize: heightPixel(16),
                    color: colors.black,
                    lineHeight: heightPixel(24),
                  },
                }}
                contentWidth={width}
              />
            )}

            {passedType === 'privacy' && (
              <RenderHtml
                source={{
                  html: content,
                }}
                tagsStyles={{
                  p: {
                    fontFamily: Montserrat(500),
                    fontSize: heightPixel(16),
                    color: colors.black,
                    lineHeight: heightPixel(24),
                  },
                  strong: {
                    fontFamily: Montserrat(700),
                    fontSize: heightPixel(16),
                    color: colors.black,
                    lineHeight: heightPixel(24),
                  },
                }}
                contentWidth={width}
              />
            )}

            {passedType === 'about' && <AppText>{content}</AppText>}
          </KeyboardAwareScrollView>
        </View>
      </Loader>
    </SafeAreaView>
  );
};

export default TermsPrivacy;
