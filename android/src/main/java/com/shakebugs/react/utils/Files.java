package com.shakebugs.react.utils;

class Files {
    public static String removeExtension(String fileName) {
        if (fileName == null) {
            return null;
        }

        int index = fileName.lastIndexOf('.');
        if (index == -1 || index == 0) {
            return fileName;
        } else {
            return fileName.substring(0, index);
        }
    }
}
