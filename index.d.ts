declare module '@shakebugs/react-native-shake' {
    export function start(): void;

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

    export function setShakeReportData(files: Array<ShakeFile>,
                                       quickFacts: string): void;

    export function silentReport(description: string,
                                 files: Array<ShakeFile>,
                                 quickFacts: string,
                                 configuration: ShakeReportConfiguration): void;

    export function insertNetworkRequest(request: object): void;

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

    export namespace ShakeFile {
        function create(filePath: string, fileName?: string): ShakeFile
    }

    export namespace NetworkTracker {
        function isEnabled(): boolean

        function setEnabled(enabled: boolean): void
    }
}
