package com.shakebugs.react.utils;

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
import com.shakebugs.shake.internal.domain.models.NotificationEvent;
import com.shakebugs.shake.internal.domain.models.NetworkRequest;
import com.shakebugs.shake.report.FeedbackType;
import com.shakebugs.shake.report.ShakeFile;

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
            shakeScreen = ShakeScreen.valueOf(shakeScreenMap.getString("value"));
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
        boolean showReportSentMessage = configurationMap.getBoolean("showReportSentMessage");

        ShakeReportConfiguration configuration = new ShakeReportConfiguration();
        configuration.blackBoxData = blackBoxData;
        configuration.activityHistoryData = activityHistoryData;
        configuration.screenshot = screenshot;
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

    public List<FeedbackType> mapArrayToFeedbackTypes(ReadableArray feedbackTypesArray) {
        if (feedbackTypesArray == null) return null;

        List<FeedbackType> feedbackTypes = new ArrayList<>();
        for (int i = 0; i < feedbackTypesArray.size(); i++) {
            ReadableMap feedbackTypeMap = feedbackTypesArray.getMap(i);

            String title = feedbackTypeMap.getString("title");
            String tag = feedbackTypeMap.getString("tag");
            String icon = feedbackTypeMap.getString("icon");

            if (title == null || title.trim().isEmpty()) continue;
            if (tag == null || tag.trim().isEmpty()) continue;

            int iconRes = 0;
            try {
                iconRes = context.getResources().getIdentifier(icon, "drawable", context.getPackageName());
            } catch (Exception ignore) {
            }

            if (iconRes != 0) feedbackTypes.add(new FeedbackType(iconRes, title, tag));
            if (iconRes == 0) feedbackTypes.add(new FeedbackType(title, tag));
        }

        return feedbackTypes;
    }

    public WritableArray mapFeedbackTypesToArray(List<FeedbackType> feedbackTypes) {
        if (feedbackTypes == null) return null;

        WritableArray feedbackTypesArray = new WritableNativeArray();

        for (FeedbackType feedbackType : feedbackTypes) {

            if (feedbackType.getTitle() == null) {
                feedbackType.setTitle(context.getString(feedbackType.getTitleRes()));
            }

            String feedbackIcon = "";
            try {
                feedbackIcon = context.getResources().getResourceEntryName(feedbackType.getIcon());
            } catch (Exception ignore) {
            }

            WritableMap feedbackTypeMap = new WritableNativeMap();
            feedbackTypeMap.putString("title", feedbackType.getTitle());
            feedbackTypeMap.putString("tag", feedbackType.getTag());
            feedbackTypeMap.putString("icon", feedbackIcon);

            feedbackTypesArray.pushMap(feedbackTypeMap);
        }

        return feedbackTypesArray;
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
                    map.put(key, toMap(readableMap.getMap(key)));
                    break;
                case Array:
                    map.put(key, toArray(readableMap.getArray(key)));
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
}
