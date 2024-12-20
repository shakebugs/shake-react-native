import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LinkProps {
  link: string;
  text: string;
}

const Link = (props: LinkProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(props.link);
      }}
    >
      <Text style={styles.link}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#643ecb',
    flex: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default Link;
