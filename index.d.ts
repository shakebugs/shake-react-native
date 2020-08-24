declare module '@shakebugs/react-native-shake' {
    export function start(): void;
    export function show(): void;
    export function setEnabled(enabled: boolean): void;
    export function setEnableActivityHistory(enableActivityHistory: boolean): void;
    export function setEnableBlackBox(enableBlackBox: boolean): void;
    export function setEnableInspectScreen(enableInspectScreen: boolean): void;
    export function setShowFloatingReportButton(showFloatingReportButton: boolean): void;
    export function setInvokeShakeOnShaking(invokeOnShake: boolean): void;
    export function setInvokeShakeOnScreenshot(invokeOnScreenshot: boolean): void;
    export function setShakeReportData(files: Array<string>, quickFacts: string): void;
    export function silentReport(description: string, filesArray: Array<string>,
                                 quicFacts:string, configurationMap: object): void;
    export function insertNetworkRequest(request: object): void;
}
