package com.shakebugs.react;

import android.app.Activity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.shakebugs.react.utils.Constants;
import com.shakebugs.react.utils.Logger;
import com.shakebugs.react.utils.Mapper;
import com.shakebugs.react.utils.Reflection;
import com.shakebugs.shake.LogLevel;
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.ShakeInfo;
import com.shakebugs.shake.ShakeReportConfiguration;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeReportData;

import java.lang.reflect.Method;
import java.util.List;

public class ShakeModule extends ReactContextBaseJavaModule {
    public ShakeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNShake";
    }

    @ReactMethod
    public void start(final String clientId, final String clientSecret) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Activity activity = getCurrentActivity();
                    if (activity == null) {
                        Logger.e("Activity not initialized.");
                        return;
                    }

                    Method setShakeInfo = Reflection.getMethod(Class.forName("com.shakebugs.shake.Shake"),
                            "setShakeInfo", ShakeInfo.class);
                    Method startFromActivity = Reflection.getMethod(Class.forName("com.shakebugs.shake.Shake"),
                            "startFromActivity", Activity.class, String.class, String.class);

                    if (setShakeInfo == null) {
                        Logger.e("setShakeInfo() method not found.");
                        return;
                    }
                    if (startFromActivity == null) {
                        Logger.e("startFromActivity() method not found.");
                        return;
                    }

                    ShakeInfo shakeInfo = new ShakeInfo();
                    shakeInfo.setPlatform(Constants.PLATFORM);
                    shakeInfo.setVersionCode(Constants.VERSION_CODE);
                    shakeInfo.setVersionName(Constants.VERSION_NAME);

                    setShakeInfo.invoke(null, shakeInfo);
                    startFromActivity.invoke(null, activity, clientId, clientSecret);
                } catch (Exception e) {
                    Logger.e("Failed to start Shake", e);
                }
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
    public void setEnabled(final boolean enabled) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setEnabled(enabled);
            }
        });
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
    public void isEnableBlackBox(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableBlackBox());
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
    public void isEnableActivityHistory(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableActivityHistory());
    }

    @ReactMethod
    public void setEnableInspectScreen(final boolean enableInspectScreen) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableInspectScreen(enableInspectScreen);
            }
        });
    }

    @ReactMethod
    public void isEnableInspectScreen(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableInspectScreen());
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
    public void isShowFloatingReportButton(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isShowFloatingReportButton());
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
    public void isInvokeShakeOnShakeDeviceEvent(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnShakeDeviceEvent());
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
    public void isInvokeShakeOnScreenshot(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnScreenshot());
    }

    @ReactMethod
    public void setInvokeShakeOnRightEdgePan(final boolean invokeOnRightEdgePan) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setInvokeShakeOnRightEdgePan(invokeOnRightEdgePan);
            }
        });
    }

    @ReactMethod
    public void isInvokeShakeOnRightEdgePan(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isInvokeShakeOnRightEdgePan());
    }

    @ReactMethod
    public void getEmailField(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().getEmailField());
    }

    @ReactMethod
    public void setEmailField(final String emailField) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEmailField(emailField);
            }
        });
    }

    @ReactMethod
    public void isEnableEmailField(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableEmailField());
    }

    @ReactMethod
    public void setEnableEmailField(final boolean enableEmailField) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableEmailField(enableEmailField);
            }
        });
    }

    @ReactMethod
    public void isEnableMultipleFeedbackTypes(Promise promise) {
        promise.resolve(Shake.getReportConfiguration().isEnableMultipleFeedbackTypes());
    }

    @ReactMethod
    public void setEnableMultipleFeedbackTypes(final boolean enableFeedbackTypes) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setEnableMultipleFeedbackTypes(enableFeedbackTypes);
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
                LogLevel logLevel = Mapper.mapToLogLevel(logLevelMap);
                if (logLevel != null) {
                    Shake.log(logLevel, message);
                }
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
    public void setShakeReportData(final ReadableArray filesArray) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                final List<ShakeFile> shakeFiles = Mapper.mapToShakeFiles(filesArray);
                Shake.onPrepareData(new ShakeReportData() {
                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return shakeFiles;
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
                ShakeReportConfiguration configuration = Mapper.mapToConfiguration(configurationMap);
                ShakeReportData shakeReportData = new ShakeReportData() {
                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return Mapper.mapToShakeFiles(filesArray);
                    }
                };

                Shake.silentReport(description, shakeReportData, configuration);
            }
        });
    }

    @ReactMethod
    public void insertNetworkRequest(final ReadableMap data) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                NetworkRequest networkRequest = Mapper.mapToNetworkRequest(data);
                Shake.insertNetworkRequest(networkRequest);
            }
        });
    }

    private void runOnUiThread(Runnable runnable) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(runnable);
        }
    }
}
