package com.shakebugs.react.utils;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Emitter {
    public static final String EVENT_NOTIFICATION = "EventNotification";
    public static final String EVENT_UNREAD_MESSAGES = "UnreadMessages";
    public static final String EVENT_HOME_ACTION_TAP = "HomeActionTap";
    public static final String EVENT_SHAKE_OPEN = "OnShakeOpen";
    public static final String EVENT_SHAKE_DISMISS = "OnShakeDismiss";
    public static final String EVENT_SHAKE_SUBMIT = "OnShakeSubmit";
    private final ReactContext reactContext;

    public Emitter(ReactContext reactContext) {
        this.reactContext = reactContext;
    }

    public void sendEvent(String eventName, WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void sendEvent(String eventName, int number) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, number);
    }

    public void sendEvent(String eventName, String text) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, text);
    }
}
