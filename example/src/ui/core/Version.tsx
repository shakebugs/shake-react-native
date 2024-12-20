import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const Version = () => {
  return (
    <View style={styles.info}>
      <TouchableWithoutFeedback>
        <Text style={styles.version}>{'v' + DeviceInfo.getVersion()}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    marginBottom: 16,
    marginTop: 8,
  },

  version: {
    textAlign: 'center',
  },
});

export default Version;
