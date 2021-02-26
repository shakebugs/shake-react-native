package com.shakebugs.react.utils;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Events {
    public static String NETWORK_REQUEST = "networkRequestEvent";
    public static String NOTIFICATION_EVENT = "notificationEvent";

    public static void sendNetworkRequestEvent(ReactContext context, WritableNativeMap map) {
        sendEvent(context, NETWORK_REQUEST, map);
    }

    public static void sendNotificationEventEvent(ReactContext context, WritableNativeMap map) {
        sendEvent(context, NOTIFICATION_EVENT, map);
    }

    private static void sendEvent(ReactContext reactContext, String eventName, Object object) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, object);
    }
}
