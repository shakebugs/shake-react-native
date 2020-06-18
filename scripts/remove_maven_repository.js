const fs = require('fs');
const glob = require('glob');
const utils = require('./utils.js');

// To work with a local version of the Android SDK publish it to local Maven repo. Take care when publishing to the
//  local maven repo to use a name and version as specified in the scripts/link_script.js file
//  (eg. com.shakebugs.android:shake-uat:9.0.+)
const mavenRepository = 'mavenLocal()';

glob('android/build.gradle', {}, function (error, match) {
    const filePath = match.toString();

    try {
        utils.removeLine(filePath, mavenRepository);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
});



