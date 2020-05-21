const fs = require('fs');
const glob = require('glob');
const utils = require('./utils.js');

const multidexEnabled = 'multiDexEnabled true';

glob("android/app/build.gradle", {}, function (error, match) {
    const filePath = match.toString();

    try {
        utils.removeLine(filePath, multidexEnabled);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
});
