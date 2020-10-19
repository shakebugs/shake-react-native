class Utils {
    static isBinary(text) {
        return /\ufffd/.test(text) === true;
    }
}

export default Utils;
