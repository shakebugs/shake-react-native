package com.shakebugs.react.utils;

import java.io.File;

/**
 * Files utils
 */
class Files {
    /**
     * Returns file name without extension.
     * <p/>
     *
     * @param file File
     * @return File name without extension
     */
    public static String getFileNameWithoutExtension(File file) {
        return removeExtension(file.getName());
    }

    /**
     * Removes extension from file name.
     * <p/>
     * e.g. removeExtension("file.txt") will return "file"
     *
     * @param fileName File name
     * @return File name without extension
     */
    public static String removeExtension(String fileName) {
        int index = fileName.lastIndexOf('.');
        if (index == -1) {
            return fileName;
        } else {
            return fileName.substring(0, index);
        }
    }
}
