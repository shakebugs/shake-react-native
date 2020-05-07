package com.shakebugs.react.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Date utils
 */
public class Dates {
    public static String currentTimestampToUTCDate() {
        Calendar calendar = Calendar.getInstance();
        long currentTimestamp = calendar.getTimeInMillis();

        return timestampToUTCDate(currentTimestamp);
    }

    public static String timestampToUTCDate(long timeStamp) {
        return timestampToDate(timeStamp, TimeZone.getTimeZone("UTC"));
    }

    private static String timestampToDate(long timeStamp, TimeZone timeZone) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ", Locale.US);
        format.setTimeZone(timeZone);

        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(timeStamp);

        Date date = calendar.getTime();

        return format.format(date);
    }
}
