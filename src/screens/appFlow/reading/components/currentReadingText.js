import {Text} from 'react-native';
import {colors} from '../../../../services';

const CurrentReadingText = ({children, isReadingMe}) => {
  return (
    <Text
      style={
        isReadingMe
          ? {
              color: colors.theme,
            }
          : {}
      }
      onLayout={event => {
        const {x, y, width, height} = event.nativeEvent.layout;
        console.log('x', x, 'y', y, 'width', width, 'height', height);
      }}>
      {children}
    </Text>
  );
};

export default CurrentReadingText;
