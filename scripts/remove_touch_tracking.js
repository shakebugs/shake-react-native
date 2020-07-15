const glob = require('glob');
const utils = require('./utils.js');

const shakeImport = 'import com.shakebugs.shake.Shake;';
const eventImport = 'import android.view.MotionEvent;';
const touchHandle = 'Shake.handleTouchEvent(ev, this);';

glob('android/app/src/main/java/**/MainActivity.java', {}, function (error, match) {
    const filePath = match.toString();
    try {
        utils.removeLine(filePath, shakeImport);
        utils.removeLine(filePath, eventImport);
        utils.removeLine(filePath, touchHandle);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
});
