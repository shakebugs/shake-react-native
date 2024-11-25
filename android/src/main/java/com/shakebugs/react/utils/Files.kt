package com.shakebugs.react.utils

internal object Files {
    @JvmStatic
    fun removeExtension(fileName: String): String {
        val index = fileName.lastIndexOf('.')
        return if (index == -1 || index == 0) {
            fileName
        } else {
            fileName.substring(0, index)
        }
    }
}
