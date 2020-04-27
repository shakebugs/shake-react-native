package com.reactlibrary.utils;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.shakebugs.shake.ShakeInvocationEvent;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.report.ShakeFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Maps ReactNative objects to models
 */
public class Mapper {
    public static ShakeInvocationEvent[] mapToShakeInvocationEvents(ReadableArray stringInvocationEvents) {
        ShakeInvocationEvent[] array = new ShakeInvocationEvent[stringInvocationEvents.size()];
        for (int i = 0; i < stringInvocationEvents.size(); i++) {
            array[i] = ShakeInvocationEvent.valueOf(stringInvocationEvents.getString(i));
        }
        return array;
    }

    public static List<ShakeFile> mapToShakeFiles(ReadableArray filePaths) {
        List<ShakeFile> shakeFiles = new ArrayList<>();
        for (int i = 0; i < filePaths.size(); i++) {
            shakeFiles.add(new ShakeFile(filePaths.getString(i)));
        }
        return shakeFiles;
    }

    public static NetworkRequest mapToNetworkRequest(ReadableMap object) {
        Map requestsHeaderMap = toMap(object.getMap("requestHeaders"));
        Map responseHeadersMap = toMap(object.getMap("requestHeaders"));

        NetworkRequest networkRequest = new NetworkRequest();
        networkRequest.url = object.getString("url");
        networkRequest.method = object.getString("method");
        networkRequest.requestBody = object.getString("requestBody");
        networkRequest.requestHeaders = new HashMap<>(requestsHeaderMap);
        networkRequest.responseBody = object.getString("responseBody");
        networkRequest.responseHeaders = new HashMap<>(responseHeadersMap);
        networkRequest.statusCode = String.valueOf(object.getDouble("statusCode"));
        networkRequest.timestamp = object.getString("timestamp");
        networkRequest.duration = (float) object.getDouble("duration");

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
