const fs = require('fs');
const glob = require('glob');
const utils = require('./utils.js');

const importCode = [
    'import com.shakebugs.shake.Shake;',
    'import com.shakebugs.shake.ShakeInvocationEvent;'
];
const initCode = [
    'Shake.setInvocationEvents(ShakeInvocationEvent.BUTTON);',
    'Shake.start(this);'
];

glob('android/app/src/main/java/**/MainApplication.java', {}, function (error, match) {
    const filePath = match.toString();
    try {
        utils.removeLines(filePath, importCode);
        utils.removeLines(filePath, initCode);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
