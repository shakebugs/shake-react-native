module.exports = {
    commands: [
        {
            name: 'add-shake',
            func: () => {
                const process = require('child_process');
                const fs = require("fs");

                const pathPrd = "node_modules/@shakebugs/react-native-shake/scripts/link_script.js";
                const pathUat = "node_modules/@shakebugs/react-native-shake-uat/scripts/link_script.js";
                const pathStg = "node_modules/@shakebugs/react-native-shake-staging/scripts/link_script.js";

                if (fs.existsSync(pathPrd)) {
                    process.exec(`node ${pathPrd}`);
                } else if (fs.existsSync(pathUat)) {
                    process.exec(`node ${pathUat} `);
                } else if (fs.existsSync(pathStg)) {
                    process.exec(`node ${pathStg}`);
                }
            }
        },
        {
            name: 'remove-shake',
            func: () => {
                const process = require('child_process');
                const fs = require("fs");

                const pathPrd = "node_modules/@shakebugs/react-native-shake/scripts/unlink_script.js";
                const pathUat = "node_modules/@shakebugs/react-native-shake-uat/scripts/unlink_script.js";
                const pathStg = "node_modules/@shakebugs/react-native-shake-staging/scripts/unlink_script.js";

                if (fs.existsSync(pathPrd)) {
                    process.exec(`node ${pathPrd}`);
                } else if (fs.existsSync(pathUat)) {
                    process.exec(`node ${pathUat} `);
                } else if (fs.existsSync(pathStg)) {
                    process.exec(`node ${pathStg}`);
                }
            }
        }
    ],
};
