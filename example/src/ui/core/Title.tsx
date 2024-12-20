import { StyleSheet, Text } from 'react-native';

interface TitleProps {
  style: object;
  text: string;
}

const Title = (props: TitleProps) => {
  return <Text style={[props.style, styles.text]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'HKGrotesk-Regular',
  },
});

export default Title;
