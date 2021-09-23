declare module "react-native-shake" {
    export function start(clientId: string, clientSecret: string): void;

    export function show(): void;

    export function setEnabled(shakeEnabled: boolean): void;

    export function setEnableActivityHistory(activityHistoryEnabled: boolean): void;

    export function isEnableActivityHistory(): Promise<boolean>;

    export function setEnableBlackBox(blackBoxEnabled: boolean): void;

    export function isEnableBlackBox(): Promise<boolean>;

    export function setEnableInspectScreen(inspectScreenEnabled: boolean): void;

    export function isEnableInspectScreen(): Promise<boolean>;

    export function setShowFloatingReportButton(floatingButtonEnabled: boolean): void;

    export function isShowFloatingReportButton(): Promise<boolean>;

    export function setInvokeShakeOnShakeDeviceEvent(shakeInvokeEnabled: boolean): void;

    export function isInvokeShakeOnShakeDeviceEvent(): Promise<boolean>;

    export function setInvokeShakeOnScreenshot(screenshotInvokeEnabled: boolean): void;

    export function isInvokeShakeOnScreenshot(): Promise<boolean>;

    export function isEnableEmailField(): Promise<boolean>;

    export function setEnableEmailField(emailFieldEnabled: boolean): void;

    export function getEmailField(): Promise<string>;

    export function setEmailField(email: string): void;

    export function isEnableMultipleFeedbackTypes(): Promise<boolean>;

    export function setEnableMultipleFeedbackTypes(feedbackTypesEnabled: boolean): void;

    export function getShowIntroMessage(): Promise<boolean>;

    export function setShowIntroMessage(showIntroMessage: boolean): void;

    export function isAutoVideoRecording(): Promise<boolean>;

    export function setAutoVideoRecording(videoRecordingEnabled: boolean): void;

    export function isConsoleLogsEnabled(): Promise<boolean>;

    export function setConsoleLogsEnabled(consoleLogsEnabled: boolean): void;

    export function isNetworkRequestsEnabled(): Promise<boolean>;

    export function setNetworkRequestsEnabled(networkRequestsEnabled: boolean): void;

    export function insertNetworkRequest(requestBuilder: NetworkRequestBuilder): void;

    export function setNetworkRequestsFilter(
        filter: (requestBuilder: NetworkRequestBuilder) => NetworkRequestBuilder
    ): void;

    export function insertNotificationEvent(notificationBuilder: NotificationEventBuilder): void;

    export function setNotificationEventsFilter(
        filter: (notificationBuilder: NotificationEventBuilder) => NotificationEventBuilder
    ): void;

    export function setShakeReportData(files: Array<ShakeFile>): void;

    export function isSensitiveDataRedactionEnabled(): Promise<boolean>;

    export function setSensitiveDataRedactionEnabled(sensitiveDataRedactionEnabled: boolean): void;

    export function isScreenshotIncluded(): Promise<boolean>;

    export function setScreenshotIncluded(screenshotIncluded: boolean): void;

    export function getShakingThreshold(): Promise<number>;

    export function setShakingThreshold(shakingThreshold: number): void;

    export function silentReport(
        description: string,
        files: Array<ShakeFile>,
        configuration: ShakeReportConfiguration
    ): void;

    export function log(logLevel: LogLevel, message: string): void;

    export function setMetadata(key: string, value: string): void;

    export function addPrivateView(viewRef: object): void;

    export function removePrivateView(viewRef: object): void;

    export function clearPrivateViews(): void;

    export function showNotificationsSettings(): void;

    export class ShakeReportConfiguration {
        blackBoxData: boolean;
        activityHistoryData: boolean;
        screenshot: boolean;
        showReportSentMessage: boolean;
    }

    export class NotificationEvent {
        id: string;
        title: string;
        description: string;
    }

    export class NetworkRequest {
        url: string;
        method: string;
        requestBody: string;
        responseBody: string;
        requestHeaders: object;
        responseHeaders: object;
        statusCode: string;
        duration: number;
        timestamp: string;
    }

    export class NotificationEventBuilder {
        getId: () => string;
        setId: (id: string) => NotificationEventBuilder;
        getTitle: () => string;
        setTitle: (title: string) => NotificationEventBuilder;
        getDescription: () => string;
        setDescription: (description: string) => NotificationEventBuilder;
        build: () => NotificationEvent;
    }

    export class NetworkRequestBuilder {
        getUrl: () => string;
        setUrl: (url: string) => NetworkRequestBuilder;
        getMethod: () => string;
        setMethod: (method: string) => NetworkRequestBuilder;
        getRequestBody: () => string;
        setRequestBody: (requestBody: string) => NetworkRequestBuilder;
        getResponseBody: () => string;
        setResponseBody: (responseBody: string) => NetworkRequestBuilder;
        getRequestHeaders: () => object;
        setRequestHeaders: (requestHeaders: object) => NetworkRequestBuilder;
        getResponseHeaders: () => object;
        setResponseHeaders: (responseHeaders: object) => NetworkRequestBuilder;
        getStatusCode: () => string;
        setStatusCode: (statusCode: string) => NetworkRequestBuilder;
        getDuration: () => string;
        setDuration: (duration: number) => NetworkRequestBuilder;
        getDate: () => Date;
        setDate: (date: Date) => NetworkRequestBuilder;
        build: () => NetworkRequest;
    }

    export class ShakeFile {
        name: string;
        path: string;
    }

    export namespace ShakeFile {
        function create(filePath: string, fileName?: string): ShakeFile;
    }

    export class LogLevel {
        static VERBOSE: LogLevel;
        static DEBUG: LogLevel;
        static INFO: LogLevel;
        static WARN: LogLevel;
        static ERROR: LogLevel;
        value: string;
    }
}
