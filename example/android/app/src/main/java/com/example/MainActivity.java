package com.example;

import android.os.Bundle;
import android.view.MotionEvent;

import com.facebook.react.ReactActivity;
import com.reactlibrary.touch.TouchTracker;

public class MainActivity extends ReactActivity {
    TouchTracker touchTracker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        touchTracker = new TouchTracker(getApplicationContext());
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */


    @Override
    protected String getMainComponentName() {
        return "example";
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        touchTracker.handleTouchEvent(ev, this);

        return super.dispatchTouchEvent(ev);
    }
}
