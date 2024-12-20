package com.shakebugs.react.utils

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class Emitter(private val reactContext: ReactApplicationContext) {

    fun sendEvent(eventName: String, params: WritableMap) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    fun sendEvent(eventName: String, number: Int) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, number)
    }

    fun sendEvent(eventName: String, text: String) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, text)
    }

    companion object {
        const val EVENT_NOTIFICATION: String = "EventNotification"
        const val EVENT_UNREAD_MESSAGES: String = "UnreadMessages"
        const val EVENT_HOME_ACTION_TAP: String = "HomeActionTap"
        const val EVENT_SHAKE_OPEN: String = "OnShakeOpen"
        const val EVENT_SHAKE_DISMISS: String = "OnShakeDismiss"
        const val EVENT_SHAKE_SUBMIT: String = "OnShakeSubmit"
    }
}
