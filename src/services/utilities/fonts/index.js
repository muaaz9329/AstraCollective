const fontFamily = {
  MontserratBlack: 'Montserrat-Black',
  MontserratBlackItalic: 'NunitoSans-ExtraBold',
  MontserratBold: 'Montserrat-Bold',
  MontserratBoldItalic: 'Montserrat-BoldItalic',
  MontserratExtraBold: 'Montserrat-ExtraBold',
  MontserratExtraBoldItalic: 'Montserrat-ExtraBoldItalic',
  MontserratExtraLight: 'Montserrat-ExtraLight',
  MontserratExtraLightItalic: 'Montserrat-ExtraLightItalic',
  MontserratItalic: 'Montserrat-Italic',
  MontserratLight: 'Montserrat-Light',
  MontserratLightItalic: 'Montserrat-LightItalic',
  MontserratMedium: 'Montserrat-Medium',
  MontserratMediumItalic: 'Montserrat-MediumItalic',
  MontserratRegular: 'Montserrat-Regular',
  MontserratSemiBold: 'Montserrat-SemiBold',
  MontserratSemiBoldItalic: 'Montserrat-SemiBoldItalic',
  MontserratThin: 'Montserrat-Thin',
  MontserratThinItalic: 'Montserrat-ThinItalic',
};

const Montserrat = weight => {
  switch (Number(weight)) {
    case 100:
      return fontFamily.MontserratExtraLight;
    case 200:
      return fontFamily.MontserratLight;
    case 300:
      return fontFamily.MontserratThin;
    case 400:
      return fontFamily.MontserratRegular;
    case 500:
      return fontFamily.MontserratMedium;
    case 600:
      return fontFamily.MontserratSemiBold;
    case 700:
      return fontFamily.MontserratBold;
    case 800:
      return fontFamily.MontserratExtraBold;
    default:
      return fontFamily.MontserratRegular;
  }
};

export {fontFamily, Montserrat};
