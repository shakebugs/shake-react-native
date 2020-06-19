package com.shakebugs.react;

import android.app.Activity;
import android.app.Application;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.shakebugs.react.db.SqliteDatabase;
import com.shakebugs.react.utils.Mapper;
import com.shakebugs.react.utils.Permissions;
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.ShakeInvocationEvent;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeReportData;

import java.util.List;

import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

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

                checkScreenshotPermissions(invocationEvents);
            }
        });
    }

    /**
     * This is introduced as fix because SDK 9.0.3 requests permissions just on activity start
     *
     * @param invocationEvents invocation events to set
     */
    private void checkScreenshotPermissions(ShakeInvocationEvent[] invocationEvents) {
        for (ShakeInvocationEvent event : invocationEvents) {
            if (event.equals(ShakeInvocationEvent.SCREENSHOT)) {
                Permissions.requestPermissions(getCurrentActivity(),
                        new String[]{READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE});
                return;
            }
        }
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
