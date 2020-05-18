const fs = require('fs');
const glob = require('glob');
var shakeInit = ['Shake.setInvocationEvents(ShakeInvocationEvent.BUTTON);', 'Shake.start(this);'];
var shakeImports = ['import com.shakebugs.shake.Shake;', 'import com.shakebugs.shake.ShakeInvocationEvent;'];


glob('android/app/src/main/java/**/MainApplication.java', {}, function(error, match) {
    const filePath = match.toString();
    let fileContents = fs.readFileSync(`${filePath}`, 'utf8');
    try {
        let i, j;
        let contents = fileContents;
        for(i = 0; i < shakeImports.length; i++) {
            contents = contents.replace(RegExp(`${shakeImports[i]}`, 'i'), '');
        }
        for(j = 0; j < shakeInit.length; j++) {
            contents = contents.replace(RegExp(`${shakeInit[j]}`, 'i'), '');
        }
        fs.writeFileSync(filePath, contents);

    } catch(error) {
        console.error(error);
        process.exit(1);
  }


});
