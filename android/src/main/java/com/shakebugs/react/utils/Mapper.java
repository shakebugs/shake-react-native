package com.shakebugs.react.utils;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.shakebugs.shake.ShakeReportConfiguration;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.report.ShakeFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Maps React Native data to models
 */
public class Mapper {
   public static ShakeReportConfiguration mapToConfiguration(ReadableMap configurationMap) {

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

    public static List<ShakeFile> mapToShakeFiles(ReadableArray filePaths) {
        List<ShakeFile> shakeFiles = new ArrayList<>();
        for (int i = 0; i < filePaths.size(); i++) {
            ReadableMap fileMap = filePaths.getMap(i);

            String filePath = fileMap.getString("path");
            String fileName = fileMap.getString("name");

            String name = Files.removeExtension(fileName);

            shakeFiles.add(new ShakeFile(name, filePath));
        }
        return shakeFiles;
    }

    public static NetworkRequest mapToNetworkRequest(ReadableMap object) {
        NetworkRequest networkRequest = new NetworkRequest();
        networkRequest.setUrl(object.getString("url"));
        networkRequest.setMethod(object.getString("method"));
        networkRequest.setRequestBody(object.getString("requestBody"));
        networkRequest.setRequestHeaders(toStringMap(object.getMap("requestHeaders")));
        networkRequest.setResponseBody(object.getString("responseBody"));
        networkRequest.setResponseHeaders(toStringMap(object.getMap("responseHeaders")));
        networkRequest.setStatusCode(String.valueOf(object.getInt("statusCode")));
        networkRequest.setTimestamp(object.getString("timestamp"));
        networkRequest.setDuration((float) object.getDouble("duration"));

        return networkRequest;
    }

    private static Map<String, Object> toMap(ReadableMap readableMap) {
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

    private static Map<String, String> toStringMap(ReadableMap readableMap) {
        Map<String, Object> map = toMap(readableMap);

        Map<String, String> stringMap = new HashMap<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getValue() instanceof String) {
                stringMap.put(entry.getKey(), (String) entry.getValue());
            }
        }

        return stringMap;
    }

    private static Object[] toArray(ReadableArray readableArray) {
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
