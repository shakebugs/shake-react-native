package com.shakebugs.react;

import android.app.Activity;

import com.shakebugs.react.utils.Logger;
import com.shakebugs.react.utils.Reflection;
import com.shakebugs.shake.ShakeInfo;
import com.shakebugs.shake.internal.domain.models.NetworkRequest;
import com.shakebugs.shake.internal.domain.models.NotificationEvent;

import java.lang.reflect.Method;

public class ShakeReflection {
    private static final String CLASS_NAME = "com.shakebugs.shake.Shake";

    public static void start(Activity activity, String apiKey) {
        try {
            Method method = Reflection.getMethod(Class.forName(CLASS_NAME), "startFromWrapper", Activity.class, String.class, String.class);
            //noinspection ConstantConditions
            method.invoke(null, activity, apiKey);
        } catch (Exception e) {
            Logger.e("Failed to start Shake", e);
        }
    }

    public static void setShakeInfo(ShakeInfo shakeInfo) {
        try {
            Method method = Reflection.getMethod(Class.forName(CLASS_NAME), "setShakeInfo", ShakeInfo.class);
            //noinspection ConstantConditions
            method.invoke(null, shakeInfo);
        } catch (Exception e) {
            Logger.e("Failed to set shake info", e);
        }
    }

    public static void insertNetworkRequest(NetworkRequest networkRequest) {
        try {
            Method method = Reflection.getMethod(Class.forName(CLASS_NAME), "insertNetworkRequest", NetworkRequest.class);
            //noinspection ConstantConditions
            method.invoke(null, networkRequest);
        } catch (Exception e) {
            Logger.e("Failed to insert network request", e);
        }
    }

    public static void insertNotificationEvent(NotificationEvent notificationEvent) {
        try {
            Method method = Reflection.getMethod(Class.forName(CLASS_NAME), "insertNotificationEvent", NotificationEvent.class);
            //noinspection ConstantConditions
            method.invoke(null, notificationEvent);
        } catch (Exception e) {
            Logger.e("Failed to insert notification event", e);
        }
    }
}
