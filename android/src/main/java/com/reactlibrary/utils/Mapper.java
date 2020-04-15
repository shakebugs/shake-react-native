package com.reactlibrary.utils;

import com.facebook.react.bridge.ReadableArray;
import com.shakebugs.shake.ShakeInvocationEvent;
import com.shakebugs.shake.report.ShakeFile;

import java.util.ArrayList;
import java.util.List;

public class Mapper {
    public static ShakeInvocationEvent[] mapToInvocationEvents(ReadableArray stringInvocationEvents) {
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
}
