package com.shakebugs.react

import android.app.Activity
import android.app.Application
import android.content.Intent
import android.view.View

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.shakebugs.react.utils.Constants
import com.shakebugs.react.utils.Emitter
import com.shakebugs.react.utils.Mapper
import com.shakebugs.shake.LogLevel
import com.shakebugs.shake.Shake
import com.shakebugs.shake.ShakeInfo
import com.shakebugs.shake.ShakeReportConfiguration
import com.shakebugs.shake.ShakeScreen
import com.shakebugs.shake.actions.ShakeHomeAction
import com.shakebugs.shake.chat.ChatNotification
import com.shakebugs.shake.chat.UnreadChatMessagesListener
import com.shakebugs.shake.form.ShakeForm
import com.shakebugs.shake.internal.domain.models.NetworkRequest
import com.shakebugs.shake.internal.domain.models.NotificationEvent
import com.shakebugs.shake.privacy.NotificationEventEditor
import com.shakebugs.shake.privacy.NotificationEventsFilter
import com.shakebugs.shake.report.ShakeDismissListener
import com.shakebugs.shake.report.ShakeOpenListener
import com.shakebugs.shake.report.ShakeReportData
import com.shakebugs.shake.report.ShakeSubmitListener
import com.shakebugs.shake.theme.ShakeTheme

@ReactModule(name = ShakeModule.NAME)
class ShakeModule(private val reactContext: ReactApplicationContext): NativeShakeSpec(reactContext) {

    private val mapper: Mapper = Mapper(reactContext)
    private val emitter: Emitter = Emitter(reactContext)

    override fun getName(): String {
        return NAME
    }

    /**
     * Passed to the native SDK to distinguish native and React Native apps.
     *
     * @return platform info
     */
    private fun buildShakePlatformInfo(): ShakeInfo {
        val platformInfo = ShakeInfo()
        platformInfo.platform = Constants.PLATFORM
        platformInfo.versionCode = Constants.VERSION_CODE
        platformInfo.versionName = Constants.VERSION_NAME
        return platformInfo
    }

    /*
     * Shake SDK methods.
     */

    override fun start(apiKey: String, promise: Promise) {
        reactContext.runOnUiQueueThread {
          ShakeReflection.setShakeInfo(buildShakePlatformInfo())
          val activity: Activity? = currentActivity
          if (activity != null) {
            ShakeReflection.start(activity, apiKey)
          } else {
            val app: Application =
              reactContext.applicationContext as Application
            Shake.start(app, apiKey)
          }
          startShakeCallbacksEmitter()
          promise.resolve(null)
        }
    }

    override fun show(shakeScreenMap: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val shakeScreen: ShakeScreen = mapper.mapToShakeScreen(shakeScreenMap)
          Shake.show(shakeScreen)
        }
    }

    override fun getShakeForm(): WritableMap {
        val shakeForm: ShakeForm = Shake.getReportConfiguration().shakeForm
        val shakeFormMap: WritableMap = mapper.mapShakeFormToMap(shakeForm)
        return shakeFormMap
    }

    override fun setShakeForm(shakeFormMap: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val shakeForm: ShakeForm = mapper.mapMapToShakeForm(shakeFormMap)
          Shake.getReportConfiguration().shakeForm = shakeForm
        }
    }

    override fun setShakeTheme(shakeThemeMap: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val shakeTheme: ShakeTheme = mapper.mapMapToShakeTheme(shakeThemeMap)
          Shake.getReportConfiguration().theme = shakeTheme
        }
    }

    override fun setHomeSubtitle(subtitle: String) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().homeSubtitleValue = subtitle
        }
    }

    override fun setHomeActions(array: ReadableArray) {
        reactContext.runOnUiQueueThread {
          val actions: ArrayList<ShakeHomeAction> = mapper.mapArrayToHomeActions(array)
          for (action: ShakeHomeAction in actions) {
            action.handler = {
              emitter.sendEvent(Emitter.EVENT_HOME_ACTION_TAP, action.titleValue ?: "")
            }
          }
          Shake.getReportConfiguration().homeActions = actions
        }
    }

    override fun isUserFeedbackEnabled(): Boolean {
        return Shake.isUserFeedbackEnabled()
    }

    override fun setUserFeedbackEnabled(enabled: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.setUserFeedbackEnabled(enabled)
        }
    }

    override fun isEnableBlackBox(): Boolean {
        return Shake.getReportConfiguration().isEnableBlackBox
    }

    override fun setEnableBlackBox(enableBlackBox: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isEnableBlackBox = enableBlackBox
        }
    }

    override fun isEnableActivityHistory(): Boolean {
        return Shake.getReportConfiguration().isEnableActivityHistory
    }

    override fun setEnableActivityHistory(enableActivityHistory: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isEnableActivityHistory = enableActivityHistory
        }
    }

    override fun isShowFloatingReportButton(): Boolean {
        return Shake.getReportConfiguration().isShowFloatingReportButton
    }

    override fun setShowFloatingReportButton(showFloatingReportButton: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isShowFloatingReportButton = showFloatingReportButton
        }
    }

    override fun isInvokeShakeOnShakeDeviceEvent(): Boolean {
        return Shake.getReportConfiguration().isInvokeShakeOnShakeDeviceEvent
    }

    override fun setInvokeShakeOnShakeDeviceEvent(invokeOnShake: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isInvokeShakeOnShakeDeviceEvent = invokeOnShake
        }
    }

    override fun isInvokeShakeOnScreenshot(): Boolean {
        return Shake.getReportConfiguration().isInvokeShakeOnScreenshot
    }

    override fun setInvokeShakeOnScreenshot(invokeOnScreenshot: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isInvokeShakeOnScreenshot = invokeOnScreenshot
        }
    }

    override fun getDefaultScreen(): WritableMap {
        return mapper.mapToNativeShakeScreen(Shake.getReportConfiguration().defaultScreen)
    }

    override fun setDefaultScreen(shakeScreenMap: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val shakeScreen: ShakeScreen = mapper.mapToShakeScreen(shakeScreenMap)
          Shake.getReportConfiguration().defaultScreen = shakeScreen
        }
    }

    override fun isScreenshotIncluded(): Boolean {
        return Shake.getReportConfiguration().isScreenshotIncluded
    }

    override fun setScreenshotIncluded(isScreenshotIncluded: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isScreenshotIncluded = isScreenshotIncluded
        }
    }

    override fun getShakingThreshold(): Double {
        return Shake.getReportConfiguration().shakingThreshold.toDouble()
    }

    override fun setShakingThreshold(shakingThreshold: Double) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().shakingThreshold = shakingThreshold.toInt()
        }
    }

    override fun getShowIntroMessage(): Boolean {
        return Shake.getShowIntroMessage()
    }

    override fun setShowIntroMessage(showIntroMessage: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.setShowIntroMessage(
            showIntroMessage
          )
        }
    }

    override fun isAutoVideoRecording(): Boolean {
        return Shake.getReportConfiguration().isAutoVideoRecording
    }

    override fun setAutoVideoRecording(videoRecordingEnabled: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isAutoVideoRecording = videoRecordingEnabled
        }
    }

    override fun isConsoleLogsEnabled(): Boolean {
        return Shake.getReportConfiguration().isConsoleLogsEnabled
    }

    override fun setConsoleLogsEnabled(consoleLogsEnabled: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isConsoleLogsEnabled = consoleLogsEnabled
        }
    }

    override fun log(logLevelMap: ReadableMap, message: String) {
        reactContext.runOnUiQueueThread {
          val logLevel: LogLevel = mapper.mapToLogLevel(logLevelMap)
          Shake.log(logLevel, message)
        }
    }

    override fun setMetadata(key: String, value: String) {
        reactContext.runOnUiQueueThread { Shake.setMetadata(key, value) }
    }

    override fun clearMetadata() {
        reactContext.runOnUiQueueThread { Shake.clearMetadata() }
    }

    override fun setShakeReportData(filesArray: ReadableArray) {
        reactContext.runOnUiQueueThread {
          Shake.onPrepareData { mapper.mapArrayToShakeFiles(filesArray) }
        }
    }

    override fun silentReport(
        description: String,
        filesArray: ReadableArray,
        configurationMap: ReadableMap
    ) {
        reactContext.runOnUiQueueThread {
          val configuration: ShakeReportConfiguration =
            mapper.mapToConfiguration(configurationMap)
          val shakeReportData = ShakeReportData { mapper.mapArrayToShakeFiles(filesArray) }
          Shake.silentReport(description, shakeReportData, configuration)
        }
    }

    override fun insertNetworkRequest(data: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val networkRequest: NetworkRequest = mapper.mapToNetworkRequest(data)
          ShakeReflection.insertNetworkRequest(networkRequest)
        }
    }

    override fun insertNotificationEvent(data: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val notificationEvent: NotificationEvent = mapper.mapToNotificationEvent(data)
          ShakeReflection.insertNotificationEvent(notificationEvent)
        }
    }

    override fun addPrivateView(id: Double) {
      val view: View? = currentActivity?.findViewById(id.toInt())
      if (view != null) Shake.addPrivateView(view)
    }

    override fun removePrivateView(id: Double) {
      val view: View? = currentActivity?.findViewById(id.toInt())
      if (view != null) Shake.removePrivateView(view)
    }

    override fun clearPrivateViews() {
      Shake.clearPrivateViews()
    }

    override fun isSensitiveDataRedactionEnabled(): Boolean {
        return Shake.getReportConfiguration().isSensitiveDataRedactionEnabled
    }

    override fun setSensitiveDataRedactionEnabled(sensitiveDataRedactionEnabled: Boolean) {
        reactContext.runOnUiQueueThread {
          Shake.getReportConfiguration().isSensitiveDataRedactionEnabled =
            sensitiveDataRedactionEnabled
        }
    }

    override fun startNotificationsEmitter() {
        reactContext.runOnUiQueueThread {
          Shake.setNotificationEventsFilter { notificationEventEditor ->
            val map: WritableMap =
              mapper.notificationEventToMap(notificationEventEditor.build())
            emitter.sendEvent(Emitter.EVENT_NOTIFICATION, map)
            null
          }
        }
    }

    override fun stopNotificationsEmitter() {
        reactContext.runOnUiQueueThread {
          Shake.setNotificationEventsFilter(
            null
          )
        }
    }

    override fun startUnreadChatMessagesEmitter() {
        reactContext.runOnUiQueueThread {
          Shake.setUnreadChatMessagesListener(object : UnreadChatMessagesListener {
            override fun onUnreadMessagesCountChanged(count: Int) {
              emitter.sendEvent(Emitter.EVENT_UNREAD_MESSAGES, count)
            }
          })
        }
    }

    override fun stopUnreadChatMessagesEmitter() {
        reactContext.runOnUiQueueThread {
          Shake.setUnreadChatMessagesListener(
            null
          )
        }
    }

    override fun showNotificationsSettings() {
        reactContext.runOnUiQueueThread {
          currentActivity?.startActivity(Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS"))
        }
    }

    override fun registerUser(id: String) {
        reactContext.runOnUiQueueThread { Shake.registerUser(id) }
    }

    override fun updateUserId(id: String) {
        reactContext.runOnUiQueueThread { Shake.updateUserId(id) }
    }

    override fun updateUserMetadata(metadataMap: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val metadata: Map<String, String?> = mapper.mapToUserMetadata(metadataMap)
          Shake.updateUserMetadata(metadata)
        }
    }

    override fun unregisterUser() {
        reactContext.runOnUiQueueThread { Shake.unregisterUser() }
    }

    override fun setPushNotificationsToken(token: String?) {
        reactContext.runOnUiQueueThread {
          Shake.setPushNotificationsToken(token)
        }
    }

    override fun showChatNotification(notificationData: ReadableMap) {
        reactContext.runOnUiQueueThread {
          val chatNotification: ChatNotification? = mapper.mapToChatNotification(notificationData)
          if (chatNotification != null) {
            Shake.showChatNotification(chatNotification)
          }
        }
    }

    override fun setTags(tagsArray: ReadableArray) {
      Shake.getReportConfiguration().tags = mapper.mapToTagsList(tagsArray)
    }

    // Event listeners
    override fun addListener(eventType: String?) {
      // Ignore
    }

    override fun removeListeners(count: Double) {
      // Ignore
    }

    /*
     * Callbacks starters.
     */
    private fun startShakeCallbacksEmitter() {
      Shake.getReportConfiguration().shakeOpenListener = object : ShakeOpenListener {
        override fun onShakeOpen() {
          emitter.sendEvent(Emitter.EVENT_SHAKE_OPEN, "open")
        }
      }
      Shake.getReportConfiguration().shakeDismissListener = object : ShakeDismissListener {
        override fun onShakeDismiss() {
          emitter.sendEvent(Emitter.EVENT_SHAKE_DISMISS, "dismiss")
        }
      }
      Shake.getReportConfiguration().shakeSubmitListener = object : ShakeSubmitListener {
        override fun onShakeSubmit(reportType: String, fields: Map<String, String>) {
          val fieldsMap: WritableMap = WritableNativeMap()
          for ((key, value) in fields) {
            fieldsMap.putString(key, value)
          }
          val eventData: WritableMap = WritableNativeMap()
          eventData.putString("type", reportType)
          eventData.putMap("fields", fieldsMap)
          emitter.sendEvent(Emitter.EVENT_SHAKE_SUBMIT, eventData)
        }
      }
    }

    companion object {
        const val NAME = "Shake"
    }
}
