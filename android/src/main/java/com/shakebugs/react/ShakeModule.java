package com.shakebugs.react;

import android.app.Activity;
import android.app.Application;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.shakebugs.react.db.SqliteDatabase;
import com.shakebugs.react.utils.Mapper;
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeReportData;

import java.util.List;

public class ShakeModule extends ReactContextBaseJavaModule {
    private final Application application;

    public ShakeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.application = (Application) reactContext.getApplicationContext();
    }

    @Override
    public String getName() {
        return "Shake";
    }

    @ReactMethod
    public void start() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.start(application);
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
    public void setInvokeShakeOnShaking(final boolean invokeOnShake) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.getReportConfiguration().setInvokeShakeOnShakeDeviceEvent(invokeOnShake);
            }
        });
    }

    @ReactMethod
    public void isInvokeShakeOnShaking(Promise promise) {
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
    public void setShakeReportData(final ReadableArray filesArray, final String quickFacts) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                final List<ShakeFile> shakeFiles = Mapper.mapToShakeFiles(filesArray);
                Shake.onPrepareData(new ShakeReportData() {
                    @Override
                    public String quickFacts() {
                        return quickFacts;
                    }

                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return shakeFiles;
                    }
                });
            }
        });
    }

    @ReactMethod
    public void silentReport(final String description, final ReadableArray filesArray,
                             final String quickFacts, final ReadableMap configurationMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.silentReport(description, new ShakeReportData() {
                    @Override
                    public String quickFacts() {
                        return quickFacts;
                    }

                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return Mapper.mapToShakeFiles(filesArray);
                    }
                }, Mapper.mapToConfiguration(configurationMap));

            }
        });
    }

    @ReactMethod
    public void insertNetworkRequest(ReadableMap networkRequestMap) {
        NetworkRequest networkRequest = Mapper.mapToNetworkRequest(networkRequestMap);
        SqliteDatabase.insertNetworkRequest(application, networkRequest);
    }

    private void runOnUiThread(Runnable runnable) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(runnable);
        }
    }
}
