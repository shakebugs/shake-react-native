package com.shakebugs.react

import android.app.Activity
import com.shakebugs.react.utils.Logger
import com.shakebugs.react.utils.Reflection
import com.shakebugs.shake.ShakeInfo
import com.shakebugs.shake.internal.domain.models.NetworkRequest
import com.shakebugs.shake.internal.domain.models.NotificationEvent

object ShakeReflection {
    private const val CLASS_NAME = "com.shakebugs.shake.Shake"

    fun start(activity: Activity, apiKey: String) {
        try {
            val method = Reflection.getMethod(
                Class.forName(CLASS_NAME), "startFromWrapper",
                Activity::class.java,
                String::class.java
            )
            method?.invoke(null, activity, apiKey)
        } catch (e: Exception) {
            Logger.e("Failed to start Shake", e)
        }
    }

    fun setShakeInfo(shakeInfo: ShakeInfo) {
        try {
            val method = Reflection.getMethod(
                Class.forName(CLASS_NAME), "setShakeInfo",
                ShakeInfo::class.java
            )
            method?.invoke(null, shakeInfo)
        } catch (e: Exception) {
            Logger.e("Failed to set shake info", e)
        }
    }

    fun insertNetworkRequest(networkRequest: NetworkRequest) {
        try {
            val method = Reflection.getMethod(
                Class.forName(CLASS_NAME), "insertNetworkRequest",
                NetworkRequest::class.java
            )
            method?.invoke(null, networkRequest)
        } catch (e: Exception) {
            Logger.e("Failed to insert network request", e)
        }
    }

    fun insertNotificationEvent(notificationEvent: NotificationEvent) {
        try {
            val method = Reflection.getMethod(
                Class.forName(CLASS_NAME), "insertNotificationEvent",
                NotificationEvent::class.java
            )
            method?.invoke(null, notificationEvent)
        } catch (e: Exception) {
            Logger.e("Failed to insert notification event", e)
        }
    }
}
