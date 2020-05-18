const fs = require('fs');
const glob = require('glob');

const dependency = `implementation "${process.argv[2]}"`;
const regex = RegExp(`${dependency}`, 'i');
glob('android/app/build.gradle', {}, function (error, match) {
    const filePath = match.toString();
    let fileContents = fs.readFileSync(filePath, 'utf8');
    if (fileContents.indexOf(dependency) != -1) {
        try {
            fs.writeFileSync(fileContents.replace(regex, ''));
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
});
