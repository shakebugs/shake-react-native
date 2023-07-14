package com.shakebugs.react;

import android.app.Activity;
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
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeReportData;
import com.shakebugs.shake.theme.ShakeTheme;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @ReactMethod
    public void start(final String clientId, final String clientSecret) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Activity activity = getCurrentActivity();
                if (activity == null) {
                    Logger.e("Activity not initialized.");
                    return;
                }

                ShakeInfo shakeInfo = new ShakeInfo();
                shakeInfo.setPlatform(Constants.PLATFORM);
                shakeInfo.setVersionCode(Constants.VERSION_CODE);
                shakeInfo.setVersionName(Constants.VERSION_NAME);

                ShakeReflection.setShakeInfo(shakeInfo);
                ShakeReflection.start(activity, clientId, clientSecret);
            }
        });
    }

    @ReactMethod
    public void show() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.show();
            }
        });
    }

    @ReactMethod
    public void show(final ReadableMap shakeScreenMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ShakeScreen shakeScreen = mapper.mapToShakeScreen(shakeScreenMap);
                Shake.show(shakeScreen);
            }
        });
    }

    @ReactMethod
    public void getShakeForm(Promise promise) {
        ShakeForm shakeForm = Shake.getReportConfiguration().getShakeForm();
        WritableMap shakeFormMap = mapper.mapShakeFormToMap(shakeForm);
        promise.resolve(shakeFormMap);
    }

    @ReactMethod
    public void setShakeForm(final ReadableMap shakeFormMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ShakeForm shakeForm = mapper.mapMapToShakeForm(shakeFormMap);
                Shake.getReportConfiguration().setShakeForm(shakeForm);
            }
        });
    }

    @ReactMethod
    public void setShakeTheme(final ReadableMap shakeThemeMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ShakeTheme shakeTheme = mapper.mapMapToShakeTheme(shakeThemeMap);
                Shake.getReportConfiguration().setTheme(shakeTheme);
            }
        });
    }

    @ReactMethod
    public void setHomeSubtitle(final String subtitle) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setHomeSubtitleValue(subtitle);
            }
        });
    }

    @ReactMethod
    public void setHomeActions(final ReadableArray array) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ArrayList<ShakeHomeAction> actions = mapper.mapArrayToHomeActions(array);
                for (ShakeHomeAction action : actions) {
                    action.setHandler(() -> {
                        emitter.sendEvent(Emitter.EVENT_HOME_ACTION_TAP, action.getTitleValue());
                        return null;
                    });
                }
                Shake.getReportConfiguration().setHomeActions(actions);
            }
        });
    }

    @ReactMethod
    public void isUserFeedbackEnabled(Promise promise) {
        promise.resolve(Shake.isUserFeedbackEnabled());
    }

    @ReactMethod
    public void setUserFeedbackEnabled(final boolean enabled) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setUserFeedbackEnabled(enabled);
            }
        });
    }

    @ReactMethod
    public void isEnableBlackBox(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableBlackBox());
    }

    @ReactMethod
    public void setEnableBlackBox(final boolean enableBlackBox) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableBlackBox(enableBlackBox);
            }
        });
    }

    @ReactMethod
    public void isEnableActivityHistory(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableActivityHistory());
    }

    @ReactMethod
    public void setEnableActivityHistory(final boolean enableActivityHistory) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableActivityHistory(enableActivityHistory);
            }
        });
    }

    @ReactMethod
    public void isShowFloatingReportButton(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isShowFloatingReportButton());
    }

    @ReactMethod
    public void setShowFloatingReportButton(final boolean showFloatingReportButton) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setShowFloatingReportButton(showFloatingReportButton);
            }
        });
    }

    @ReactMethod
    public void isInvokeShakeOnShakeDeviceEvent(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnShakeDeviceEvent());
    }

    @ReactMethod
    public void setInvokeShakeOnShakeDeviceEvent(final boolean invokeOnShake) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setInvokeShakeOnShakeDeviceEvent(invokeOnShake);
            }
        });
    }

    @ReactMethod
    public void isInvokeShakeOnScreenshot(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnScreenshot());
    }

    @ReactMethod
    public void setInvokeShakeOnScreenshot(final boolean invokeOnScreenshot) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setInvokeShakeOnScreenshot(invokeOnScreenshot);
            }
        });
    }

    @ReactMethod
    public void getDefaultScreen(Promise promise) {
        ShakeScreen shakeScreen = Shake.getReportConfiguration().getDefaultScreen();
        String shakeScreenStr = shakeScreen.toString();

        promise.resolve(shakeScreenStr);
    }

    @ReactMethod
    public void setDefaultScreen(final ReadableMap shakeScreenMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ShakeScreen shakeScreen = mapper.mapToShakeScreen(shakeScreenMap);
                Shake.getReportConfiguration().setDefaultScreen(shakeScreen);
            }
        });
    }

    @ReactMethod
    public void isScreenshotIncluded(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isScreenshotIncluded());
    }

    @ReactMethod
    public void setScreenshotIncluded(final boolean isScreenshotIncluded) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setScreenshotIncluded(isScreenshotIncluded);
            }
        });
    }

    @ReactMethod
    public void getShakingThreshold(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().getShakingThreshold());
    }

    @ReactMethod
    public void setShakingThreshold(final int shakingThreshold) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setShakingThreshold(shakingThreshold);
            }
        });
    }

    @ReactMethod
    public void getShowIntroMessage(Promise promise) {
        promise.resolve(Shake.getShowIntroMessage());
    }

    @ReactMethod
    public void setShowIntroMessage(final boolean showIntroMessage) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setShowIntroMessage(showIntroMessage);
            }
        });
    }

    @ReactMethod
    public void isAutoVideoRecording(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isAutoVideoRecording());
    }

    @ReactMethod
    public void setAutoVideoRecording(final boolean videoRecordingEnabled) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setAutoVideoRecording(videoRecordingEnabled);
            }
        });
    }

    @ReactMethod
    public void isConsoleLogsEnabled(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isConsoleLogsEnabled());
    }

    @ReactMethod
    public void setConsoleLogsEnabled(final boolean consoleLogsEnabled) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setConsoleLogsEnabled(consoleLogsEnabled);
            }
        });
    }

    @ReactMethod
    public void log(final ReadableMap logLevelMap, final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                LogLevel logLevel = mapper.mapToLogLevel(logLevelMap);
                Shake.log(logLevel, message);

            }
        });
    }

    @ReactMethod
    public void setMetadata(final String key, final String value) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setMetadata(key, value);
            }
        });
    }

    @ReactMethod
    public void clearMetadata() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.clearMetadata();
            }
        });
    }

    @ReactMethod
    public void setShakeReportData(final ReadableArray filesArray) {
        runOnUiThread(new Runnable() {
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
        runOnUiThread(new Runnable() {
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
        NetworkRequest networkRequest = mapper.mapToNetworkRequest(data);
        ShakeReflection.insertNetworkRequest(networkRequest);
    }

    @ReactMethod
    public void insertNotificationEvent(final ReadableMap data) {
        NotificationEvent notificationEvent = mapper.mapToNotificationEvent(data);
        ShakeReflection.insertNotificationEvent(notificationEvent);
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
                        runOnUiThread(new Runnable() {
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
                        runOnUiThread(new Runnable() {
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
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.clearPrivateViews();
            }
        });
    }

    @ReactMethod
    public void isSensitiveDataRedactionEnabled(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isSensitiveDataRedactionEnabled());
    }

    @ReactMethod
    public void setSensitiveDataRedactionEnabled(final boolean sensitiveDataRedactionEnabled) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setSensitiveDataRedactionEnabled(sensitiveDataRedactionEnabled);
            }
        });
    }

    @ReactMethod
    public void startNotificationsEmitter() {
        runOnUiThread(new Runnable() {
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
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setNotificationEventsFilter(null);
            }
        });
    }

    @ReactMethod
    public void startUnreadChatMessagesEmitter() {
        runOnUiThread(new Runnable() {
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
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setUnreadChatMessagesListener(null);
            }
        });
    }

    @ReactMethod
    public void showNotificationsSettings() {
        runOnUiThread(new Runnable() {
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
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.registerUser(id);
            }
        });
    }

    @ReactMethod
    public void updateUserId(final String id) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.updateUserId(id);
            }
        });
    }

    @ReactMethod
    public void updateUserMetadata(final ReadableMap metadataMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Map<String, String> metadata = mapper.mapToUserMetadata(metadataMap);
                Shake.updateUserMetadata(metadata);
            }
        });
    }

    @ReactMethod
    public void unregisterUser() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.unregisterUser();
            }
        });
    }

    @ReactMethod
    public void setPushNotificationsToken(final String token) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setPushNotificationsToken(token);
            }
        });
    }

    @ReactMethod
    public void showChatNotification(final ReadableMap notificationData) {
        ChatNotification chatNotification = mapper.mapToChatNotification(notificationData);
        Shake.showChatNotification(chatNotification);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    private void runOnUiThread(Runnable runnable) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(runnable);
        }
    }
}
