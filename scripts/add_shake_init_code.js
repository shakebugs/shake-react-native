const fs = require('fs');
const glob = require('glob');
var shakeInit = ['Shake.setInvocationEvents(ShakeInvocationEvent.BUTTON);', 'Shake.start(this);'];
var shakeImports = ['import com.shakebugs.shake.Shake;', 'import com.shakebugs.shake.ShakeInvocationEvent;'];

const flipper = new RegExp('initializeFlipper[a-zA-Z\_\(\)\-\.\,\;\ ]*\;');
const soLoader = new RegExp('SoLoader\.init[a-zA-Z\*\_\(\)\-\.\,\;\/\\\ ]*\;');


glob('../[a-zA-Z0-9_-]*/android/app/src/main/java/**/MainApplication.java', {}, function(error, match) {
    const filePath = match.toString();
    let fileContents = fs.readFileSync(`${filePath}`, 'utf8');
    if(fileContents.indexOf(shakeImports[1]) == -1) {
        try {
            let mainApplication = fileContents.indexOf("public class MainApplication extends Application implements ReactApplication {");
            let contentsImport = fileContents.substring(0, mainApplication) + shakeImports[0] + '\n' + shakeImports[1] + '\n\n' + fileContents.substring(mainApplication);
			fs.writeFileSync(filePath, contentsImport);
        } catch(error) {
            console.error(error);
            process.exit(1);
        }
    }
	fileContents = fs.readFileSync(`${filePath}`, 'utf8');
    if(fileContents.indexOf(shakeInit[0]) == -1) {
        try {
            let onCreateIndex = fileContents.indexOf('public void onCreate() {');
            let superIndex = fileContents.indexOf('super.onCreate();', onCreateIndex);
            let soLoaderIndex = fileContents.substring(superIndex).search(soLoader) + superIndex;
            let initializeFlipperIndex = fileContents.substring(soLoaderIndex).search(flipper) + soLoaderIndex;
            let closingBraceIndex = fileContents.indexOf("\n", initializeFlipperIndex);

            let contents = fileContents.substring(0, closingBraceIndex) + '\n\t' + shakeInit[0] + '\n\t' + shakeInit[1] + fileContents.substring(closingBraceIndex);
            fs.writeFileSync(filePath, contents);

        } catch(error) {
            console.error(error);
            process.exit(1);
        }
    }


});

