const execute = require('child_process').exec;
const process = require('process');
const glob = require('glob');

glob('node_modules/@shakebugs/react-native-shake?(-uat|-staging)/scripts', {}, function(error, match) {
    const filePath = match.toString();
    try {
        execute (`node ${filePath}/add_maven_link.js`);
        execute (`node ${filePath}/add_dependency_shake.js`);
        execute (`node ${filePath}/add_shake_init_code.js`);
        execute (`node ${filePath}/add_touch_tracking.js`);
    } catch(error) {
        console.error(error);
        process.exit(-1);
    }
});
