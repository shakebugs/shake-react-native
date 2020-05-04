package com.reactlibrary.touch;

import android.app.Activity;
import android.content.Context;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.reactlibrary.db.SqliteDatabase;
import com.reactlibrary.utils.Dates;
import com.reactlibrary.utils.Strings;
import com.reactlibrary.utils.Views;
import com.shakebugs.shake.internal.data.TouchEvent;

/**
 * Used for tracking user touches.
 */
public class TouchTracker {
    private static final String GOOGLE_MAPS_VIEW_CLASS_PACKAGE = "android.widget.FrameLayout";
    private static final String GOOGLE_MAPS_VIEW_CLASS_ID = "map";
    private static final String GOOGLE_MAPS_CLASS_NAME = "GoogleMap";

    private static final String CALENDAR_VIEW_CLASS_PACKAGE = "android.widget.CalendarView";
    private static final String CALENDAR_VIEW_CLASS_NAME = "CalendarView";

    private static final String BOTTOM_NAVIGATION_VIEW_PACKAGE = "com.google.android.material.bottomnavigation.BottomNavigationView";
    private static final String BOTTOM_NAVIGATION_VIEW_OLD_PACKAGE = "android.support.design.widget.BottomNavigationView";
    private static final String BOTTOM_NAVIGATION_VIEW_CLASS_NAME = "BottomNavigationView";

    private static final String TAB_LAYOUT_CLASS_PACKAGE = "com.google.android.material.tabs.TabLayout";
    private static final String TAB_LAYOUT_CLASS_OLD_PACKAGE = "android.support.design.widget.TabLayout";
    private static final String TAB_LAYOUT_CLASS_NAME = "TabView";

    private static final String TOUCH_TYPE_TAP = "Tap";
    private static final String TOUCH_TYPE_PAN = "Pan";
    private static final String TOUCH_TYPE_LONG_PRESS = "LongPress";

    private final Context context;
    private final GestureDetector gestureDetector;

    private View currentRootView;

    public TouchTracker(Context context) {
        this.context = context;
        this.gestureDetector = new GestureDetector(
                context,
                new UserTouchEventListener());
    }

    /**
     * Delegates motion event to gesture detector.
     *
     * @param event    motion event
     * @param activity activity
     */
    public void handleTouchEvent(MotionEvent event, Activity activity) {
        currentRootView = activity.findViewById(android.R.id.content);
        currentRootView = ((ViewGroup) currentRootView).getChildAt(0).getRootView();
        gestureDetector.onTouchEvent(event);
    }

    /**
     * Finds clicked view and inserts touch event to database.
     */
    private void onTouchEvent(MotionEvent event, String touchType) {
        View clickedView = findClickedView(event, currentRootView);
        if (clickedView != null) {
            String className = clickedView.getClass().getSimpleName();
            String property = Strings.emptyIfNull(Views.getViewEntryName(clickedView));

            String name = clickedView.getClass().getName();
            if (name.startsWith(GOOGLE_MAPS_VIEW_CLASS_PACKAGE) && property.equals(GOOGLE_MAPS_VIEW_CLASS_ID)) {
                className = GOOGLE_MAPS_CLASS_NAME;
                property = "";
            }

            if (name.startsWith(CALENDAR_VIEW_CLASS_PACKAGE)) {
                className = CALENDAR_VIEW_CLASS_NAME;
                property = "";
            }

            if (name.contains(BOTTOM_NAVIGATION_VIEW_PACKAGE) || name.contains(BOTTOM_NAVIGATION_VIEW_OLD_PACKAGE)) {
                className = BOTTOM_NAVIGATION_VIEW_CLASS_NAME;
                property = "";
            }

            if (name.contains(TAB_LAYOUT_CLASS_PACKAGE) || name.contains(TAB_LAYOUT_CLASS_OLD_PACKAGE)) {
                className = TAB_LAYOUT_CLASS_NAME;
                property = "";
            }

            TouchEvent touchEvent = new TouchEvent();

            touchEvent.setTouchType(touchType);
            touchEvent.setClassName(className);
            touchEvent.setProperty(property);
            touchEvent.setTimestamp(Dates.currentTimestampToUTCDate());

            insertTouchEvent(touchEvent);
        }
    }

    /**
     * Finds clicked view recursively.
     *
     * @param event motion event
     * @param root  root view
     * @return clicked view if found, otherwise null
     */
    private View findClickedView(MotionEvent event, View root) {
        String name = root.getClass().getName();
        String id = Strings.emptyIfNull(Views.getViewEntryName(root));

        if (isViewClicked(event, root)) {
            if (name.equals(GOOGLE_MAPS_VIEW_CLASS_PACKAGE) && id.equals(GOOGLE_MAPS_VIEW_CLASS_ID)) {
                return root;
            }

            if (name.equals(CALENDAR_VIEW_CLASS_PACKAGE)) {
                return root;
            }

            if (name.equals(BOTTOM_NAVIGATION_VIEW_PACKAGE) || name.contains(BOTTOM_NAVIGATION_VIEW_OLD_PACKAGE)) {
                return root;
            }

            if (name.equals(TAB_LAYOUT_CLASS_PACKAGE) || name.equals(TAB_LAYOUT_CLASS_OLD_PACKAGE)) {
                return root;
            }
        }

        if (root instanceof ViewGroup) {
            ViewGroup viewGroup = (ViewGroup) root;
            for (int i = viewGroup.getChildCount() - 1; i > -1; i--) {
                final View child = viewGroup.getChildAt(i);

                View foundView = findClickedView(event, child);
                if (foundView != null) {
                    return foundView;
                }
            }

            if (isViewClicked(event, root)) {
                return root;
            }
        } else {
            if (root != null && isViewClicked(event, root)) {
                return root;
            }
        }

        return null;
    }

    /**
     * Checks if view is clicked.
     *
     * @param event motion event
     * @param view  view
     * @return true if clicked, otherwise false
     */
    private boolean isViewClicked(MotionEvent event, View view) {
        return isEventInsideView(event, view) && view.getVisibility() == View.VISIBLE;
    }

    /**
     * Determines if given points are inside view
     *
     * @param event motion event
     * @param view  view object to compare
     * @return true if the points are within view bounds, false otherwise
     */
    private boolean isEventInsideView(MotionEvent event, View view) {
        float eventX = event.getRawX();
        float eventY = event.getRawY();

        int[] location = new int[2];

        view.getLocationOnScreen(location);

        int viewX = location[0];
        int viewY = location[1];

        return (eventX > viewX && eventX < (viewX + view.getWidth())) &&
                (eventY > viewY && eventY < (viewY + view.getHeight()));
    }

    /**
     * Adds touch event into database
     *
     * @param touchEvent touch event
     */
    private void insertTouchEvent(final TouchEvent touchEvent) {
        SqliteDatabase.insertTouchEvent(context, touchEvent);
    }

    private class UserTouchEventListener extends UserTouchEventGestureListener {

        @Override
        public void onPan() {
            TouchEvent touchEvent = new TouchEvent();
            touchEvent.setTouchType(TOUCH_TYPE_PAN);
            touchEvent.setClassName("");
            touchEvent.setProperty("");
            touchEvent.setTimestamp(Dates.currentTimestampToUTCDate());
            insertTouchEvent(touchEvent);
        }

        @Override
        public boolean onSingleTapUp(MotionEvent e) {
            onTouchEvent(e, TOUCH_TYPE_TAP);
            return true;
        }

        @Override
        public void onLongPress(MotionEvent e) {
            onTouchEvent(e, TOUCH_TYPE_LONG_PRESS);
        }
    }
}
