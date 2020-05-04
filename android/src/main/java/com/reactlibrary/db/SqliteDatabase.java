package com.reactlibrary.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.reactlibrary.utils.Strings;
import com.shakebugs.shake.internal.data.NetworkRequest;
import com.shakebugs.shake.internal.data.TouchEvent;

import org.json.JSONObject;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Interface for Shake database
 */
public class SqliteDatabase {
    private static final String DATABASE_NAME = "shake";

    private static ExecutorService executorService = Executors.newCachedThreadPool();

    public static void insertNetworkRequest(final Context context, final NetworkRequest networkRequest) {
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                SQLiteDatabase database = context.openOrCreateDatabase(DATABASE_NAME, Context.MODE_PRIVATE, null);

                try {
                    if (Strings.isNullOrEmpty(networkRequest.getTimestamp())) {
                        return;
                    }

                    ContentValues values = new ContentValues();
                    values.put(Table.NetworkRequest.METHOD, networkRequest.getMethod());
                    values.put(Table.NetworkRequest.STATUS_CODE, networkRequest.getStatusCode());
                    values.put(Table.NetworkRequest.URL, networkRequest.getUrl());
                    values.put(Table.NetworkRequest.REQUEST_BODY, networkRequest.getRequestBody());
                    values.put(Table.NetworkRequest.RESPONSE_BODY, networkRequest.getResponseBody());
                    values.put(Table.NetworkRequest.TIMESTAMP, networkRequest.getTimestamp());
                    values.put(Table.NetworkRequest.DURATION, networkRequest.getDuration());

                    String requestHeaders = new JSONObject(networkRequest.requestHeaders).toString();
                    values.put(Table.NetworkRequest.REQUEST_HEADERS, requestHeaders);

                    String responseHeaders = new JSONObject(networkRequest.responseHeaders).toString();
                    values.put(Table.NetworkRequest.RESPONSE_HEADERS, responseHeaders);

                    database.insert(Table.NetworkRequest.TABLE_NAME, null, values);
                } catch (Exception e) {
                    Log.e("SqliteDatabase", "Could not add network request to the database. " + e.getMessage());
                } finally {
                    database.close();
                }
            }
        });
    }

    public static void insertTouchEvent(final Context context, final TouchEvent touchEvent) {
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                SQLiteDatabase database = context.openOrCreateDatabase(DATABASE_NAME, Context.MODE_PRIVATE, null);

                try {
                    if (Strings.isNullOrEmpty(touchEvent.getTimestamp())) {
                        return;
                    }

                    ContentValues values = new ContentValues();
                    values.put(Table.TouchEvent.CLASS_NAME, touchEvent.getClassName());
                    values.put(Table.TouchEvent.PROPERTY, touchEvent.getProperty());
                    values.put(Table.TouchEvent.TOUCH_TYPE, touchEvent.getTouchType());
                    values.put(Table.TouchEvent.TIMESTAMP, touchEvent.getTimestamp());

                    database.insert(Table.TouchEvent.TABLE_NAME, null, values);
                } catch (Exception e) {
                    Log.e("SqliteDatabase", "Could not add touch event to the database. " + e.getMessage());
                } finally {
                    database.close();
                }
            }
        });
    }
}
