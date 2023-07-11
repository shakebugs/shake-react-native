package com.shakebugs.react.utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.util.Base64;
import android.util.DisplayMetrics;

import java.io.ByteArrayOutputStream;

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

    public static Drawable convertBase64ToDrawable(Context context, String base64String) {
        Drawable drawable = null;
        try {
            byte[] decodedBytes = Base64.decode(base64String, Base64.DEFAULT);
            Bitmap decodedBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
            drawable = new BitmapDrawable(context.getResources(), decodedBitmap);
        } catch (Exception ignore) {
        }
        return drawable;
    }

    public static String convertDrawableToBase64(Drawable drawable) {
        String result = null;
        try {
            if (drawable instanceof BitmapDrawable) {
                BitmapDrawable bitmapDrawable = (BitmapDrawable) drawable;
                Bitmap bitmap = bitmapDrawable.getBitmap();
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                byte[] byteArray = byteArrayOutputStream.toByteArray();
                result = Base64.encodeToString(byteArray, Base64.DEFAULT);
            }
        } catch (Exception ignore) {
        }
        return result;
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
