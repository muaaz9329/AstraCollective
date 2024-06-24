import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import React, {useEffect, useRef} from 'react';
import {widthPixel, wp} from '../../../../../services';
import UserResults from './userResults';
import HashtagResult from './hashtagResults';

const SearchResult = ({index, setIndex, moveIndex, setMoveIndex}) => {
  const {width} = useWindowDimensions();
  const ref = useRef();
  useEffect(() => {
    if (moveIndex === 0) {
      ref.current?.next();
    } else if (moveIndex === 1) {
      ref.current?.next();
    }
  }, [moveIndex]);
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={wp(95)}
        height={{
          flex: 1,
        }}
        style={{
          alignSelf: 'center',
        }}
        // autoPlay={true}
        ref={ref}
        enabled={false}
        data={[1, 2]}
        scrollAnimationDuration={1000}
        defaultIndex={0}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }} //! this is for the vertical scroll , Please don't remove it
        onSnapToItem={index => setIndex(index)}
        renderItem={({item, index}) => {
          if (index === 0) {
            return <UserResults key={index} />;
          } else if (index === 1) {
            return <HashtagResult key={index} />;
          }
          //   return <UserResults />;
        }}
      />
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({});
