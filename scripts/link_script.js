const execute = require('child_process').exec;
const fs = require("fs");

const pathPrd = "node_modules/@shakebugs/react-native-shake/scripts";
const pathUat = "node_modules/@shakebugs/react-native-shake-uat/scripts";
const pathStg = "node_modules/@shakebugs/react-native-shake-staging/scripts";

if (fs.existsSync(pathPrd)) {
    execute(`node ${pathPrd}/add_shake_init_code.js`);
    execute(`node ${pathPrd}/add_multidex_enabled.js`);
    execute(`node ${pathPrd}/add_touch_tracking.js`);
} else if (fs.existsSync(pathUat)) {
    execute(`node ${pathUat}/add_shake_init_code.js`);
    execute(`node ${pathUat}/add_multidex_enabled.js`);
    execute(`node ${pathUat}/add_touch_tracking.js`);
} else if (fs.existsSync(pathStg)) {
    execute(`node ${pathStg}/add_shake_init_code.js`);
    execute(`node ${pathStg}/add_multidex_enabled.js`);
    execute(`node ${pathStg}/add_touch_tracking.js`);
}
