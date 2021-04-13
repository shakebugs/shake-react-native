class Utils {
    static isBinary(text) {
        return /\ufffd/.test(text) === true;
    }

    static isHttpUrl(text) {
        if (text == null) return false;
        if (text.startsWith("https://")) return true;
        if (text.startsWith("http://")) return true;
        return false;
    }
}

export default Utils;
