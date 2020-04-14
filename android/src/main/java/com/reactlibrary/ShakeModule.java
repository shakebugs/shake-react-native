package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class ShakeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ShakeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Shake";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
