module.exports = {
  dependency: {
    platforms: {
      ios: {},
      android: {},
    },
    hooks: {
	  prelink: 'node node_modules/react-native-shake/scripts/run_script.js',
    },
  },
  commands: [
    {
        name: 'add-shake',
        func: () => {
            const {execSync} = require('child_process');
            execSync("node node_modules/react-native-shake/scripts/run_script.js");
        }
    }
  ],
};
