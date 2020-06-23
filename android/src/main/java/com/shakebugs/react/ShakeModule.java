package com.shakebugs.react;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.shakebugs.react.db.SqliteDatabase;
import com.shakebugs.react.utils.Mapper;
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.ShakeInvocationEvent;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeReportData;

import java.util.List;

public class ShakeModule extends ReactContextBaseJavaModule {
    private final Application application;

    public ShakeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.application = (Application) reactContext.getApplicationContext();
        SharedPreferences preferences = this.application.getSharedPreferences("SHAKE_PREFS_NAME", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString("SHAKE_SDK_PLATFORM",BuildConfig.SHAKE_SDK_PLATFORM);
        editor.putString("SHAKE_SDK_VERSION_NAME",BuildConfig.SHAKE_SDK_VERSION_NAME);
        editor.putString("SHAKE_SDK_VERSION_CODE",BuildConfig.SHAKE_SDK_VERSION_CODE);
        editor.apply();
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
    public void stop() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.stop();
            }
        });
    }

    @ReactMethod
    public void setInvocationEvents(final ReadableArray stringList) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ShakeInvocationEvent[] invocationEvents = Mapper.mapToShakeInvocationEvents(stringList);
                Shake.setInvocationEvents(invocationEvents);
            }
        });
    }

    @ReactMethod
    public void setBlackBoxEnabled(final boolean blackBoxEnabled) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setBlackboxEnabled(blackBoxEnabled);
            }
        });
    }

    @ReactMethod
    public void setQuickFacts(final String quickFacts) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.setQuickFacts(quickFacts);
            }
        });
    }

    @ReactMethod
    public void attachFiles(final ReadableArray filesArray) {
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
    public void attachFilesWithName(final ReadableMap filesMap) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                final List<ShakeFile> shakeFiles = Mapper.mapToShakeFiles(filesMap);
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
