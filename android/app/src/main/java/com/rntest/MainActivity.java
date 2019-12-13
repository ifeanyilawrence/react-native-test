package com.rntest;

import com.reactnativenavigation.NavigationActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    public void setPermissionListener(PermissionListener listener)
    {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
        listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}