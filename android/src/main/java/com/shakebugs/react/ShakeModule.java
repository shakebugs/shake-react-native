package com.shakebugs.react;


import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.shakebugs.react.utils.Constants;
import com.shakebugs.react.utils.Emitter;
import com.shakebugs.react.utils.Logger;
import com.shakebugs.react.utils.Mapper;
import com.shakebugs.shake.LogLevel;
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.ShakeInfo;
import com.shakebugs.shake.ShakeReportConfiguration;
import com.shakebugs.shake.ShakeScreen;
import com.shakebugs.shake.actions.ShakeHomeAction;
import com.shakebugs.shake.chat.ChatNotification;
import com.shakebugs.shake.chat.UnreadChatMessagesListener;
import com.shakebugs.shake.form.ShakeForm;
import com.shakebugs.shake.internal.domain.models.NetworkRequest;
import com.shakebugs.shake.internal.domain.models.NotificationEvent;
import com.shakebugs.shake.privacy.NotificationEventEditor;
import com.shakebugs.shake.privacy.NotificationEventsFilter;
import com.shakebugs.shake.report.ShakeDismissListener;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeOpenListener;
import com.shakebugs.shake.report.ShakeReportData;
import com.shakebugs.shake.report.ShakeSubmitListener;
import com.shakebugs.shake.theme.ShakeTheme;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kotlin.Unit;
import kotlin.jvm.functions.Function0;

/**
 * Shake SDK native bridge.
 */
public class ShakeModule extends ReactContextBaseJavaModule {
    private final Mapper mapper;
    private final Emitter emitter;

    public ShakeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mapper = new Mapper(reactContext);
        this.emitter = new Emitter(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "RNShake";
    }

    /**
     * Passed to the native SDK to distinguish native and React Native apps.
     *
     * @return platform info
     */
    private ShakeInfo buildShakePlatformInfo() {
        ShakeInfo platformInfo = new ShakeInfo();
        platformInfo.setPlatform(Constants.PLATFORM);
        platformInfo.setVersionCode(Constants.VERSION_CODE);
        platformInfo.setVersionName(Constants.VERSION_NAME);

        return platformInfo;
    }

    @ReactMethod
    public void start(final String apiKey, final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeReflection.setShakeInfo(buildShakePlatformInfo());

                Activity activity = getCurrentActivity();
                if (activity != null) {
                    ShakeReflection.start(activity, apiKey);
                } else {
                    Application app = (Application) getReactApplicationContext().getApplicationContext();
                    Shake.start(app, apiKey);
                }

                startShakeCallbacksEmitter();

                promise.resolve(null);
            }
        });
    }

    @ReactMethod
    public void show() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.show();
            }
        });
    }

    @ReactMethod
    public void show(final ReadableMap shakeScreenMap) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeScreen shakeScreen = mapper.mapToShakeScreen(shakeScreenMap);
                Shake.show(shakeScreen);
            }
        });
    }

    @ReactMethod
    public void getShakeForm(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeForm shakeForm = Shake.getReportConfiguration().getShakeForm();
                WritableMap shakeFormMap = mapper.mapShakeFormToMap(shakeForm);
                promise.resolve(shakeFormMap);
            }
        });
    }

    @ReactMethod
    public void setShakeForm(final ReadableMap shakeFormMap) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeForm shakeForm = mapper.mapMapToShakeForm(shakeFormMap);
                Shake.getReportConfiguration().setShakeForm(shakeForm);
            }
        });
    }

    @ReactMethod
    public void setShakeTheme(final ReadableMap shakeThemeMap) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeTheme shakeTheme = mapper.mapMapToShakeTheme(shakeThemeMap);
                Shake.getReportConfiguration().setTheme(shakeTheme);
            }
        });
    }

    @ReactMethod
    public void setHomeSubtitle(final String subtitle) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setHomeSubtitleValue(subtitle);
            }
        });
    }

    @ReactMethod
    public void setHomeActions(final ReadableArray array) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ArrayList<ShakeHomeAction> actions = mapper.mapArrayToHomeActions(array);
                for (final ShakeHomeAction action : actions) {
                    action.setHandler(new Function0<Unit>() {
                        @Override
                        public Unit invoke() {
                            emitter.sendEvent(Emitter.EVENT_HOME_ACTION_TAP, action.getTitleValue());
                            return null;
                        }
                    });
                }
                Shake.getReportConfiguration().setHomeActions(actions);
            }
        });
    }

    @ReactMethod
    public void isUserFeedbackEnabled(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.isUserFeedbackEnabled());
            }
        });
    }

    @ReactMethod
    public void setUserFeedbackEnabled(final boolean enabled) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setUserFeedbackEnabled(enabled);
            }
        });
    }

    @ReactMethod
    public void isEnableBlackBox(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isEnableBlackBox());
            }
        });
    }

    @ReactMethod
    public void setEnableBlackBox(final boolean enableBlackBox) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableBlackBox(enableBlackBox);
            }
        });
    }

    @ReactMethod
    public void isEnableActivityHistory(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isEnableActivityHistory());
            }
        });
    }

    @ReactMethod
    public void setEnableActivityHistory(final boolean enableActivityHistory) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableActivityHistory(enableActivityHistory);
            }
        });
    }

    @ReactMethod
    public void isShowFloatingReportButton(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isShowFloatingReportButton());
            }
        });
    }

    @ReactMethod
    public void setShowFloatingReportButton(final boolean showFloatingReportButton) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setShowFloatingReportButton(showFloatingReportButton);
            }
        });
    }

    @ReactMethod
    public void isInvokeShakeOnShakeDeviceEvent(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnShakeDeviceEvent());
            }
        });
    }

    @ReactMethod
    public void setInvokeShakeOnShakeDeviceEvent(final boolean invokeOnShake) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setInvokeShakeOnShakeDeviceEvent(invokeOnShake);
            }
        });
    }

    @ReactMethod
    public void isInvokeShakeOnScreenshot(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnScreenshot());
            }
        });
    }

    @ReactMethod
    public void setInvokeShakeOnScreenshot(final boolean invokeOnScreenshot) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setInvokeShakeOnScreenshot(invokeOnScreenshot);
            }
        });
    }

    @ReactMethod
    public void getDefaultScreen(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().getDefaultScreen().toString());
            }
        });
    }

    @ReactMethod
    public void setDefaultScreen(final ReadableMap shakeScreenMap) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeScreen shakeScreen = mapper.mapToShakeScreen(shakeScreenMap);
                Shake.getReportConfiguration().setDefaultScreen(shakeScreen);
            }
        });
    }

    @ReactMethod
    public void isScreenshotIncluded(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isScreenshotIncluded());
            }
        });
    }

    @ReactMethod
    public void setScreenshotIncluded(final boolean isScreenshotIncluded) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setScreenshotIncluded(isScreenshotIncluded);
            }
        });
    }

    @ReactMethod
    public void getShakingThreshold(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().getShakingThreshold());
            }
        });
    }

    @ReactMethod
    public void setShakingThreshold(final int shakingThreshold) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setShakingThreshold(shakingThreshold);
            }
        });
    }

    @ReactMethod
    public void getShowIntroMessage(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getShowIntroMessage());
            }
        });
    }

    @ReactMethod
    public void setShowIntroMessage(final boolean showIntroMessage) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setShowIntroMessage(showIntroMessage);
            }
        });
    }

    @ReactMethod
    public void isAutoVideoRecording(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isAutoVideoRecording());
            }
        });
    }

    @ReactMethod
    public void setAutoVideoRecording(final boolean videoRecordingEnabled) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setAutoVideoRecording(videoRecordingEnabled);
            }
        });
    }

    @ReactMethod
    public void isConsoleLogsEnabled(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isConsoleLogsEnabled());
            }
        });
    }

    @ReactMethod
    public void setConsoleLogsEnabled(final boolean consoleLogsEnabled) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setConsoleLogsEnabled(consoleLogsEnabled);
            }
        });
    }

    @ReactMethod
    public void log(final ReadableMap logLevelMap, final String message) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                LogLevel logLevel = mapper.mapToLogLevel(logLevelMap);
                Shake.log(logLevel, message);
            }
        });
    }

    @ReactMethod
    public void setMetadata(final String key, final String value) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setMetadata(key, value);
            }
        });
    }

    @ReactMethod
    public void clearMetadata() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.clearMetadata();
            }
        });
    }

    @ReactMethod
    public void setShakeReportData(final ReadableArray filesArray) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.onPrepareData(new ShakeReportData() {
                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return mapper.mapArrayToShakeFiles(filesArray);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void silentReport(final String description, final ReadableArray filesArray, final ReadableMap configurationMap) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ShakeReportConfiguration configuration = mapper.mapToConfiguration(configurationMap);
                ShakeReportData shakeReportData = new ShakeReportData() {
                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return mapper.mapArrayToShakeFiles(filesArray);
                    }
                };

                Shake.silentReport(description, shakeReportData, configuration);
            }
        });
    }

    @ReactMethod
    public void insertNetworkRequest(final ReadableMap data) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                NetworkRequest networkRequest = mapper.mapToNetworkRequest(data);
                ShakeReflection.insertNetworkRequest(networkRequest);
            }
        });
    }

    @ReactMethod
    public void insertNotificationEvent(final ReadableMap data) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                NotificationEvent notificationEvent = mapper.mapToNotificationEvent(data);
                ShakeReflection.insertNotificationEvent(notificationEvent);
            }
        });
    }

    @ReactMethod
    public void addPrivateView(final double id) {
        try {
            UIManagerModule uiManagerModule = getReactApplicationContext().getNativeModule(UIManagerModule.class);
            if (uiManagerModule != null) {
                uiManagerModule.prependUIBlock(new UIBlock() {
                    @Override
                    public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                        final View view = nativeViewHierarchyManager.resolveView((int) id);
                        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
                            @Override
                            public void run() {
                                Shake.addPrivateView(view);
                            }
                        });
                    }
                });
            }
        } catch (Exception e) {
            Logger.d("Failed to add private view.", e);
        }
    }

    @ReactMethod
    public void removePrivateView(final double id) {
        try {
            UIManagerModule uiManagerModule = getReactApplicationContext().getNativeModule(UIManagerModule.class);
            if (uiManagerModule != null) {
                uiManagerModule.prependUIBlock(new UIBlock() {
                    @Override
                    public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                        final View view = nativeViewHierarchyManager.resolveView((int) id);
                        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
                            @Override
                            public void run() {
                                Shake.removePrivateView(view);
                            }
                        });
                    }
                });
            }
        } catch (Exception e) {
            Logger.d("Failed to remove private view.", e);
        }
    }

    @ReactMethod
    public void clearPrivateViews() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.clearPrivateViews();
            }
        });
    }

    @ReactMethod
    public void isSensitiveDataRedactionEnabled(final Promise promise) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                promise.resolve(Shake.getReportConfiguration().isSensitiveDataRedactionEnabled());
            }
        });
    }

    @ReactMethod
    public void setSensitiveDataRedactionEnabled(final boolean sensitiveDataRedactionEnabled) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setSensitiveDataRedactionEnabled(sensitiveDataRedactionEnabled);
            }
        });
    }

    @ReactMethod
    public void startNotificationsEmitter() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setNotificationEventsFilter(new NotificationEventsFilter() {
                    @Override
                    public NotificationEventEditor filter(NotificationEventEditor notificationEventEditor) {
                        WritableMap map = mapper.notificationEventToMap(notificationEventEditor.build());
                        emitter.sendEvent(Emitter.EVENT_NOTIFICATION, map);
                        return null;
                    }
                });
            }
        });
    }

    @ReactMethod
    public void stopNotificationsEmitter() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setNotificationEventsFilter(null);
            }
        });
    }

    @ReactMethod
    public void startUnreadChatMessagesEmitter() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setUnreadChatMessagesListener(new UnreadChatMessagesListener() {
                    @Override
                    public void onUnreadMessagesCountChanged(int count) {
                        emitter.sendEvent(Emitter.EVENT_UNREAD_MESSAGES, count);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void stopUnreadChatMessagesEmitter() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setUnreadChatMessagesListener(null);
            }
        });
    }

    @ReactMethod
    public void showNotificationsSettings() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Activity activity = getCurrentActivity();
                if (activity != null) {
                    activity.startActivity(new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS"));
                }
            }
        });
    }

    @ReactMethod
    public void registerUser(final String id) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.registerUser(id);
            }
        });
    }

    @ReactMethod
    public void updateUserId(final String id) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.updateUserId(id);
            }
        });
    }

    @ReactMethod
    public void updateUserMetadata(final ReadableMap metadataMap) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Map<String, String> metadata = mapper.mapToUserMetadata(metadataMap);
                Shake.updateUserMetadata(metadata);
            }
        });
    }

    @ReactMethod
    public void unregisterUser() {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.unregisterUser();
            }
        });
    }

    @ReactMethod
    public void setPushNotificationsToken(final String token) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Shake.setPushNotificationsToken(token);
            }
        });
    }

    @ReactMethod
    public void showChatNotification(final ReadableMap notificationData) {
        getReactApplicationContext().runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ChatNotification chatNotification = mapper.mapToChatNotification(notificationData);
                Shake.showChatNotification(chatNotification);
            }
        });
    }

    @ReactMethod
    public void setTags(final ReadableArray tagsArray) {
        Shake.getReportConfiguration().setTags(mapper.mapToTagsList(tagsArray));
    }

    /*
     * Callbacks starters.
     */
    private void startShakeCallbacksEmitter() {
        Shake.getReportConfiguration().setShakeOpenListener(new ShakeOpenListener() {
            @Override
            public void onShakeOpen() {
                emitter.sendEvent(Emitter.EVENT_SHAKE_OPEN, "open");
            }
        });
        Shake.getReportConfiguration().setShakeDismissListener(new ShakeDismissListener() {
            @Override
            public void onShakeDismiss() {
                emitter.sendEvent(Emitter.EVENT_SHAKE_DISMISS, "dismiss");
            }
        });
        Shake.getReportConfiguration().setShakeSubmitListener(new ShakeSubmitListener() {
            @Override
            public void onShakeSubmit(@NonNull String type, @NonNull Map<String, String> fields) {
                WritableMap fieldsMap = new WritableNativeMap();
                for (Map.Entry<String, String> entry : fields.entrySet()) {
                    fieldsMap.putString(entry.getKey(), entry.getValue());
                }

                WritableMap eventData = new WritableNativeMap();
                eventData.putString("type", type);
                eventData.putMap("fields", fieldsMap);

                emitter.sendEvent(Emitter.EVENT_SHAKE_SUBMIT, eventData);
            }
        });
    }

    /*
     * Ignored. Required for RN built in Event emitter Calls.
     */
    @ReactMethod
    public void addListener(String eventName) {
    }

    @ReactMethod
    public void removeListeners(Integer count) {
    }
}
