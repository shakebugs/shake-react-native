package com.shakebugs.react.utils;

import android.app.Activity;
import android.os.Build;

import java.util.ArrayList;
import java.util.List;

import static android.content.pm.PackageManager.PERMISSION_GRANTED;

/**
 * Permission utils
 */
public class Permissions {
    /**
     * @param permission
     * @return true if permission is granted, false otherwise
     */
    public static boolean checkHasPermission(Activity activity, String permission) {
        int result = activity.checkCallingOrSelfPermission(permission);
        return result == PERMISSION_GRANTED;
    }

    /**
     * Requests the permission.
     *
     * @param activity
     * @param permissions
     */
    public static void requestPermissions(Activity activity, String[] permissions) {
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
            List<String> permissionsToRequest= new ArrayList<>();
            for (String permission: permissions) {
                if (!checkHasPermission(activity, permission)) {
                    permissionsToRequest.add(permission);
                }
            }

            String[] array = new String[permissionsToRequest.size()];
            permissionsToRequest.toArray(array);

            activity.requestPermissions(array, 1);
        }
    }
}
