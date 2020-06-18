const fs = require('fs');
const glob = require('glob');

// To work with a local version of the Android SDK publish it to local Maven repo. Take care when publishing to the
//  local maven repo to use a name and version as specified in the scripts/link_script.js file
//  (eg. com.shakebugs.android:shake-uat:9.0.+)
const mavenURL =  'mavenLocal()';

const readBlock = function(contents, searchBlock) {
    let regex = '}|{'
    let current;
    current = contents.indexOf(searchBlock);
    current = contents.indexOf("{", current) + 1;
    let openBraces = 1;
        while(openBraces > 0) {
            current = contents.substring(current).search(regex) + current;
            if(contents.charAt(current) == "{") {
                openBraces++;
                current++;
            } else if (contents.charAt(current) == "}") {
                openBraces--;
                current++;
            }
        }
        return current;
}
glob('android/build.gradle', {}, function(error, match) {
	const filePath = match.toString();
	let fileContents = fs.readFileSync(filePath, 'utf8');
	if(fileContents.indexOf(mavenURL) == -1) {
		try {
            let allProjectsIndex = fileContents.indexOf("allprojects");
            let firstBlock = fileContents.indexOf("{", allProjectsIndex) + 1;
        	let secondBlock = readBlock(fileContents.substring(firstBlock), "repositories") + firstBlock;
        	let targetIndex = fileContents.lastIndexOf("}", secondBlock) - 1;
        	let contents = fileContents.substring(0, targetIndex) + '\t' + mavenURL + '\n    ' + fileContents.substring(targetIndex+1);
            fs.writeFileSync(filePath, contents);

    	} catch(error) {
        	console.error(error);
        	process.exit(1);
    	}
    }
});




