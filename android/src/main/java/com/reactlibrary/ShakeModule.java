package com.reactlibrary;

import android.app.Activity;
import android.app.Application;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.reactlibrary.utils.Mapper;
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.ShakeInvocationEvent;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.report.ShakeReportData;

import java.util.List;

public class ShakeModule extends ReactContextBaseJavaModule {
    private final Application application;
    private final ReactApplicationContext reactContext;

    public ShakeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.application = (Application) reactContext.getApplicationContext();
        this.reactContext = reactContext;
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
    public void manualTrigger() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Shake.manualTrigger();
            }
        });
    }

    @ReactMethod
    public void setInvocationEvents(final ReadableArray stringList) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ShakeInvocationEvent[] invocationEvents = Mapper.mapToInvocationEvents(stringList);
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
    public void attachFiles(final ReadableArray stringList) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                final List<ShakeFile> shakeFiles = Mapper.mapToShakeFiles(stringList);
                Shake.onPrepareData(new ShakeReportData() {
                    @Override
                    public List<ShakeFile> attachedFiles() {
                        return shakeFiles;
                    }
                });
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
