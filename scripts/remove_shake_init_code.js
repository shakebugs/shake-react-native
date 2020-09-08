const glob = require('glob');
const utils = require('./utils.js');

const importCode = 'import com.shakebugs.shake.Shake;';
const initCode = 'Shake.start(this);';

glob('android/app/src/main/java/**/MainApplication.java', {}, function (error, match) {
    const filePath = match.toString();
    try {
        utils.removeLine(filePath, importCode);
        utils.removeLine(filePath, initCode);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
