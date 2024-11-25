package com.shakebugs.react.utils

import java.lang.reflect.Method

object Reflection {
    fun getMethod(clazz: Class<*>, methodName: String, vararg parameterType: Class<*>): Method? {
        val methods = clazz.declaredMethods

        for (method in methods) {
            if (method.name == methodName && method.parameterTypes.size ==
                parameterType.size
            ) {
                if (parameterType.isEmpty()) {
                    method.isAccessible = true
                    return method
                }
                for (i in parameterType.indices) {
                    if (method.parameterTypes[i] == parameterType[i]) {
                        if (i == method.parameterTypes.size - 1) {
                            method.isAccessible = true
                            return method
                        }
                    } else {
                        break
                    }
                }
            }
        }
        return null
    }
}
