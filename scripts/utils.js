const fs = require("fs");

/**
 * Add line before line including specific text.
 * @param filePath file path
 * @param beforeLine specific text
 * @param text text to add
 */
function addLineBefore(filePath, beforeLine, text) {
    const fileContents = fs.readFileSync(filePath, "utf8");

    let newArray = [];

    let array = fileContents.split("\n");
    for (i = 0; i < array.length; i++) {
        const line = array[i];

        if (line.includes(beforeLine)) newArray.push(text);

        newArray.push(line);
    }

    fs.writeFileSync(filePath, newArray.join("\n"));
}

/**
 * Add line after line including specific text.
 * @param filePath file path
 * @param afterLine specific text
 * @param text text to add
 */
function addLineAfter(filePath, afterLine, text) {
    const fileContents = fs.readFileSync(filePath, "utf8");

    let newArray = [];

    let array = fileContents.split("\n");
    for (i = 0; i < array.length; i++) {
        const line = array[i];

        newArray.push(line);

        if (line.includes(afterLine)) newArray.push(text);
    }

    fs.writeFileSync(filePath, newArray.join("\n"));
}

/**
 * Removes line including specific text.
 * @param filePath file path
 * @param text specific text
 */
function removeLine(filePath, text) {
    const fileContents = fs.readFileSync(filePath, "utf8");

    let array = fileContents.split("\n");
    for (i in array) {
        if (array[i].includes(text)) {
            array.splice(i, 1);
        }
    }

    fs.writeFileSync(filePath, array.join("\n"));
}

/**
 * Checks if file contains line with specific text.
 * @param filePath file path
 * @param text text to search in line
 * @returns {boolean} true if contains, otherwise false
 */
function containsLine(filePath, text) {
    const fileContents = fs.readFileSync(filePath, "utf8");

    let array = fileContents.split("\n");
    for (i in array) {
        if (array[i].includes(text)) {
            return true;
        }
    }
    return false;
}

/**
 * Removes specific text from file
 * @param filePath file path
 * @param text text to remove
 */
function removeText(filePath, text) {
    let fileContents = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(filePath, fileContents.replace(text, ""));
}

// Exports
exports.addLineBefore = addLineBefore;
exports.addLineAfter = addLineAfter;
exports.removeLine = removeLine;
exports.containsLine = containsLine;
exports.removeText = removeText;
