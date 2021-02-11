/**
 * Represents Shake log level.
 */
class LogLevel {
    static get VERBOSE() { return VERBOSE; }
    static get DEBUG() { return DEBUG; }
    static get INFO() { return INFO; }
    static get WARN() { return WARN; }
    static get ERROR() { return ERROR; }

    value = "";

    constructor(value) {
        this.value = value;
    }
}

const VERBOSE = new LogLevel("VERBOSE");
const DEBUG = new LogLevel("DEBUG");
const INFO = new LogLevel("INFO");
const WARN = new LogLevel("WARN");
const ERROR = new LogLevel("ERROR");

export default LogLevel;
