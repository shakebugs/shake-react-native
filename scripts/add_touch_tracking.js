const fs = require('fs');
const glob = require('glob');

const shakeImport = ['import com.shakebugs.shake.Shake;', 'import android.view.MotionEvent;'];
const touchHandle = [
    '\t@Override',
    '\tpublic boolean dispatchTouchEvent(MotionEvent ev) {',
    '\t\tShake.handleTouchEvent(ev, this);',
    '\t\treturn super.dispatchTouchEvent(ev);',
    '\t}',
];
const mainActivity = 'public class MainActivity extends ReactActivity {';

const renderMutlilineString = function (stringArray) {
    let result = '';
    for (i in stringArray) {
        result += stringArray[i] + '\n';
    }
    result += '\n';
    return result;
}

glob('android/app/src/main/java/**/MainActivity.java', {}, function (error, match) {
    const filePath = match.toString();

    let fileContents = fs.readFileSync(filePath, 'utf8');
    if (!fileContents.includes('Shake.handleTouchEvent')) {
        try {
            let importsContents = renderMutlilineString(shakeImport);
            let touchHandleContents = renderMutlilineString(touchHandle);

            let mainActivityIndex = fileContents.indexOf(mainActivity);
            let lastBraceIndex = fileContents.lastIndexOf('}');

            let contents = fileContents.substring(0, mainActivityIndex) + importsContents + fileContents.substring(mainActivityIndex, lastBraceIndex) + touchHandleContents + '}';

            fs.writeFileSync(filePath, contents)
        } catch (error) {
            console.error(error);
            process.exit(-1);
        }
    }
});
