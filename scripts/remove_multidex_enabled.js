const fs = require('fs');
const glob = require('glob');

const regex = new RegExp('multiDexEnabled true', 'i');

glob("android/app/build.gradle", {}, function (error, match) {
    const filePath = match.toString();
    const fileContent = fs.readFileSync(`${filePath}`, "utf8");
    if (fileContent.includes("multiDexEnabled")) {
        try {
            fs.writeFileSync(fileContent.replace(regex, ''));
        } catch (error) {
            console.error(error);
            process.exit(-1);
        }
    }
});
