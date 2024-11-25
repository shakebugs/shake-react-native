package com.shakebugs.react.utils

import android.content.Context
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableMapKeySetIterator
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.shakebugs.react.utils.Converter.convertBase64ToDrawable
import com.shakebugs.react.utils.Converter.convertDpToPixels
import com.shakebugs.react.utils.Converter.convertDrawableToBase64
import com.shakebugs.react.utils.Converter.resToString
import com.shakebugs.react.utils.Converter.stringToColor
import com.shakebugs.react.utils.Converter.stringToRes
import com.shakebugs.shake.LogLevel
import com.shakebugs.shake.ShakeReportConfiguration
import com.shakebugs.shake.ShakeScreen
import com.shakebugs.shake.actions.ShakeHomeAction
import com.shakebugs.shake.actions.ShakeHomeChatAction
import com.shakebugs.shake.actions.ShakeHomeSubmitAction
import com.shakebugs.shake.chat.ChatNotification
import com.shakebugs.shake.form.ShakeAttachments
import com.shakebugs.shake.form.ShakeEmail
import com.shakebugs.shake.form.ShakeForm
import com.shakebugs.shake.form.ShakeFormComponent
import com.shakebugs.shake.form.ShakeInspectButton
import com.shakebugs.shake.form.ShakePicker
import com.shakebugs.shake.form.ShakePickerItem
import com.shakebugs.shake.form.ShakeTextInput
import com.shakebugs.shake.form.ShakeTitle
import com.shakebugs.shake.internal.domain.models.NetworkRequest
import com.shakebugs.shake.internal.domain.models.NotificationEvent
import com.shakebugs.shake.report.ShakeFile
import com.shakebugs.shake.theme.ShakeTheme

class Mapper(private val context: Context) {

    fun mapToLogLevel(logLevelMap: ReadableMap): LogLevel {
        var logLevel: LogLevel = LogLevel.INFO

        try {
          val value = logLevelMap.getString("value") ?: ""
          logLevel = LogLevel.valueOf(value)
        } catch (e: Exception) {
            Logger.e("Failed to parse log level.", e)
        }

        return logLevel
    }

    fun mapToShakeScreen(shakeScreenMap: ReadableMap): ShakeScreen {
        var shakeScreen: ShakeScreen = ShakeScreen.HOME

        try {
            val value: String? = shakeScreenMap.getString("value")
            if (value != null) {
                shakeScreen = ShakeScreen.valueOf(value)
            }
        } catch (e: Exception) {
            Logger.e("Failed to parse shake screen.", e)
        }

        return shakeScreen
    }

    fun mapToNativeShakeScreen(shakeScreen: ShakeScreen): WritableMap {
        val map: WritableMap = WritableNativeMap()
        map.putString("value", shakeScreen.name)

        return map
    }

    fun mapToConfiguration(configurationMap: ReadableMap): ShakeReportConfiguration {
        val blackBoxData: Boolean = configurationMap.getBoolean("blackBoxData")
        val activityHistoryData: Boolean = configurationMap.getBoolean("activityHistoryData")
        val screenshot: Boolean = configurationMap.getBoolean("screenshot")
        val video: Boolean = configurationMap.getBoolean("video")
        val showReportSentMessage: Boolean = configurationMap.getBoolean("showReportSentMessage")

        val configuration = ShakeReportConfiguration()
        configuration.blackBoxData = blackBoxData
        configuration.activityHistoryData = activityHistoryData
        configuration.screenshot = screenshot
        configuration.video = video
        configuration.showReportSentMessage = showReportSentMessage

        return configuration
    }

    fun mapArrayToShakeFiles(filePaths: ReadableArray): List<ShakeFile> {
        val shakeFiles: MutableList<ShakeFile> = ArrayList()
        for (i in 0 until filePaths.size()) {
            val fileMap: ReadableMap = filePaths.getMap(i)

            val filePath: String? = fileMap.getString("path")
            var fileName: String? = fileMap.getString("name")

            if (fileName != null && filePath != null) {
              fileName = Files.removeExtension(fileName)
              shakeFiles.add(ShakeFile(fileName, filePath))
            }
        }
        return shakeFiles
    }

    fun mapMapToShakeForm(shakeFormMap: ReadableMap): ShakeForm {
        var formComponentsArray: ReadableArray? = shakeFormMap.getArray("components")
        if (formComponentsArray == null) formComponentsArray = WritableNativeArray()

        val formComponents: MutableList<ShakeFormComponent> = ArrayList()

        for (i in 0 until formComponentsArray.size()) {
            val componentMap: ReadableMap = formComponentsArray.getMap(i)

            val type: String = componentMap.getString("type") ?: ""
            if ("title" == type) {
                var key: String? = componentMap.getString("key")
                val label: String? = componentMap.getString("label")
                var initialValue: String? = componentMap.getString("initialValue")
                val required: Boolean = componentMap.getBoolean("required")

                if (key == null) key = ""
                if (initialValue == null) initialValue = ""

                val comp = ShakeTitle(key, label, initialValue, required)
                comp.label = stringToRes(context, componentMap.getString("labelRes"), "string")
                formComponents.add(comp)
            }
            if ("text_input" == type) {
                var key: String? = componentMap.getString("key")
                val label: String? = componentMap.getString("label")
                var initialValue: String? = componentMap.getString("initialValue")
                val required: Boolean = componentMap.getBoolean("required")

                if (key == null) key = ""
                if (initialValue == null) initialValue = ""

                val comp = ShakeTextInput(key, label, initialValue, required)
                comp.label = stringToRes(context, componentMap.getString("labelRes"), "string")
                formComponents.add(comp)
            }
            if ("email" == type) {
                var key: String? = componentMap.getString("key")
                val label: String? = componentMap.getString("label")
                var initialValue: String? = componentMap.getString("initialValue")
                val required: Boolean = componentMap.getBoolean("required")

                if (key == null) key = ""
                if (initialValue == null) initialValue = ""

                val comp = ShakeEmail(key, label, initialValue, required)
                comp.label = stringToRes(context, componentMap.getString("labelRes"), "string")
                formComponents.add(comp)
            }
            if ("picker" == type) {
                val itemsArray: ReadableArray? = componentMap.getArray("items")

                val items: MutableList<ShakePickerItem> = ArrayList()
                if (itemsArray != null) {
                   for (j in 0 until itemsArray.size()) {
                       val itemMap: ReadableMap = itemsArray.getMap(j)
                       var itemKey: String? = itemMap.getString("key")
                       val text: String? = itemMap.getString("text")
                       val icon: String? = itemMap.getString("icon")
                       val tag: String? = itemMap.getString("tag")

                       if (itemKey == null) itemKey = ""

                       val item = ShakePickerItem(
                         itemKey,
                         text,
                         convertBase64ToDrawable(context, icon),
                         tag
                       )
                       item.text = stringToRes(context, itemMap.getString("textRes"), "string")
                       item.icon = stringToRes(context, itemMap.getString("iconRes"), "drawable")
                       items.add(item)
                   }
                }

                var key: String? = componentMap.getString("key")
                val label: String? = componentMap.getString("label")

                if (key == null) key = ""

                val comp = ShakePicker(key, label, items)
                comp.label = stringToRes(context, componentMap.getString("labelRes"), "string")
                formComponents.add(comp)
            }
            if ("attachments" == type) {
                formComponents.add(ShakeAttachments())
            }
            if ("inspect" == type) {
                formComponents.add(ShakeInspectButton())
            }
        }

        return ShakeForm(formComponents)
    }

    fun mapShakeFormToMap(shakeForm: ShakeForm): WritableMap {
        val componentsArray: WritableArray = WritableNativeArray()

        for (formComponent in shakeForm.components) {
            if (formComponent is ShakeTitle) {
                val component: ShakeTitle = formComponent

                val componentMap: WritableMap = WritableNativeMap()
                componentMap.putString("type", component.type)
                componentMap.putString("key", component.key)
                componentMap.putString("label", component.labelValue)
                componentMap.putString("labelRes", resToString(context, component.label))
                componentMap.putString("initialValue", component.initialValue)
                componentMap.putBoolean("required", component.required)

                componentsArray.pushMap(componentMap)
            }
            if (formComponent is ShakeTextInput) {
                val component: ShakeTextInput = formComponent

                val componentMap: WritableMap = WritableNativeMap()
                componentMap.putString("type", component.type)
                componentMap.putString("key", component.key)
                componentMap.putString("label", component.labelValue)
                componentMap.putString("labelRes", resToString(context, component.label))
                componentMap.putString("initialValue", component.initialValue)
                componentMap.putBoolean("required", component.required)

                componentsArray.pushMap(componentMap)
            }
            if (formComponent is ShakeEmail) {
                val component: ShakeEmail = formComponent

                val componentMap: WritableMap = WritableNativeMap()
                componentMap.putString("type", component.type)
                componentMap.putString("key", component.key)
                componentMap.putString("label", component.labelValue)
                componentMap.putString("labelRes", resToString(context, component.label))
                componentMap.putString("initialValue", component.initialValue)
                componentMap.putBoolean("required", component.required)

                componentsArray.pushMap(componentMap)
            }
            if (formComponent is ShakePicker) {
                val component: ShakePicker = formComponent

                val items: WritableArray = WritableNativeArray()
                for (item in component.items) {
                    val itemMap: WritableMap = WritableNativeMap()
                    itemMap.putString("key", item.key)
                    itemMap.putString("text", item.textValue)
                    itemMap.putString("icon", convertDrawableToBase64(item.iconValue))
                    itemMap.putString("tag", item.tag)

                    itemMap.putString("textRes", resToString(context, item.text))
                    itemMap.putString("iconRes", resToString(context, item.icon))

                    items.pushMap(itemMap)
                }

                val componentMap: WritableMap = WritableNativeMap()
                componentMap.putString("type", component.type)
                componentMap.putString("key", component.key)
                componentMap.putString("label", component.labelValue)
                componentMap.putString("labelRes", resToString(context, component.label))
                componentMap.putArray("items", items)

                componentsArray.pushMap(componentMap)
            }
            if (formComponent is ShakeAttachments) {
                val component: ShakeAttachments = formComponent

                val componentMap: WritableMap = WritableNativeMap()
                componentMap.putString("type", component.type)

                componentsArray.pushMap(componentMap)
            }
            if (formComponent is ShakeInspectButton) {
                val component: ShakeInspectButton = formComponent

                val componentMap: WritableMap = WritableNativeMap()
                componentMap.putString("type", component.type)

                componentsArray.pushMap(componentMap)
            }
        }

        val shakeFormMap: WritableMap = WritableNativeMap()
        shakeFormMap.putArray("components", componentsArray)

        return shakeFormMap
    }

    fun mapMapToShakeTheme(shakeThemeMap: ReadableMap): ShakeTheme {
        val fontFamilyBold: String? =
            if (shakeThemeMap.hasKey("fontFamilyBold")) shakeThemeMap.getString("fontFamilyBold") else null
        val fontFamilyMedium: String? =
            if (shakeThemeMap.hasKey("fontFamilyMedium")) shakeThemeMap.getString("fontFamilyMedium") else null
        val backgroundColor: String? =
            if (shakeThemeMap.hasKey("backgroundColor")) shakeThemeMap.getString("backgroundColor") else null
        val secondaryBackgroundColor: String? =
            if (shakeThemeMap.hasKey("secondaryBackgroundColor")) shakeThemeMap.getString("secondaryBackgroundColor") else null
        val textColor: String? =
            if (shakeThemeMap.hasKey("textColor")) shakeThemeMap.getString("textColor") else null
        val secondaryTextColor: String? =
            if (shakeThemeMap.hasKey("secondaryTextColor")) shakeThemeMap.getString("secondaryTextColor") else null
        val accentColor: String? =
            if (shakeThemeMap.hasKey("accentColor")) shakeThemeMap.getString("accentColor") else null
        val accentTextColor: String? =
            if (shakeThemeMap.hasKey("accentTextColor")) shakeThemeMap.getString("accentTextColor") else null
        val outlineColor: String? =
            if (shakeThemeMap.hasKey("outlineColor")) shakeThemeMap.getString("outlineColor") else null
        val borderRadius: Double? =
            if (shakeThemeMap.hasKey("borderRadius") && !shakeThemeMap.isNull("borderRadius")) shakeThemeMap.getDouble("borderRadius") else null
        val elevation: Double? =
            if (shakeThemeMap.hasKey("elevation") && !shakeThemeMap.isNull("elevation")) shakeThemeMap.getDouble("elevation") else null

        val shakeTheme = ShakeTheme()
        shakeTheme.fontFamilyBoldValue = findAssetPath(context, fontFamilyBold)
        shakeTheme.fontFamilyMediumValue = findAssetPath(context, fontFamilyMedium)
        shakeTheme.secondaryBackgroundColorValue = stringToColor(backgroundColor)
        shakeTheme.secondaryBackgroundColorValue = stringToColor(secondaryBackgroundColor)
        shakeTheme.textColorValue = stringToColor(textColor)
        shakeTheme.secondaryTextColorValue = stringToColor(secondaryTextColor)
        shakeTheme.accentColorValue = stringToColor(accentColor)
        shakeTheme.accentTextColorValue = stringToColor(accentTextColor)
        shakeTheme.outlineColorValue = stringToColor(outlineColor)
        shakeTheme.borderRadiusValue = convertDpToPixels(context, borderRadius)
        shakeTheme.elevationValue = convertDpToPixels(context, elevation)

        return shakeTheme
    }

    fun mapArrayToHomeActions(array: ReadableArray): ArrayList<ShakeHomeAction> {
        val homeActions: ArrayList<ShakeHomeAction> = ArrayList()
        for (i in 0 until array.size()) {
            val actionMap: ReadableMap = array.getMap(i)

            val type: String = actionMap.getString("type") ?: continue

            var title: String
            var subtitle: String
            var icon: String

            when (type) {
                "chat" -> {
                    title = actionMap.getString("title") ?: ""
                    subtitle = actionMap.getString("subtitle") ?: ""
                    icon = actionMap.getString("icon") ?: ""

                    val chatAction =
                        ShakeHomeChatAction(title, subtitle, convertBase64ToDrawable(context, icon))
                    chatAction.title =
                        stringToRes(
                            context,
                            actionMap.getString("titleRes"),
                            "string"
                        )
                    chatAction.subtitle =
                        stringToRes(
                            context,
                            actionMap.getString("subtitleRes"),
                            "string"
                        )
                    chatAction.icon =
                        stringToRes(
                            context,
                            actionMap.getString("iconRes"),
                            "drawable"
                        )

                    homeActions.add(chatAction)
                }

                "submit" -> {
                    title = actionMap.getString("title") ?: ""
                    subtitle = actionMap.getString("subtitle") ?: ""
                    icon = actionMap.getString("icon") ?: ""

                    val submitAction = ShakeHomeSubmitAction(
                        title,
                        subtitle,
                        convertBase64ToDrawable(context, icon)
                    )
                    submitAction.title =
                        stringToRes(
                            context,
                            actionMap.getString("titleRes"),
                            "string"
                        )
                    submitAction.subtitle =
                        stringToRes(
                            context,
                            actionMap.getString("subtitleRes"),
                            "string"
                        )
                    submitAction.icon =
                        stringToRes(
                            context,
                            actionMap.getString("iconRes"),
                            "drawable"
                        )

                    homeActions.add(submitAction)
                }

                "default" -> {
                    title = actionMap.getString("title") ?: ""
                    subtitle = actionMap.getString("subtitle") ?: ""
                    icon = actionMap.getString("icon") ?: ""

                    val homeAction = ShakeHomeAction(
                        title,
                        subtitle,
                        convertBase64ToDrawable(context, icon),
                        null
                    )
                    homeAction.title =
                        stringToRes(
                            context,
                            actionMap.getString("titleRes"),
                            "string"
                        )
                    homeAction.subtitle =
                        stringToRes(
                            context,
                            actionMap.getString("subtitleRes"),
                            "string"
                        )
                    homeAction.icon =
                        stringToRes(
                            context,
                            actionMap.getString("iconRes"),
                            "drawable"
                        )

                    homeActions.add(homeAction)
                }
            }
        }
        return homeActions
    }

    fun mapToNetworkRequest(data: ReadableMap): NetworkRequest {
        val requestHeaders = data.getMap("requestHeaders")
        val responseHeaders = data.getMap("responseHeaders")

        val networkRequest = NetworkRequest()
        networkRequest.url = data.getString("url") ?: ""
        networkRequest.method = data.getString("method") ?: ""
        networkRequest.requestBody = data.getString("requestBody") ?: ""
        networkRequest.requestHeaders = if (requestHeaders != null) toStringMap(requestHeaders) else HashMap()
        networkRequest.responseBody = data.getString("responseBody")
        networkRequest.responseHeaders = if (responseHeaders != null) toStringMap(responseHeaders) else HashMap()
        networkRequest.statusCode = data.getString("statusCode") ?: ""
        networkRequest.timestamp = data.getString("timestamp") ?: ""
        networkRequest.duration = (data.getDouble("duration")).toFloat()

        return networkRequest
    }

    fun mapToNotificationEvent(data: ReadableMap): NotificationEvent {
        val id: String? =
            if (data.hasKey("id") && !data.isNull("id")) data.getString("id") else ""
        val title: String? =
            if (data.hasKey("title") && !data.isNull("title")) data.getString("title") else ""
        val description: String? =
            if (data.hasKey("description") && !data.isNull("description")) data.getString(
                "description"
            ) else ""

        val notificationEvent = NotificationEvent()
        notificationEvent.id = Converter.stringToInt(id ?: "")
        notificationEvent.title = title
        notificationEvent.description = description

        return notificationEvent
    }

    fun notificationEventToMap(notificationEvent: NotificationEvent): WritableMap {
        val id: Int = notificationEvent.id
        val title = if (notificationEvent.title == null) "" else notificationEvent.title
        val description =
            if (notificationEvent.description == null) "" else notificationEvent.description

        val map: WritableMap = WritableNativeMap()
        map.putString("id", id.toString())
        map.putString("title", title)
        map.putString("description", description)

        return map
    }

    fun mapToUserMetadata(metadata: ReadableMap): Map<String, String?> {
        val map = toMap(metadata)

        val stringMap: MutableMap<String, String?> = HashMap()
        for ((key, value) in map) {
            if (value == null) {
                stringMap[key] = null
            } else {
                stringMap[key] = value.toString()
            }
        }

        return stringMap.toMap()
    }

    fun mapToChatNotification(notificationData: ReadableMap): ChatNotification? {
        var chatNotification: ChatNotification? = null

        try {
            val id: String? = notificationData.getString("id")
            val userId: String? = notificationData.getString("userId")
            val title: String? = notificationData.getString("title")
            val message: String? = notificationData.getString("message")

            if (id != null && userId != null && title != null && message != null) {
                chatNotification = ChatNotification(id, userId, title, message)
            }
        } catch (ignore: Exception) {
        }

        return chatNotification
    }

    fun mapToTagsList(tagsArray: ReadableArray): List<String> {
        val tags = ArrayList<String>()
        for (i in 0 until tagsArray.size()) {
            tags.add(tagsArray.getString(i))
        }
        return tags
    }

    private fun toMap(readableMap: ReadableMap): Map<String, Any?> {
        val map: MutableMap<String, Any?> = HashMap()
        val iterator: ReadableMapKeySetIterator = readableMap.keySetIterator()

        while (iterator.hasNextKey()) {
            val key: String = iterator.nextKey()
            val type: ReadableType = readableMap.getType(key)

            when (type) {
                ReadableType.Null -> map[key] = null
                ReadableType.Boolean -> map[key] = readableMap.getBoolean(key)
                ReadableType.Number -> map[key] = readableMap.getDouble(key)
                ReadableType.String -> map[key] = readableMap.getString(key)
                ReadableType.Map -> {
                    val m: ReadableMap? = readableMap.getMap(key)
                    if (m != null) map[key] = toMap(m)
                }

                ReadableType.Array -> {
                    val a: ReadableArray? = readableMap.getArray(key)
                    if (a != null) map[key] = toArray(a)
                }
            }
        }

        return map
    }

    private fun toStringMap(readableMap: ReadableMap): Map<String, String?> {
        val map = toMap(readableMap)

        val stringMap: MutableMap<String, String?> = HashMap()
        for ((key, value) in map) {
            if (value is String) {
                stringMap[key] = value as String?
            }
        }

        return stringMap
    }

    private fun toArray(readableArray: ReadableArray): Array<Any?> {
        val array = arrayOfNulls<Any>(readableArray.size())

        for (i in 0 until readableArray.size()) {
            val type: ReadableType = readableArray.getType(i)

            when (type) {
                ReadableType.Null -> array[i] = null
                ReadableType.Boolean -> array[i] = readableArray.getBoolean(i)
                ReadableType.Number -> array[i] = readableArray.getDouble(i)
                ReadableType.String -> array[i] = readableArray.getString(i)
                ReadableType.Map -> array[i] = toMap(readableArray.getMap(i))
                ReadableType.Array -> array[i] = toArray(readableArray.getArray(i))
            }
        }

        return array
    }

    private fun findAssetPath(context: Context, assetName: String?): String? {
        if (assetName == null) return null

        val assetPaths = arrayOf("fonts", "images", "sounds")
        for (assetPath in assetPaths) {
            try {
                val assets: Array<String> = context.assets.list(assetPath) as Array<String>
                for (asset in assets) {
                    if (asset.contains(assetName)) {
                        return "$assetPath/$asset"
                    }
                }
            } catch (ignore: Exception) {
            }
        }
        return null
    }
}
