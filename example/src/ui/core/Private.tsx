import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Private = (props) => {
  return (
    <View
      style={styles.root}
      ref={(ref) => {
        props.customRef(ref);
      }}
    >
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
