const glob = require("glob");
const utils = require("./utils.js");

const shakeImport = "import com.shakebugs.shake.Shake;";
const eventImport = "import android.view.MotionEvent;";
const shakeHandle = "Shake.handleTouchEvent(ev, this);";
const dispatchMethod = `
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        Shake.handleTouchEvent(ev, this);
        return super.dispatchTouchEvent(ev);
    }`;

glob("android/app/src/main/java/**/MainActivity.java", {}, function (error, match) {
    const filePath = match.toString();

    if (!utils.containsLine(filePath, shakeHandle)) {
        utils.addLineBefore(filePath, "class MainActivity", eventImport);
        utils.addLineBefore(filePath, "class MainActivity", shakeImport);
        utils.addLineBefore(filePath, "class MainActivity", "");
        utils.addLineAfter(filePath, "class MainActivity", dispatchMethod);
    }
});
