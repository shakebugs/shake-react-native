import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

const convertImageToBase64 = async imagePath => {
  try {
    const imageUri =
      Platform.OS === 'android'
        ? `file:///android_asset/${imagePath}`
        : imagePath;
    return await RNFS.readFile(imageUri, 'base64');
  } catch (error) {
    console.error('Error converting image to Base64:', error);
    return null;
  }
};

export {convertImageToBase64};
