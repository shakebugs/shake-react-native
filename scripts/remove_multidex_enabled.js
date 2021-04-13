const glob = require("glob");
const utils = require("./utils.js");

const multidexEnabled = "multiDexEnabled true";

glob("android/app/build.gradle", {}, function (error, match) {
    const filePath = match.toString();

    if (utils.containsLine(filePath, multidexEnabled)) {
        utils.removeLine(filePath, multidexEnabled);
    }
});
