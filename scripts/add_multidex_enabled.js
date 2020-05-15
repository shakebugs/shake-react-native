const fs = require('fs');
const glob = require('glob');

glob("android/app/build.gradle", {}, function (error, match) {
    const filePath = match.toString();

    const fileContent = fs.readFileSync(`${filePath}`, "utf8");
    if (!fileContent.includes("multiDexEnabled")) {
        try {
            const defaultConfigSection = "defaultConfig {";
            const defaultConfigSectionIndex = fileContent.indexOf(defaultConfigSection) + defaultConfigSection.length;

            const newFileContent =
                fileContent.substring(0, defaultConfigSectionIndex) +
                "\n\t\tmultiDexEnabled true" +
                fileContent.substring(defaultConfigSectionIndex, fileContent.length);

            fs.writeFileSync(filePath, newFileContent)
        } catch (error) {
            console.error(error);
            process.exit(-1);
        }
    }
});
