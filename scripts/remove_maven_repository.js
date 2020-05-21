const fs = require('fs');
const glob = require('glob');
const utils = require('./utils.js');

const mavenRepository = 'maven { url "https://dl.bintray.com/shake/shake" }';

glob('android/build.gradle', {}, function (error, match) {
    const filePath = match.toString();

    try {
        utils.removeLine(filePath, mavenRepository);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
});



