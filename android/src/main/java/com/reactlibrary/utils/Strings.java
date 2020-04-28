package com.reactlibrary.utils;

/**
 * String utils
 */
public final class Strings {
    public static boolean isNullOrEmpty(String string) {
        if (string == null) {
            return true;
        }
        return string.isEmpty();
    }
}