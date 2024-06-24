// import { EventRegister } from 'react-native-event-listeners'
// EventRegister.addEventListener("changeTheme", (data) => {
//   console.log(data);
// });


export var colors = {
  theme: '#0076E9',
  background: "#FAFAFA",
  themeSecondary: '#C2E1FF',
  statusBarLight: '#FDF9F2',
  lightBackground: '#F2F2F2',
  lightText: '#92979D',
  white: '#FFFFFF',
  blackText: "#000000",
  black: '#000000',
  lightBlack: '#333333',
  grey: '#ADADAD',
  greyIcon: '#C2C9D1',
  green: '#4CC26C',
  greyLight: '#E9E9E9',
  errorColor: '#FF0000',
  textRed: "#DA2828",
  placeholderColor: '#cccccc',
  description:"#666666",
  lightWhite:"#EEEEEE"
}




export const updateTheme = (theme) => {
  colors = theme
}


