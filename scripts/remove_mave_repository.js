const fs = require('fs');
const glob = require('glob');
const mavenURL =  'maven { url "https://dl.bintray.com/shake/shake" }';

const regex = new RegExp(`${mavenURL}`, 'i');

glob('android/build.gradle', {}, function(error, match) {
	const filePath = match.toString();
	let fileContents = fs.readFileSync(filePath, 'utf8');
	if(fileContents.indexOf(mavenURL) == -1) {
		try {
            fs.writeFileSync(fileContents.replace(regex, ''));
    	} catch(error) {
        	console.error(error);
        	process.exit(1);
    	}
    }
});



