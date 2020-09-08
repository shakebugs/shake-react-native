package com.shakebugs.react.utils;

import android.app.Activity;
import android.os.Build;

import static android.content.pm.PackageManager.PERMISSION_GRANTED;

/**
 * Permission utils
 */
public class Permissions {
    /**
     * @param permission Permission string
     * @return true if permission is granted, false otherwise
     */
    public static boolean checkHasPermission(Activity activity, String permission) {
        return activity.checkCallingOrSelfPermission(permission) == PERMISSION_GRANTED;
    }

    /**
     * Requests the permission.
     *
     * @param activity   Activity
     * @param permission Permission string
     */
    public static void requestPermission(Activity activity, String permission) {
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
            if (!checkHasPermission(activity, permission)) {
                activity.requestPermissions(new String[]{permission}, 1);
            }
        }
    }
}
