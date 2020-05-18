const fs = require('fs');
const glob = require('glob');
const importsStr = ['import android.os.Bundle;', 'import com.reactlibrary.touch.TouchTracker;', 'import android.view.MotionEvent;'];
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

glob('android/app/src/main/java/**/MainActivity.java', {}, function(error, match) {
    const filePath = match.toString();
    let fileContents = fs.readFileSync(`${filePath}`, 'utf8');
    if(fileContents.includes('TouchTracker')) {
        try {
            let contents = fileContents.replace('/private TouchTracker touchTracker/i',  '');
            let i, j, k;
            for(i = 0; i < importsStr.length; i++) {
                contents = contents.replace(RegExp(`${importsStr[i]}`, 'i'), '');
            }
            for(j = 0; j < onCreateStr.length; j++) {
                contents = contents.replace(RegExp(`${onCreateStr[j]}`, 'i'), '');
            }
            for(k = 0; k < handleEventStr.length; k++) {
                contents = contents.replace(RegExp(`${handleEventStr[k]}`, 'i'), '');
            }
            fs.writeFileSync(filePath, contents)
        } catch(error) {
            console.error(error);
            process.exit(-1);
        }
    }
});
