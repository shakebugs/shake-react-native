package com.shakebugs.react.utils;

import android.util.Log;

import com.shakebugs.shake.Shake;

public class Logger {
    public static int v(String msg) {
        return Log.v(Shake.class.getSimpleName(), String.valueOf(msg));
    }

    public static int v(String msg, Throwable tr) {
        return Log.v(Shake.class.getSimpleName(), String.valueOf(msg), tr);
    }

    public static int d(String msg) {
        return Log.d(Shake.class.getSimpleName(), String.valueOf(msg));
    }

    public static int d(String msg, Throwable tr) {
        return Log.d(Shake.class.getSimpleName(), String.valueOf(msg), tr);
    }

    public static int i(String msg) {
        return Log.i(Shake.class.getSimpleName(), String.valueOf(msg));
    }

    public static int i(String msg, Throwable tr) {
        return Log.i(Shake.class.getSimpleName(), String.valueOf(msg), tr);
    }

    public static int w(String msg) {
        return Log.w(Shake.class.getSimpleName(), String.valueOf(msg));
    }

    public static int w(String msg, Throwable tr) {
        return Log.w(Shake.class.getSimpleName(), String.valueOf(msg), tr);
    }

    public static int w(Throwable tr) {
        return Log.w(Shake.class.getSimpleName(), tr);
    }

    public static int e(String msg) {
        return Log.e(Shake.class.getSimpleName(), String.valueOf(msg));
    }

    public static int e(String msg, Throwable tr) {
        return Log.e(Shake.class.getSimpleName(), String.valueOf(msg), tr);
    }
}
