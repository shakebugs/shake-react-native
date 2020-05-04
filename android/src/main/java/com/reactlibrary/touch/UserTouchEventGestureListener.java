package com.reactlibrary.touch;

import android.view.GestureDetector;
import android.view.MotionEvent;

public abstract class UserTouchEventGestureListener extends GestureDetector.SimpleOnGestureListener {

    @Override
    public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
        onPan();
        return true;
    }

    public abstract void onPan();
}
