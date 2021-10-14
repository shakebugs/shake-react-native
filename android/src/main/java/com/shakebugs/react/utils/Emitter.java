package com.shakebugs.react.utils;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.shakebugs.shake.internal.data.NotificationEvent;

public class Emitter {
    private static final String EVENT_NOTIFICATION = "EventNotification";
    private final ReactContext reactContext;
    private final Mapper mapper;

    public Emitter(ReactContext reactContext, Mapper mapper) {
        this.reactContext = reactContext;
        this.mapper = mapper;
    }

    public void sendNotificationEvent(NotificationEvent notificationEvent) {
        WritableMap map = mapper.notificationEventToMap(notificationEvent);
        sendEvent(reactContext, EVENT_NOTIFICATION, map);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
