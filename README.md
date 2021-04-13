# Shake for React Native

[Shake](https://www.shakebugs.com) plugin for React Native.

## How to use

### Install Shake

Execute the npm install command in your terminal:
```bash
npm install @shakebugs/react-native-shake
```

If you are using a React Native version 0.60 or greater, you should also run add command:
```bash
react-native add-shake
```

If you are using a React Native version older than 0.60, you should instead run link command:
```bash
react-native link @shakebugs/react-native-shake
```

Install pods from the project root directory:
```bash
cd ios && pod install && cd ..
```

## Start Shake
Call `Shake.start()` method in the *index.js* file.

```javascript title="index.js"
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Shake from '@shakebugs/react-native-shake';

AppRegistry.registerComponent(appName, () => App);

Shake.start('client-id', 'client-secret');
```

Replace `client-id` and `client-secret` with the actual values you have in [your workspace settings](https://app.shakebugs.com/settings/workspace#general).

## Documentation

Visit [documentation](https://www.shakebugs.com/docs) for more details.
