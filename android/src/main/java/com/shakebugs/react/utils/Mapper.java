package com.shakebugs.react.utils;

import static com.shakebugs.react.utils.Converter.resToString;

import android.content.Context;
import android.graphics.Color;
import android.util.Log;

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

import java.io.IOException;
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
                String label = componentMap.getString("label");
                String labelResName = componentMap.getString("labelRes");
                String initialValue = componentMap.getString("initialValue");
                boolean required = componentMap.getBoolean("required");

                if (label == null) label = "";
                if (initialValue == null) initialValue = "";
                Integer labelRes = Converter.stringToRes(context, labelResName, "string");


                formComponents.add(new ShakeTitle(label, labelRes, initialValue, required));
            }
            if ("text_input".equals(type)) {
                String label = componentMap.getString("label");
                String labelResName = componentMap.getString("labelRes");
                String initialValue = componentMap.getString("initialValue");
                boolean required = componentMap.getBoolean("required");

                if (label == null) label = "";
                if (initialValue == null) initialValue = "";
                Integer labelRes = Converter.stringToRes(context, labelResName, "string");

                formComponents.add(new ShakeTextInput(label, labelRes, initialValue, required));
            }
            if ("email".equals(type)) {
                String label = componentMap.getString("label");
                String labelResName = componentMap.getString("labelRes");
                String initialValue = componentMap.getString("initialValue");
                boolean required = componentMap.getBoolean("required");

                if (label == null) label = "";
                if (initialValue == null) initialValue = "";
                Integer labelRes = Converter.stringToRes(context, labelResName, "string");

                formComponents.add(new ShakeEmail(label, labelRes, initialValue, required));
            }
            if ("picker".equals(type)) {
                String label = componentMap.getString("label");
                String labelResName = componentMap.getString("labelRes");
                ReadableArray itemsArray = componentMap.getArray("items");

                List<ShakePickerItem> items = new ArrayList<>();
                if (itemsArray != null) {
                    for (int j = 0; j < itemsArray.size(); j++) {
                        ReadableMap itemMap = itemsArray.getMap(j);
                        String icon = itemMap.getString("icon");
                        String text = itemMap.getString("text");
                        String textResName = itemMap.getString("textRes");
                        String tag = itemMap.getString("tag");

                        if (text == null) text = "";
                        Integer iconRes = Converter.stringToRes(context, icon, "drawable");
                        Integer textRes = Converter.stringToRes(context, textResName, "string");

                        items.add(new ShakePickerItem(iconRes, text, textRes, tag));
                    }
                }

                if (label == null) label = "";
                Integer labelRes = Converter.stringToRes(context, labelResName, "string");

                formComponents.add(new ShakePicker(label, labelRes, items));
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

    public ShakeTheme mapMapToShakeTheme(ReadableMap shakeThemeMap) {
        if (shakeThemeMap == null) return null;

        String fontFamilyBold = shakeThemeMap.getString("fontFamilyBold");
        String fontFamilyMedium = shakeThemeMap.getString("fontFamilyMedium");
        String backgroundColor = shakeThemeMap.getString("backgroundColor");
        String secondaryBackgroundColor = shakeThemeMap.getString("secondaryBackgroundColor");
        String textColor = shakeThemeMap.getString("textColor");
        String secondaryTextColor = shakeThemeMap.getString("secondaryTextColor");
        String accentColor = shakeThemeMap.getString("accentColor");
        String accentTextColor = shakeThemeMap.getString("accentTextColor");
        String outlineColor = shakeThemeMap.getString("outlineColor");
        double borderRadius = shakeThemeMap.getDouble("borderRadius");
        double elevation = shakeThemeMap.getDouble("elevation");

        ShakeTheme shakeTheme = new ShakeTheme();
        shakeTheme.setFontFamilyBoldValue(findAssetPath(context, fontFamilyBold));
        shakeTheme.setFontFamilyMediumValue(findAssetPath(context, fontFamilyMedium));
        shakeTheme.setBackgroundColorValue(Color.parseColor(backgroundColor));
        shakeTheme.setSecondaryBackgroundColorValue(Color.parseColor(secondaryBackgroundColor));
        shakeTheme.setTextColorValue(Color.parseColor(textColor));
        shakeTheme.setSecondaryTextColorValue(Color.parseColor(secondaryTextColor));
        shakeTheme.setAccentColorValue(Color.parseColor(accentColor));
        shakeTheme.setAccentTextColorValue(Color.parseColor(accentTextColor));
        shakeTheme.setOutlineColorValue(Color.parseColor(outlineColor));
        shakeTheme.setBorderRadiusValue((float)borderRadius);
        shakeTheme.setElevationValue((float)elevation);

        return shakeTheme;
    }

    public WritableMap mapShakeFormToMap(ShakeForm shakeForm) {
        if (shakeForm == null) return null;

        WritableArray componentsArray = new WritableNativeArray();

        for (ShakeFormComponent formComponent : shakeForm.getComponents()) {
            if (formComponent instanceof ShakeTitle) {
                ShakeTitle component = ((ShakeTitle) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("label", component.getLabel());
                componentMap.putString("labelRes", resToString(context, component.getLabelRes()));
                componentMap.putString("initialValue", component.getInitialValue());
                componentMap.putBoolean("required", component.getRequired());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakeTextInput) {
                ShakeTextInput component = ((ShakeTextInput) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("label", component.getLabel());
                componentMap.putString("labelRes", resToString(context, component.getLabelRes()));
                componentMap.putString("initialValue", component.getInitialValue());
                componentMap.putBoolean("required", component.getRequired());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakeEmail) {
                ShakeEmail component = ((ShakeEmail) formComponent);

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("label", component.getLabel());
                componentMap.putString("labelRes", resToString(context, component.getLabelRes()));
                componentMap.putString("initialValue", component.getInitialValue());
                componentMap.putBoolean("required", component.getRequired());

                componentsArray.pushMap(componentMap);
            }
            if (formComponent instanceof ShakePicker) {
                ShakePicker component = ((ShakePicker) formComponent);

                WritableArray items = new WritableNativeArray();
                for (ShakePickerItem item : component.getItems()) {
                    WritableMap itemMap = new WritableNativeMap();
                    itemMap.putString("icon", resToString(context, item.getIcon()));
                    itemMap.putString("text", item.getText());
                    itemMap.putString("textRes", resToString(context, item.getTextRes()));
                    itemMap.putString("tag", item.getTag());

                    items.pushMap(itemMap);
                }

                WritableMap componentMap = new WritableNativeMap();
                componentMap.putString("type", component.getType());
                componentMap.putString("label", component.getLabel());
                componentMap.putString("labelRes", resToString(context, component.getLabelRes()));
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
        String[] assetPaths = new String[] { "fonts", "images", "sounds" };
        for (String assetPath : assetPaths) {
            try {
                String[] assets = context.getAssets().list(assetPath);
                for (String asset : assets) {
                    if (asset.contains(assetName)) {
                        return assetPath + "/" + asset;
                    }
                }
            } catch (IOException ignore) {
            }
        }
        return null;
    }
}
