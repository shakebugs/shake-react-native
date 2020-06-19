const execute = require('child_process').exec;
const fs = require("fs");

const pathPrd = "node_modules/@shakebugs/react-native-shake/scripts";
const pathUat = "node_modules/@shakebugs/react-native-shake-uat/scripts";
const pathStg = "node_modules/@shakebugs/react-native-shake-staging/scripts";

if (fs.existsSync(pathPrd)) {
    execute(`node ${pathPrd}/remove_gradle_dependency.js "com.shakebugs.android:shake:10.0.+"`);
    execute(`node ${pathPrd}/remove_maven_repository.js`);
    execute(`node ${pathPrd}/remove_multidex_enabled.js`);
    execute(`node ${pathPrd}/remove_shake_init_code.js`);
    execute(`node ${pathPrd}/remove_touch_tracking.js`);
} else if (fs.existsSync(pathUat)) {
    execute(`node ${pathUat}/remove_gradle_dependency.js "com.shakebugs.android:shake-uat:10.0.+"`);
    execute(`node ${pathUat}/remove_maven_repository.js`);
    execute(`node ${pathUat}/remove_multidex_enabled.js`);
    execute(`node ${pathUat}/remove_shake_init_code.js`);
    execute(`node ${pathUat}/remove_touch_tracking.js`);
} else if (fs.existsSync(pathStg)) {
    execute(`node ${pathStg}/remove_gradle_dependency.js "com.shakebugs.android:shake-staging:10.0.+"`);
    execute(`node ${pathStg}/remove_maven_repository.js`);
    execute(`node ${pathStg}/remove_multidex_enabled.js`);
    execute(`node ${pathStg}/remove_shake_init_code.js`);
    execute(`node ${pathStg}/remove_touch_tracking.js`);
}
