const execute = require("child_process").exec;
const fs = require("fs");

const pathPrd = "node_modules/@shakebugs/react-native-shake/scripts";
const pathStg = "node_modules/@shakebugs/react-native-shake-staging/scripts";

if (fs.existsSync(pathPrd)) {
    execute(`node ${pathPrd}/remove_multidex_enabled.js`);
    execute(`node ${pathPrd}/remove_touch_tracking.js`);
} else if (fs.existsSync(pathStg)) {
    execute(`node ${pathStg}/remove_multidex_enabled.js`);
    execute(`node ${pathStg}/remove_touch_tracking.js`);
}

