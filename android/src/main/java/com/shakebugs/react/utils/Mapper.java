package com.shakebugs.react.utils;

import static com.shakebugs.react.utils.Converter.convertBase64ToDrawable;
import static com.shakebugs.react.utils.Converter.convertDrawableToBase64;
import static com.shakebugs.react.utils.Converter.resToString;
import static com.shakebugs.react.utils.Converter.stringToRes;

import android.content.Context;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.shakebugs.shake.LogLevel;
import com.shakebugs.shake.ShakeReportConfiguration;
import com.shakebugs.shake.ShakeScreen;
import com.shakebugs.shake.actions.ShakeHomeAction;
import com.shakebugs.shake.actions.ShakeHomeChatAction;
import com.shakebugs.shake.actions.ShakeHomeSubmitAction;
import com.shakebugs.shake.form.ShakeAttachments;
import com.shakebugs.shake.form.ShakeEmail;
import com.shakebugs.shake.form.ShakeForm;
import com.shakebugs.shake.form.ShakeFormComponent;
import com.shakebugs.shake.form.ShakeInspectButton;
import com.shakebugs.shake.form.ShakePicker;
import com.shakebugs.shake.form.ShakePickerItem;
import com.shakebugs.shake.form.ShakeTextInput;
import com.shakebugs.shake.form.ShakeTitle;
import com.shakebugs.shake.internal.domain.models.NetworkRequest;
import com.shakebugs.shake.internal.domain.models.NotificationEvent;
import com.shakebugs.shake.report.ShakeFile;
import com.shakebugs.shake.theme.ShakeTheme;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Mapper {

    private final Context context;

    public Mapper(Context context) {
        this.context = context;
    }

    public LogLevel mapToLogLevel(ReadableMap logLevelMap) {

        LogLevel logLevel = LogLevel.INFO;

        try {
            logLevel = LogLevel.valueOf(logLevelMap.getString("value"));
        } catch (Exception e) {
            Logger.e("Failed to parse log level.", e);
        }

        return logLevel;
    }

    public ShakeScreen mapToShakeScreen(ReadableMap shakeScreenMap) {

        ShakeScreen shakeScreen = ShakeScreen.HOME;

        try {
            String value = shakeScreenMap.getString("value");
            if (value != null) {
                shakeScreen = ShakeScreen.valueOf(value);
            }
        } catch (Exception e) {
            Logger.e("Failed to parse shake screen.", e);
        }

        return shakeScreen;
    }

    public ShakeReportConfiguration mapToConfiguration(ReadableMap configurationMap) {
        if (configurationMap == null) return null;

        boolean blackBoxData = configurationMap.getBoolean("blackBoxData");
        boolean activityHistoryData = configurationMap.getBoolean("activityHistoryData");
        boolean screenshot = configurationMap.getBoolean("screenshot");
        boolean video = configurationMap.getBoolean("video");
        boolean showReportSentMessage = configurationMap.getBoolean("showReportSentMessage");

        ShakeReportConfiguration configuration = new ShakeReportConfiguration();
        configuration.blackBoxData = blackBoxData;
        configuration.activityHistoryData = activityHistoryData;
        configuration.screenshot = screenshot;
        configuration.video = video;
        configuration.showReportSentMessage = showReportSentMessage;

        return configuration;
    }

    public List<ShakeFile> mapArrayToShakeFiles(ReadableArray filePaths) {
        if (filePaths == null) return null;

        List<ShakeFile> shakeFiles = new ArrayList<>();
        for (int i = 0; i < filePaths.size(); i++) {
            ReadableMap fileMap = filePaths.getMap(i);

            String filePath = fileMap.getString("path");
            String fileName = fileMap.getString("name");
            fileName = Files.removeExtension(fileName);

            if (fileName != null && filePath != null) {
                shakeFiles.add(new ShakeFile(fileName, filePath));
            }
        }
        return shakeFiles;
    }

    public ShakeForm mapMapToShakeForm(ReadableMap shakeFormMap) {
        if (shakeFormMap == null) return null;

        ReadableArray formComponentsArray = shakeFormMap.getArray("components");
        if (formComponentsArray == null) formComponentsArray = new WritableNativeArray();

        List<ShakeFormComponent> formComponents = new ArrayList<>();

        for (int i = 0; i < formComponentsArray.size(); i++) {
            ReadableMap componentMap = formComponentsArray.getMap(i);

            String type = componentMap.getString("type");
            if ("title".equals(type)) {
                String key = componentMap.getString("key");
                String label = componentMap.getString("label");
                String initialValue = componentMap.getString("initialValue");
                boolean required = componentMap.getBoolean("required");

                if (key == null) key = "";
                if (initialValue == null) initialValue = "";

                ShakeTitle comp = new ShakeTitle(key, label, initialValue, required);
                comp.setLabel(stringToRes(context, componentMap.getString("labelRes"), "string"));
                formComponents.add(comp);
            }
            if ("text_input".equals(type)) {
                String key = componentMap.getString("key");
                String label = componentMap.getString("label");
                String initialValue = componentMap.getString("initialValue");
                boolean required = componentMap.getBoolean("required");

                if (key == null) key = "";
                if (initialValue == null) initialValue = "";

                ShakeTextInput comp = new ShakeTextInput(key, label, initialValue, required);
                comp.setLabel(stringToRes(context, componentMap.getString("labelRes"), "string"));
                formComponents.add(comp);
            }
            if ("email".equals(type)) {
                String key = componentMap.getString("key");
                String label = componentMap.getString("label");
                String initialValue = componentMap.getString("initialValue");
                boolean required = componentMap.getBoolean("required");

                if (key == null) key = "";
                if (initialValue == null) initialValue = "";

                ShakeEmail comp = new ShakeEmail(key, label, initialValue, required);
                comp.setLabel(stringToRes(context, componentMap.getString("labelRes"), "string"));
                formComponents.add(comp);
            }
            if ("picker".equals(type)) {
                ReadableArray itemsArray = componentMap.getArray("items");
                List<ShakePickerItem> items = new ArrayList<>();
                if (itemsArray != null) {
                    for (int j = 0; j < itemsArray.size(); j++) {
                        ReadableMap itemMap = itemsArray.getMap(j);
                        String itemKey = itemMap.getString("key");
                        String text = itemMap.getString("text");
                        String icon = itemMap.getString("icon");
                        String tag = itemMap.getString("tag");

                        if (itemKey == null) itemKey = "";

                        ShakePickerItem item = new ShakePickerItem(itemKey, text, convertBase64ToDrawable(context, icon), tag);
                        item.setText(stringToRes(context, itemMap.getString("textRes"), "string"));
                        item.setIcon(stringToRes(context, itemMap.getString("iconRes"), "drawable"));
                        items.add(item);
                    }
                }

                String key = componentMap.getString("key");
                String label = componentMap.getString("label");

                if (key == null) key = "";

                ShakePicker comp = new ShakePicker(key, label, items);
                comp.setLabel(stringToRes(context, componentMap.getString("labelRes"), "string"));
                formComponents.add(comp);
            }
            if ("attachments".equals(type)) {
                formComponents.add(new ShakeAttachments());
            }
            if ("inspect".equals(type)) {
                formComponents.add(new ShakeInspectButton());
            }
        }

        return new ShakeForm(formComponents);
    }

    public WritableMap mapShakeFormToMap(ShakeForm shakeForm) {
        if (shakeForm == null) return null;

        WritableArray componentsArray = new WritableNativeArray();

        for (ShakeFormComponent formComponent : shakeForm.getComponents()) {
            if (formComponent instanceof ShakeTitle) {
                ShakeTitle component = ((ShakeTitle) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("key", component.getKey());
                componentMap.putString("label", component.getLabelValue());
                componentMap.putString("labelRes", resToString(context, component.getLabel()));
                componentMap.putString("initialValue", component.getInitialValue());
                componentMap.putBoolean("required", component.getRequired());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakeTextInput) {
                ShakeTextInput component = ((ShakeTextInput) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("key", component.getKey());
                componentMap.putString("label", component.getLabelValue());
                componentMap.putString("labelRes", resToString(context, component.getLabel()));
                componentMap.putString("initialValue", component.getInitialValue());
                componentMap.putBoolean("required", component.getRequired());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakeEmail) {
                ShakeEmail component = ((ShakeEmail) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("key", component.getKey());
                componentMap.putString("label", component.getLabelValue());
                componentMap.putString("labelRes", resToString(context, component.getLabel()));
                componentMap.putString("initialValue", component.getInitialValue());
                componentMap.putBoolean("required", component.getRequired());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakePicker) {
                ShakePicker component = ((ShakePicker) formComponent);

                WritableArray items = new WritableNativeArray();
                for (ShakePickerItem item : component.getItems()) {
                    WritableMap itemMap = new WritableNativeMap();
                    itemMap.putString("key", item.getKey());
                    itemMap.putString("text", item.getTextValue());
                    itemMap.putString("icon", convertDrawableToBase64(item.getIconValue()));
                    itemMap.putString("tag", item.getTag());

                    itemMap.putString("textRes", resToString(context, item.getText()));
                    itemMap.putString("iconRes", resToString(context, item.getIcon()));

                    items.pushMap(itemMap);
                }

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("key", component.getKey());
                componentMap.putString("label", component.getLabelValue());
                componentMap.putString("labelRes", resToString(context, component.getLabel()));
                componentMap.putArray("items", items);

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakeAttachments) {
                ShakeAttachments component = ((ShakeAttachments) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakeInspectButton) {
                ShakeInspectButton component = ((ShakeInspectButton) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());

                componentsArray.pushMap(componentMap);
            }
        }

        WritableMap shakeFormMap = new WritableNativeMap();
        shakeFormMap.putArray("components", componentsArray);

        return shakeFormMap;
    }

    public ShakeTheme mapMapToShakeTheme(ReadableMap shakeThemeMap) {
        if (shakeThemeMap == null) return null;

        String fontFamilyBold = shakeThemeMap.hasKey("fontFamilyBold") ? shakeThemeMap.getString("fontFamilyBold") : null;
        String fontFamilyMedium = shakeThemeMap.hasKey("fontFamilyMedium") ? shakeThemeMap.getString("fontFamilyMedium") : null;
        String backgroundColor = shakeThemeMap.hasKey("backgroundColor") ? shakeThemeMap.getString("backgroundColor") : null;
        String secondaryBackgroundColor = shakeThemeMap.hasKey("secondaryBackgroundColor") ? shakeThemeMap.getString("secondaryBackgroundColor") : null;
        String textColor = shakeThemeMap.hasKey("textColor") ? shakeThemeMap.getString("textColor") : null;
        String secondaryTextColor = shakeThemeMap.hasKey("secondaryTextColor") ? shakeThemeMap.getString("secondaryTextColor") : null;
        String accentColor = shakeThemeMap.hasKey("accentColor") ? shakeThemeMap.getString("accentColor") : null;
        String accentTextColor = shakeThemeMap.hasKey("accentTextColor") ? shakeThemeMap.getString("accentTextColor") : null;
        String outlineColor = shakeThemeMap.hasKey("outlineColor") ? shakeThemeMap.getString("outlineColor") : null;
        Double borderRadius = shakeThemeMap.hasKey("borderRadius") ? shakeThemeMap.getDouble("borderRadius") : null;
        Double elevation = shakeThemeMap.hasKey("elevation") ? shakeThemeMap.getDouble("elevation") : null;

        ShakeTheme shakeTheme = new ShakeTheme();
        shakeTheme.setFontFamilyBoldValue(findAssetPath(context, fontFamilyBold));
        shakeTheme.setFontFamilyMediumValue(findAssetPath(context, fontFamilyMedium));
        shakeTheme.setBackgroundColorValue(Converter.stringToColor(backgroundColor));
        shakeTheme.setSecondaryBackgroundColorValue(Converter.stringToColor(secondaryBackgroundColor));
        shakeTheme.setTextColorValue(Converter.stringToColor(textColor));
        shakeTheme.setSecondaryTextColorValue(Converter.stringToColor(secondaryTextColor));
        shakeTheme.setAccentColorValue(Converter.stringToColor(accentColor));
        shakeTheme.setAccentTextColorValue(Converter.stringToColor(accentTextColor));
        shakeTheme.setOutlineColorValue(Converter.stringToColor(outlineColor));
        shakeTheme.setBorderRadiusValue(Converter.convertDpToPixels(context, borderRadius));
        shakeTheme.setElevationValue(Converter.convertDpToPixels(context, elevation));

        return shakeTheme;
    }

    public ArrayList<ShakeHomeAction> mapArrayToHomeActions(ReadableArray array) {
        if (array == null) return null;

        ArrayList<ShakeHomeAction> homeActions = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            ReadableMap actionMap = array.getMap(i);

            String type = actionMap.getString("type");
            if (type == null) continue;

            String title;
            String subtitle;
            String icon;

            switch (type) {
                case "chat":
                    title = actionMap.getString("title");
                    subtitle = actionMap.getString("subtitle");
                    icon = actionMap.getString("icon");

                    ShakeHomeChatAction chatAction = new ShakeHomeChatAction(title, subtitle, convertBase64ToDrawable(context, icon));
                    chatAction.setTitle(stringToRes(context, actionMap.getString("titleRes"), "string"));
                    chatAction.setSubtitle(stringToRes(context, actionMap.getString("subtitleRes"), "string"));
                    chatAction.setIcon(stringToRes(context, actionMap.getString("iconRes"), "drawable"));

                    homeActions.add(chatAction);
                    break;
                case "submit":
                    title = actionMap.getString("title");
                    subtitle = actionMap.getString("subtitle");
                    icon = actionMap.getString("icon");

                    ShakeHomeSubmitAction submitAction = new ShakeHomeSubmitAction(title, subtitle, convertBase64ToDrawable(context, icon));
                    submitAction.setTitle(stringToRes(context, actionMap.getString("titleRes"), "string"));
                    submitAction.setSubtitle(stringToRes(context, actionMap.getString("subtitleRes"), "string"));
                    submitAction.setIcon(stringToRes(context, actionMap.getString("iconRes"), "drawable"));

                    homeActions.add(submitAction);
                    break;
                case "default":
                    title = actionMap.getString("title");
                    subtitle = actionMap.getString("subtitle");
                    icon = actionMap.getString("icon");

                    ShakeHomeAction homeAction = new ShakeHomeAction(title, subtitle, convertBase64ToDrawable(context, icon), null);
                    homeAction.setTitle(stringToRes(context, actionMap.getString("titleRes"), "string"));
                    homeAction.setSubtitle(stringToRes(context, actionMap.getString("subtitleRes"), "string"));
                    homeAction.setIcon(stringToRes(context, actionMap.getString("iconRes"), "drawable"));

                    homeActions.add(homeAction);
                    break;
            }
        }
        return homeActions;
    }

    public NetworkRequest mapToNetworkRequest(ReadableMap object) {
        if (object == null) return null;

        NetworkRequest networkRequest = new NetworkRequest();
        networkRequest.setUrl(object.getString("url"));
        networkRequest.setMethod(object.getString("method"));
        networkRequest.setRequestBody(object.getString("requestBody"));
        networkRequest.setRequestHeaders(toStringMap(object.getMap("requestHeaders")));
        networkRequest.setResponseBody(object.getString("responseBody"));
        networkRequest.setResponseHeaders(toStringMap(object.getMap("responseHeaders")));
        networkRequest.setStatusCode(object.getString("statusCode"));
        networkRequest.setTimestamp(object.getString("timestamp"));
        networkRequest.setDuration((float) object.getDouble("duration"));

        return networkRequest;
    }

    public NotificationEvent mapToNotificationEvent(ReadableMap object) {
        if (object == null) return null;

        String id = object.hasKey("id") && !object.isNull("id") ? object.getString("id") : "";
        String title = object.hasKey("title") && !object.isNull("title") ? object.getString("title") : "";
        String description = object.hasKey("description") && !object.isNull("description") ? object.getString("description") : "";

        NotificationEvent notificationEvent = new NotificationEvent();
        notificationEvent.setId(Converter.stringToInt(id));
        notificationEvent.setTitle(title);
        notificationEvent.setDescription(description);

        return notificationEvent;
    }

    public WritableMap notificationEventToMap(NotificationEvent notificationEvent) {

        int id = notificationEvent.getId();
        String title = notificationEvent.getTitle() == null ? "" : notificationEvent.getTitle();
        String description = notificationEvent.getDescription() == null ? "" : notificationEvent.getDescription();

        WritableMap map = new WritableNativeMap();
        map.putString("id", String.valueOf(id));
        map.putString("title", title);
        map.putString("description", description);

        return map;
    }

    public Map<String, String> mapToUserMetadata(ReadableMap metadata) {
        if (metadata == null) return null;

        Map<String, Object> map = toMap(metadata);

        Map<String, String> stringMap = new HashMap<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getValue() == null) {
                stringMap.put(entry.getKey(), null);
            } else {
                stringMap.put(entry.getKey(), String.valueOf(entry.getValue()));
            }
        }

        return stringMap;
    }

    private Map<String, Object> toMap(ReadableMap readableMap) {

        Map<String, Object> map = new HashMap<>();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);

            switch (type) {
                case Null:
                    map.put(key, null);
                    break;
                case Boolean:
                    map.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    map.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    map.put(key, readableMap.getString(key));
                    break;
                case Map:
                    ReadableMap m = readableMap.getMap(key);
                    if (m != null) map.put(key, toMap(m));

                    break;
                case Array:
                    ReadableArray a = readableMap.getArray(key);
                    if (a != null) map.put(key, toArray(a));
                    break;
            }
        }

        return map;
    }

    private Map<String, String> toStringMap(ReadableMap readableMap) {
        Map<String, Object> map = toMap(readableMap);

        Map<String, String> stringMap = new HashMap<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getValue() instanceof String) {
                stringMap.put(entry.getKey(), (String) entry.getValue());
            }
        }

        return stringMap;
    }

    private Object[] toArray(ReadableArray readableArray) {
        Object[] array = new Object[readableArray.size()];

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);

            switch (type) {
                case Null:
                    array[i] = null;
                    break;
                case Boolean:
                    array[i] = readableArray.getBoolean(i);
                    break;
                case Number:
                    array[i] = readableArray.getDouble(i);
                    break;
                case String:
                    array[i] = readableArray.getString(i);
                    break;
                case Map:
                    array[i] = toMap(readableArray.getMap(i));
                    break;
                case Array:
                    array[i] = toArray(readableArray.getArray(i));
                    break;
            }
        }

        return array;
    }

    private String findAssetPath(Context context, String assetName) {
        if (assetName == null) return null;

        String[] assetPaths = new String[]{"fonts", "images", "sounds"};
        for (String assetPath : assetPaths) {
            try {
                String[] assets = context.getAssets().list(assetPath);
                for (String asset : assets) {
                    if (asset.contains(assetName)) {
                        return assetPath + "/" + asset;
                    }
                }
            } catch (Exception ignore) {
            }
        }
        return null;
    }
}
