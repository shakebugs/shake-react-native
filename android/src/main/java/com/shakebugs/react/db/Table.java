package com.shakebugs.react.db;

/**
 * Database entities
 */
class Table {
    /**
     * Represents network requests table.
     */
    interface NetworkRequest {
        // Table
        String TABLE_NAME = "network_requests";

        // Fields
        String ID = "id";
        String METHOD = "method";
        String STATUS_CODE = "status_code";
        String URL = "url";
        String REQUEST_BODY = "request_body";
        String REQUEST_HEADERS = "request_headers";
        String RESPONSE_BODY = "response_body";
        String RESPONSE_HEADERS = "response_headers";
        String TIMESTAMP = "timestamp";
        String DURATION = "duration";
    }

    /**
     * Represents touch events table.
     */
    interface TouchEvent {
        // Table
        String TABLE_NAME = "touch_events";

        // Fields
        String ID = "id";
        String CLASS_NAME = "class_name";
        String PROPERTY = "property";
        String TOUCH_TYPE = "touch_type";
        String TIMESTAMP = "timestamp";
    }
}
