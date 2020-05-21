const fs = require('fs');
const glob = require('glob');
const utils = require('./utils.js');

const gradleDependency = `implementation "${process.argv[2]}"`;

glob('android/app/build.gradle', {}, function (error, match) {
    const filePath = match.toString();

    try {
        utils.removeLine(filePath, gradleDependency);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
