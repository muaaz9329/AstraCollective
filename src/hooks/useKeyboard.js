import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return {hideKeyboard};
};

export default useKeyboard;
