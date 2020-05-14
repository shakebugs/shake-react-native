const fs = require('fs');
const glob = require('glob');

const dependency = `implementation "${process.argv[2]}"`;

glob('android/app/build.gradle', {}, function (error, match) {
    const filePath = match.toString();
    let fileContents = fs.readFileSync(filePath, 'utf8');
    if (fileContents.indexOf(dependency) == -1) {
        try {
            let androidBlockIndex = fileContents.indexOf("android {");
            let dependeciesBlockIndex = fileContents.indexOf("dependencies {", androidBlockIndex);
            let newline = fileContents.indexOf("\n", dependeciesBlockIndex);
            let contents = fileContents.substring(0, newline) + "\n    " + dependency + fileContents.substring(newline);
            fs.writeFileSync(filePath, contents);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
});
