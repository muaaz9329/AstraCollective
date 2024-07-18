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
  PoppinsBlack: 'Poppins-Black',
  PoppinsBlackItalic: 'Poppins-BlackItalic',
  PoppinsBold: 'Poppins-Bold',
  PoppinsBoldItalic: 'Poppins-BoldItalic',
  PoppinsExtraBold: 'Poppins-ExtraBold',
  PoppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
  PoppinsExtraLight: 'Poppins-ExtraLight',
  PoppinsExtraLightItalic: 'Poppins-ExtraLightItalic',
  PoppinsItalic: 'Poppins-Italic',
  PoppinsLight: 'Poppins-Light',
  PoppinsLightItalic: 'Poppins-LightItalic',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsMediumItalic: 'Poppins-MediumItalic',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
  PoppinsThin: 'Poppins-Thin',
  PoppinsThinItalic: 'Poppins-ThinItalic',
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

const Poppins = weight => {
  switch (Number(weight)) {
    case 100:
      return fontFamily.PoppinsExtraLight;
    case 200:
      return fontFamily.PoppinsLight;
    case 300:
      return fontFamily.PoppinsThin;
    case 400:
      return fontFamily.PoppinsRegular;
    case 500:
      return fontFamily.PoppinsMedium;
    case 600:
      return fontFamily.PoppinsSemiBold;
    case 700:
      return fontFamily.PoppinsBold;
    case 800:
      return fontFamily.PoppinsExtraBold;
    default:
      return fontFamily.PoppinsRegular;
  }
};

export {fontFamily, Montserrat, Poppins};
