const fs = require('fs');
const glob = require('glob');
const utils = require('./utils.js');

const touchTrackerImport = 'import com.reactlibrary.touch.TouchTracker;';
const touchTrackerDeclaration = 'private TouchTracker touchTracker;';
const touchTrackerInitialization = 'touchTracker = new TouchTracker(getApplicationContext());';
const touchTrackerHandler = 'touchTracker.handleTouchEvent(ev, this);';

glob('android/app/src/main/java/**/MainActivity.java', {}, function (error, match) {
    const filePath = match.toString();

    try {
        utils.removeLine(filePath, touchTrackerImport);
        utils.removeLine(filePath, touchTrackerDeclaration);
        utils.removeLine(filePath, touchTrackerInitialization);
        utils.removeLine(filePath, touchTrackerHandler);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
});
