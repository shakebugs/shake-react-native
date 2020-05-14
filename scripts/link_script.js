const execute = require('child_process').exec;
const fs = require("fs");

const pathPrd = "node_modules/@shakebugs/react-native-shake/scripts";
const pathUat = "node_modules/@shakebugs/react-native-shake-uat/scripts";
const pathStg = "node_modules/@shakebugs/react-native-shake-staging/scripts";

if (fs.existsSync(pathPrd)) {
    execute(`node ${pathPrd}/add_gradle_dependency.js "com.shakebugs.android:shake:9.0.+"`);
    execute(`node ${pathPrd}/add_maven_repository.js`);
    execute(`node ${pathPrd}/add_shake_init_code.js`);
    execute(`node ${pathPrd}/add_touch_tracking.js`);
} else if (fs.existsSync(pathUat)) {
    execute(`node ${pathUat}/add_gradle_dependency.js "com.shakebugs.android:shake-uat:9.0.+"`);
    execute(`node ${pathUat}/add_maven_repository.js`);
    execute(`node ${pathUat}/add_shake_init_code.js`);
    execute(`node ${pathUat}/add_touch_tracking.js`);
} else if (fs.existsSync(pathStg)) {
    execute(`node ${pathStg}/add_gradle_dependency.js "com.shakebugs.android:shake-staging:9.0.+"`);
    execute(`node ${pathStg}/add_maven_repository.js`);
    execute(`node ${pathStg}/add_shake_init_code.js`);
    execute(`node ${pathStg}/add_touch_tracking.js`);
}
