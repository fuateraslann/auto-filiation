package com.autofiliation.autofiliation;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class MyAlarm extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {

        System.out.println("ALARM!");
    }
}
