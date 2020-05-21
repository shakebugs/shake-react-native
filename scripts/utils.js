const fs = require('fs');

function removeLine(filePath, text) {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    let array = fileContents.split("\n");
    for (i in array) {
        if (array[i].includes(text)) {
            array.splice(i, 1);
        }
    }

    fs.writeFileSync(filePath, array.join('\n'));
}

function removeLines(filePath, array) {
    let i;
    for (i = 0; i < array.length; i++) {
        removeLine(filePath, array[i]);
    }
}

exports.removeLine = removeLine;
exports.removeLines = removeLines;
