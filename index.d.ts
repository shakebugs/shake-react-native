export namespace Shake {
    function start(): void;
    function show(): void;
    function setEnabled(enabled: boolean): void;
    function setEnableActivityHistory(enableActivityHistory: boolean): void;
    function setEnableBlackBox(enableBlackBox: boolean): void;
    function setEnableInspectScreen(enableInspectScreen: boolean): void;
    function setShowFloatingReportButton(showFloatingReportButton: boolean): void;
    function setInvokeShakeOnShaking(invokeOnShake: boolean): void;
    function setInvokeShakeOnScreenshot(invokeOnScreenshot: boolean): void;
    function setShakeReportData(files: Array<string>, quickFacts: string): void;
    function silentReport(description: string, filesArray: Array<string>,
                  quicFacts:string, configurationMap: object): void;
    function insertNetworkRequest(request: object): void;
}