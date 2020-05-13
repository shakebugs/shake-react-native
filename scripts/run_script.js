const execSync = require('child_process');
const process = require('process');
const glob = require('glob');

glob('node_modules/@shakebugs/react-native-shake?(-uat|-staging)/scripts', {}, function(error, match) {
    const filePath = match.toString();
    try {
        execSync(`node ${filePath}/add_maven_link.js`, [], {uid:process.getuid()});
        execSync(`node ${filePath}/add_dependency_shake.js`, [], {uid:process.getuid()});
        execSync(`node ${filePath}/add_shake_init_code.js`, [], {uid:process.getuid()});
        execSync(`node ${filePath}/add_touch_tracking.js`, [], {uid:process.getuid()});
    } catch(error) {
        console.error(error);
        process.exit(-1);
    }
});
