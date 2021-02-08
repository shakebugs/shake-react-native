declare module '@shakebugs/react-native-shake' {
    export function start(clientId: string, clientSecret: string): void;

    export function show(): void;

    export function setEnabled(enabled: boolean): void;

    export function setEnableActivityHistory(enableActivityHistory: boolean): void;

    export function isEnableActivityHistory(): Promise<boolean>;

    export function setEnableBlackBox(enableBlackBox: boolean): void;

    export function isEnableBlackBox(): Promise<boolean>;

    export function setEnableInspectScreen(enableInspectScreen: boolean): void;

    export function isEnableInspectScreen(): Promise<boolean>;

    export function setShowFloatingReportButton(showFloatingReportButton: boolean): void;

    export function isShowFloatingReportButton(): Promise<boolean>;

    export function setInvokeShakeOnShakeDeviceEvent(invokeOnShake: boolean): void;

    export function isInvokeShakeOnShakeDeviceEvent(): Promise<boolean>;

    export function setInvokeShakeOnScreenshot(invokeOnScreenshot: boolean): void;

    export function isInvokeShakeOnScreenshot(): Promise<boolean>;

    export function setInvokeShakeOnRightEdgePan(invokeOnRightEdgePan: boolean): void;

    export function isInvokeShakeOnRightEdgePan(): Promise<boolean>;

    export function setShakeReportData(files: Array<ShakeFile>): void;

    export function silentReport(description: string, files: Array<ShakeFile>, configuration: ShakeReportConfiguration): void;

    export function insertNetworkRequest(request: object): void;

    export function isEnableEmailField(): Promise<boolean>;

    export function setEnableEmailField(enableEmailField: boolean): void;

    export function getEmailField(): Promise<string>;

    export function setEmailField(email: string): void;

    export function isEnableMultipleFeedbackTypes(): Promise<boolean>;

    export function setEnableMultipleFeedbackTypes(enableEmailField: boolean): void;

    export function getShowIntroMessage(): Promise<boolean>;

    export function setShowIntroMessage(showIntroMessage: boolean): void;

    export function isAutoVideoRecording(): Promise<boolean>;

    export function setAutoVideoRecording(autoRecordingEnabled: boolean): void;

    export function isConsoleLogsEnabled(): Promise<boolean>;

    export function setConsoleLogsEnabled(autoRecordingEnabled: boolean): void;

    export function log(logLevel: LogLevel, message: string): void;

    export function setMetadata(key: string, value: string): void;

    export class ShakeReportConfiguration {
        blackBoxData: boolean;
        activityHistoryData: boolean;
        screenshot: boolean;
        showReportSentMessage: boolean;
    }

    export class ShakeFile {
        name: string;
        path: string;
    }

    export class LogLevel {
        static VERBOSE: LogLevel;
        static DEBUG: LogLevel;
        static INFO: LogLevel;
        static WARN: LogLevel;
        static ERROR: LogLevel;
        value: string;
    }

    export namespace ShakeFile {
        function create(filePath: string, fileName?: string): ShakeFile
    }

    export namespace NetworkTracker {
        function isEnabled(): boolean

        function setEnabled(enabled: boolean): void
    }
}
