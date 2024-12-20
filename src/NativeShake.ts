import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  start(apiKey: string): Promise<void>;

  show(shakeScreen: ShakeScreen): void;

  getShakeForm(): ShakeForm;

  setShakeForm(shakeForm: ShakeForm): void;

  setShakeTheme(shakeTheme: ShakeTheme): void;

  setHomeSubtitle(subtitle: string): void;

  setHomeActions(actions: ShakeBaseAction[]): void;

  isUserFeedbackEnabled(): boolean;

  setUserFeedbackEnabled(enabled: boolean): void;

  isEnableBlackBox(): boolean;

  setEnableBlackBox(enabled: boolean): void;

  isEnableActivityHistory(): boolean;

  setEnableActivityHistory(enabled: boolean): void;

  isShowFloatingReportButton(): boolean;

  setShowFloatingReportButton(enabled: boolean): void;

  isInvokeShakeOnShakeDeviceEvent(): boolean;

  setInvokeShakeOnShakeDeviceEvent(enabled: boolean): void;

  isInvokeShakeOnScreenshot(): boolean;

  setInvokeShakeOnScreenshot(enabled: boolean): void;

  getDefaultScreen(): ShakeScreen;

  setDefaultScreen(shakeScreen: ShakeScreen): void;

  isScreenshotIncluded(): boolean;

  setScreenshotIncluded(enabled: boolean): void;

  getShakingThreshold(): number;

  setShakingThreshold(threshold: number): void;

  getShowIntroMessage(): boolean;

  setShowIntroMessage(show: boolean): void;

  isAutoVideoRecording(): boolean;

  setAutoVideoRecording(enabled: boolean): void;

  isConsoleLogsEnabled(): boolean;

  setConsoleLogsEnabled(enabled: boolean): void;

  log(logLevel: LogLevel, message: string): void;

  setMetadata(key: string, value: string): void;

  clearMetadata(): void;

  setShakeReportData(files: ShakeFile[]): void;

  silentReport(
    description: string,
    files: ShakeFile[],
    configuration: ShakeReportConfiguration
  ): void;

  insertNetworkRequest(data: NetworkRequest): void;

  insertNotificationEvent(data: NotificationEvent): void;

  addPrivateView(id: number): void;

  removePrivateView(id: number): void;

  clearPrivateViews(): void;

  isSensitiveDataRedactionEnabled(): boolean;

  setSensitiveDataRedactionEnabled(enabled: boolean): void;

  startNotificationsEmitter(): void;

  stopNotificationsEmitter(): void;

  showNotificationsSettings(): void;

  startUnreadChatMessagesEmitter(): void;

  stopUnreadChatMessagesEmitter(): void;

  registerUser(id: string): void;

  updateUserId(id: string): void;

  updateUserMetadata(metadata: { [key: string]: string }): void;

  unregisterUser(): void;

  setPushNotificationsToken(token: string | null): void;

  showChatNotification(notification: ChatNotification): void;

  setTags(tags: string[]): void;

  addListener: (eventType: string) => void;

  removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Shake');

// Codegen throws error when importing other files.
// Keep types here until this issue is fixed.

interface ShakeScreen {
  value: string;
}

interface ShakeForm {
  components: ShakeFormComponent[];
}

interface ShakeFormComponent {
  type: string;
  key: string;
  label: string | null;
  labelRes: string | null;
  initialValue: string;
  required: boolean;
  items: ShakePickerItem[] | null;
}

interface ShakePickerItem extends ShakeFormComponent {
  key: string;
  text: string | null;
  textRes: string | null;
  icon: string | null;
  iconRes: string | null;
  tag: string | null;
}

interface ShakeTheme {
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
  shadowRadius: number | null;
  shadowOpacity: number | null;
  shadowOffset: { [key: string]: string } | null;
}

interface ShakeBaseAction {
  title: string | null;
  titleRes: string | null;
  subtitle: string | null;
  subtitleRes: string | null;
  icon: string | null;
  iconRes: string | null;
  handler: (() => void) | null;
  type: string;
}

interface LogLevel {
  value: string;
}

interface ShakeFile {
  name: string;
  path: string;
}

interface ShakeReportConfiguration {
  blackBoxData: boolean;
  activityHistoryData: boolean;
  screenshot: boolean;
  video: boolean;
  showReportSentMessage: boolean;
}

interface NetworkRequest {
  url: string;
  method: string;
  requestBody: string;
  responseBody: string;
  requestHeaders: { [key: string]: string };
  responseHeaders: { [key: string]: string };
  statusCode: string;
  duration: number;
  timestamp: string;
}

interface NotificationEvent {
  id: string;
  title: string;
  description: string;
}

interface ChatNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
}
