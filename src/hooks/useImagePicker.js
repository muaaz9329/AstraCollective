import ImageCropPicker from 'react-native-image-crop-picker';

const useImagePicker = () => {
  /**
   *
   * @param {*} mediaType  to take photo or video
   * @param {*} isMultiple to take multiple image , default is false
   * @param {*} isCropping to crop the image , default is false
   * @returns image
   */
  async function imagePicker(
    mediaType = 'photo',
    isMultiple = false,
    isCropping = false,
  ) {
    const image = await ImageCropPicker.openPicker({
      mediaType: mediaType,
      cropping: isCropping,
      multiple: isMultiple,
    });

    return image;
  }

  return {
    imagePicker,
  };
};

export default useImagePicker;
