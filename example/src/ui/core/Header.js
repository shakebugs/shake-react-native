import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/logo.png')} />
      <Text style={styles.text}>Shake</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    marginRight: 4,
  },

  text: {
    fontFamily: 'HKGrotesk-SemiBold',
    fontSize: 22,
    marginTop: -4,
  },
});

export default Header;
