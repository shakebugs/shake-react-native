import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import Shake, { ShakeTheme } from 'react-native-shake';

const DarkModeObserver = (props: any) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme === 'dark') {
      const darkTheme = new ShakeTheme();
      darkTheme.accentColor = '#FFFFFF';
      Shake.setShakeTheme(darkTheme);
    } else {
      const lightTheme = new ShakeTheme();
      lightTheme.accentColor = '#000000';
      Shake.setShakeTheme(lightTheme);
    }
  }, [colorScheme]);

  return props.children;
};

export default DarkModeObserver;
