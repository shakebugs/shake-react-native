module.exports = {
  dependency: {
    platforms: {
      ios: {},
      android: {},
    },
    hooks: {
	  prelink: 'node node_modules/@shakebugs/react-native-shake/scripts/run_script.js',
    },
  },
  commands: [
    {
        name: 'add-shake',
        func: () => {
            const execute = require('child_process').exec;
            execute("node node_modules/@shakebugs/react-native-shake/scripts/run_script.js");
        }
    }
  ],
};
