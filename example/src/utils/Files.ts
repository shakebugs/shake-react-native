import RNFS from 'react-native-fs';

export const createTempFile = (path) => {
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then(() => {
      console.log('File written');
    })
    .catch((error) => {
      console.log(error.message);
    });
};
