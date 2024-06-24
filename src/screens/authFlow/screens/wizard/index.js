import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, heightPixel, widthPixel} from '../../../../services';
import {styles} from './styles';

import {appIcons, routes} from '../../../../services';
import themeContext from '../../../../services/config/themeContext';
import Button from '../../../../components/button';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFcmToken } from '../../../../services/helpingMethods';
const Wizard = ({navigation}) => {
  const theme = useContext(themeContext);
  const [active, setActive] = useState(0);
 
  useEffect(() => {
    const firstStartUp = async () => {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (!isFirstTime) {
        await AsyncStorage.setItem('isFirstTime', 'true');
      } else {
        setActive(2);
      }
    };
    firstStartUp();
  }, []);
  const wizards = [
    {
      heading:
        "That's wonderful! Reading a novel can be a delightful and enriching experience.",
      image: appIcons.wizard1,
    },
    {
      heading:
        "That's fantastic! Reading stories is a wonderful way to escape reality explore.",
      image: appIcons.wizard2,
    },
    {
      heading: 'Discover, Learn, Share.',
      image: appIcons.wizard3,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TouchableOpacity
        onPress={() => {
          setActive(2);
        }}>
        <Text style={styles.skip}>{active < 2 && 'SKIP'}</Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Image source={wizards[active].image} style={styles.image} />
        <View
          style={{
            height: heightPixel(210),
          }}>
          <Text
            style={[
              styles.heading,
              active == 2 && {
                textAlign: 'center',
                marginTop: heightPixel(44),
              },
            ]}>
            {wizards[active].heading}
          </Text>
          {active < 2 && (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: heightPixel(16),
              }}>
              {wizards.slice(0, 2).map((item, index) => {
                return (
                  <View
                    style={index == active ? styles.activeDot : styles.dot}
                  />
                );
              })}
            </View>
          )}
        </View>

        <Button
          onPress={() => {
            active != 2
              ? setActive(prv => prv + 1)
              : navigation.navigate(routes.signup);
          }}>
          {active != 2 ? 'Next' : 'Get Started'}
        </Button>
        {active == 2 && (
          <Button
            style={{color: colors.theme}}
            themeColor={colors.themeSecondary}
            containerStyle={{marginTop: widthPixel(8)}}
            onPress={() => {
              navigation.navigate(routes.login);
            }}>
            I Already Have An Account
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Wizard;
