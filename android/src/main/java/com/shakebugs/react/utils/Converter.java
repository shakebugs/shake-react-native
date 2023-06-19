package com.shakebugs.react.utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.util.DisplayMetrics;

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

    public static String resToString(Context context, Integer resourceId) {
        if (resourceId == null) return null;

        String icon = null;
        try {
            icon = context.getResources().getResourceEntryName(resourceId);
        } catch (Exception ignore) {
        }
        return icon;
    }

    @SuppressLint("DiscouragedApi")
    public static Integer stringToRes(Context context, String resName, String type) {
        if (resName == null) return null;

        Integer iconRes = null;
        try {
            iconRes = context.getResources().getIdentifier(resName, type, context.getPackageName());
        } catch (Exception ignore) {
        }
        return iconRes;
    }

    public static Float convertDpToPixels(Context context, Double dp) {
        if (dp == null) return null;
        return dp.floatValue() * (context.getResources().getDisplayMetrics().densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    }

    public static Float convertPixelsToDp(Context context, Double px) {
        if (px == null) return null;
        return px.floatValue() / (context.getResources().getDisplayMetrics().densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    }

    public static Integer stringToColor(String color) {
        if (color == null) return null;
        return Color.parseColor(color);
    }
}
