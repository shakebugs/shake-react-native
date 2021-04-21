package com.shakebugs.react.utils;

public class Converter {
    public static int stringToInt(String string) {
        int result = 0;

        try {
            result = Integer.parseInt(string);
        } catch (Exception e) {
            Logger.w("Notification id is not a valid integer.");
        }

        return result;
    }
}
