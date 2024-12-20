import { StyleSheet, Text, View } from 'react-native';
import type { MutableRefObject } from 'react';

interface PrivateProps {
  customRef: MutableRefObject<View | null>;
}

const Private = (props: PrivateProps) => {
  return (
    <View style={styles.root} ref={props.customRef}>
      <Text style={styles.text}>Sample view</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
    marginBottom: 6,
    borderRadius: 28,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'HKGrotesk-Regular',
  },
});

export default Private;
