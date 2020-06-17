package com.shakebugs.react.utils;

/**
 * String utils.
 */
public final class Strings {
    /**
     * Checks if string is null or empty
     *
     * @param string String to check
     * @return true if null or empty, otherwise false
     */
    public static boolean isNullOrEmpty(String string) {
        if (string == null) {
            return true;
        }
        return string.isEmpty();
    }

    /**
     * Returns empty string if is null
     *
     * @param string String to check
     * @return Empty string if null, otherwise input string
     */
    public static String emptyIfNull(String string) {
        if (string == null) {
            return "";
        }

        return string;
    }
}
