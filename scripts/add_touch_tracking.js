const fs = require('fs');
const glob = require('glob');

const shakeImport =
`
import com.shakebugs.shake.Shake;
import android.view.MotionEvent;

`;
const touchHandle =
`
  @Override
  public boolean dispatchTouchEvent(MotionEvent ev) {
      Shake.handleTouchEvent(ev, this);
      return super.dispatchTouchEvent(ev);
  }`;
const mainActivity = 'public class MainActivity extends ReactActivity {';

glob('android/app/src/main/java/**/MainActivity.java', {}, function (error, match) {
    const filePath = match.toString();

    let fileContents = fs.readFileSync(filePath, 'utf8');
    if (!fileContents.includes('Shake.handleTouchEvent')) {
        try {
            let mainActivityIndex = fileContents.indexOf(mainActivity);
            let lastBraceIndex = fileContents.lastIndexOf('}');

            let contents = fileContents.substring(0, mainActivityIndex) + shakeImport + fileContents.substring(mainActivityIndex, lastBraceIndex) + touchHandle + '\n}';

            fs.writeFileSync(filePath, contents)
        } catch (error) {
            console.error(error);
            process.exit(-1);
        }
    }
});
