declare module "react-native-shake" {
    export function start(apiKey: string): Promise<void>;

    export function show(): void;

    export function show(shakeScreen: ShakeScreen): void;

    export function setUserFeedbackEnabled(enabled: boolean): void;

    export function isUserFeedbackEnabled(): Promise<boolean>;

    export function setEnableActivityHistory(activityHistoryEnabled: boolean): void;

    export function isEnableActivityHistory(): Promise<boolean>;

    export function setEnableBlackBox(blackBoxEnabled: boolean): void;

    export function isEnableBlackBox(): Promise<boolean>;

    export function setShowFloatingReportButton(floatingButtonEnabled: boolean): void;

    export function isShowFloatingReportButton(): Promise<boolean>;

    export function setInvokeShakeOnShakeDeviceEvent(shakeInvokeEnabled: boolean): void;

    export function isInvokeShakeOnShakeDeviceEvent(): Promise<boolean>;

    export function setInvokeShakeOnScreenshot(screenshotInvokeEnabled: boolean): void;

    export function isInvokeShakeOnScreenshot(): Promise<boolean>;

    export function getDefaultScreen(): Promise<ShakeScreen>;

    export function setDefaultScreen(shakeScreen: ShakeScreen): void;

    export function getShakeForm(): Promise<ShakeForm>;

    export function setShakeForm(shakeForm?: ShakeForm): void;

    export function setShakeTheme(shakeTheme: ShakeTheme): void;

    export function setHomeSubtitle(subtitle: String): void;

    export function setHomeActions(actions: Array<ShakeBaseAction>): void;

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
        filter?: (requestBuilder: NetworkRequestBuilder) => NetworkRequestBuilder
    ): void;

    export function insertNotificationEvent(notificationBuilder: NotificationEventBuilder): void;

    export function setNotificationEventsFilter(
        filter?: (notificationBuilder: NotificationEventBuilder) => NotificationEventBuilder
    ): void;

    export function setUnreadMessagesListener(
        listener?: (count: number) => void
    ): void;

    export function setShakeOpenListener(
        listener?: () => void
    ): void;

    export function setShakeDismissListener(
        listener?: () => void
    ): void;

    export function setShakeSubmitListener(
        listener?: (type: string, fields: { [key: string]: string; } ) => void
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

    export function setMetadata(key: string, value: string | null | undefined): void;

    export function clearMetadata(): void;

    export function addPrivateView(viewRef: object): void;

    export function removePrivateView(viewRef: object): void;

    export function clearPrivateViews(): void;

    export function showNotificationsSettings(): void;

    export function registerUser(id: string): void;

    export function updateUserId(id: string): void;

    export function updateUserMetadata(metadata: object): void;

    export function unregisterUser(): void;

    export function setPushNotificationsToken(token: string): void;

    export function showChatNotification(data: { [key: string]: string }): void;

    export function setTags(tags: Array<String>): void;

    export class ShakeReportConfiguration {
        blackBoxData: boolean;
        activityHistoryData: boolean;
        screenshot: boolean;
        video: boolean
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
        getRequestHeaders: () => { [key: string]: string };
        setRequestHeaders: (requestHeaders: { [key: string]: string }) => NetworkRequestBuilder;
        getResponseHeaders: () => { [key: string]: string };
        setResponseHeaders: (responseHeaders: { [key: string]: string }) => NetworkRequestBuilder;
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

    export class ShakeScreen {
        static HOME: ShakeScreen;
        static NEW: ShakeScreen;
        static CHAT: ShakeScreen;
        value: string;
    }

    export class ShakeForm {
        components: Array<ShakeFormComponent>;
        constructor(components: Array<ShakeFormComponent>);
    }

    export class ShakeTheme {
        fontFamilyMedium: string | null;

        fontFamilyBold: string | null;

        backgroundColor: string | null;

        secondaryBackgroundColor: string | null;

        textColor: string | null;

        secondaryTextColor: string | null;

        accentColor: string | null;

        accentTextColor: string | null;

        outlineColor: string | null;

        borderRadius: number | null;

        elevation: number | null;

        shadowOffset: { width: number, height: number } | null;

        shadowOpacity: number | null;

        shadowRadius: number | null;

        constructor();
    }

    export class ShakeFormComponent {
        type: string;
        constructor(type: string);
    }

    export class ShakeTitle extends ShakeFormComponent {
        key: string;
        label: string | null;
        labelRes: string | null;
        initialValue: string | null;
        required: boolean;

        constructor(key: string, label: string, initialValue?: string | null, required?: boolean);
    }

    export class ShakeTextInput extends ShakeFormComponent {
        key: string;
        label: string | null;
        labelRes: string | null;
        initialValue: string | null;
        required: boolean;

        constructor(key: string, label: string, initialValue?: string | null, required?: boolean);
    }

    export class ShakeEmail extends ShakeFormComponent {
        key: string;
        label: string | null;
        labelRes: string | null;
        initialValue: string | null;
        required: boolean;

        constructor(key: string, label: string, initialValue?: string | null, required?: boolean);
    }

    export class ShakePicker extends ShakeFormComponent {
        key: string;
        label: string | null;
        labelRes: string | null;
        items: Array<ShakePickerItem>;

        constructor(key: string, label: string, items: Array<ShakePickerItem>);
    }

    export class ShakePickerItem {
        key: string;
        text: string | null;
        textRes: string | null;
        icon: string | null;
        iconRes: string | null;
        tag: string | null;

        constructor(key: string, text: string, icon?: string | null, tag?: string | null);
    }

    export class ShakeAttachments extends ShakeFormComponent {
        constructor();
    }

    export class ShakeInspectButton extends ShakeFormComponent{
        constructor();
    }

    export class ShakeBaseAction {
        type: string;

        constructor(type: string)
    }

    export class ShakeHomeAction extends ShakeBaseAction {
        title: string | null;
        titleRes: string | null;
        subtitle: string | null;
        subtitleRes: string | null;
        icon: string | null;
        iconRes: string | null;
        handler: ()=>void | null;

        constructor(title: string, subtitle?: string | null, icon?: string | null, handler?: ()=>void | null);
    }

    export class ShakeChatAction extends ShakeBaseAction {
        constructor(title?: string | null, subtitle?: string | null, icon?: string | null);
    }

    export class ShakeSubmitAction extends ShakeBaseAction {
        constructor(title?: string | null, subtitle?: string | null, icon?: string | null);
    }
}
