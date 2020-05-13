const fs = require('fs');
const glob = require('glob');
const importsStr = ['import android.os.Bundle;', 'import com.reactlibrary.touch.TouchTracker;', 'import android.view.MotionEvent;'];
const touchTrackerVar = '  TouchTracker touchTracker;\n';
const onCreateStr = [
    '  @Override',
    '  protected void onCreate(Bundle savedInstanceState) {',
    '\tsuper.onCreate(savedInstanceState);',
    '\ttouchTracker = new TouchTracker(getApplicationContext());',
    '  }',
];
const handleEventStr = [
    '  @Override',
    '  public boolean dispatchTouchEvent(MotionEvent ev) {',
    '\ttouchTracker.handleTouchEvent(ev, this);',
    '\treturn super.dispatchTouchEvent(ev);',
    '  }',
];
const mainActivity = 'public class MainActivity extends ReactActivity {';

const renderMutlilineString = function(stringArray) {
    let result = '';
    for(i in stringArray) {
        result += stringArray[i] + '\n';
    }
    result += '\n';
    return result;
}

glob('../[a-zA-Z0-9_-]*/android/app/src/main/java/**/MainActivity.java', {}, function(error, match) {
    const filePath = match.toString();
    let fileContents = fs.readFileSync(`${filePath}`, 'utf8');
    if(fileContents.includes('TouchTracker')) {
        try {
            let mainActivityIndex = fileContents.indexOf(mainActivity);
            let importsContents = renderMutlilineString(importsStr);
            let onCreateContents = renderMutlilineString(onCreateStr);
            let handleEventContents = renderMutlilineString(handleEventStr);
            let lastBrace = fileContents.lastIndexOf('}');
            let contents = fileContents.substring(0, mainActivityIndex) + importsContents + fileContents.substring(mainActivityIndex, lastBrace) + touchTrackerVar + onCreateContents + handleEventContents + '}';
            fs.writeFileSync(filePath, contents)
        } catch(error) {
            console.error(error);
            process.exit(-1);
        }

    }
});
