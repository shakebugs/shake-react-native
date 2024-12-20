package com.shakebugs.react.utils

import android.util.Log
import com.shakebugs.shake.Shake

object Logger {
    fun v(msg: String): Int {
        return Log.v(Shake::class.java.simpleName, msg)
    }

    fun v(msg: String, tr: Throwable?): Int {
        return Log.v(Shake::class.java.simpleName, msg, tr)
    }

    fun d(msg: String): Int {
        return Log.d(Shake::class.java.simpleName, msg)
    }

    fun d(msg: String, tr: Throwable?): Int {
        return Log.d(Shake::class.java.simpleName, msg, tr)
    }

    fun i(msg: String): Int {
        return Log.i(Shake::class.java.simpleName, msg)
    }

    fun i(msg: String, tr: Throwable?): Int {
        return Log.i(Shake::class.java.simpleName, msg, tr)
    }

    fun w(msg: String): Int {
        return Log.w(Shake::class.java.simpleName, msg)
    }

    fun w(msg: String, tr: Throwable?): Int {
        return Log.w(Shake::class.java.simpleName, msg, tr)
    }

    fun w(tr: Throwable?): Int {
        return Log.w(Shake::class.java.simpleName, tr)
    }

    fun e(msg: String): Int {
        return Log.e(Shake::class.java.simpleName, msg)
    }

    @JvmStatic
    fun e(msg: String, tr: Throwable?): Int {
        return Log.e(Shake::class.java.simpleName, msg, tr)
    }
}
