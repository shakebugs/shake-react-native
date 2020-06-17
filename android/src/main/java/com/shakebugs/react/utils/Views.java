package com.shakebugs.react.utils;

import android.view.View;

/**
 * View utils
 */
public class Views {
    /**
     * Gets view entry name.
     *
     * @param view View
     * @return View id or accessibility label
     */
    public static String getViewEntryName(View view) {
        String entryName = null;

        try {
            entryName = view
                    .getResources()
                    .getResourceEntryName(view.getId());
        } catch (Exception ignored) {
        }

        if (Strings.isNullOrEmpty(entryName)) {
            entryName = (String) view.getContentDescription();
        }

        return entryName;
    }
}
