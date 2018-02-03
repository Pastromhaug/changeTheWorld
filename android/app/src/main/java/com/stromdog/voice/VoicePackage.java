package com.stromdog.voice;

import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class VoicePackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        VoiceModule.Callback mVoiceModuleCallback = new VoiceModule.Callback() {
            @Override
            public void onVoiceStart() {
                Log.i("onVoiceStart", "onVoiceStart");
            }

            @Override
            public void onVoice(byte[] data, int size) {
                Log.i("data", data.toString());
                Log.i("size", Integer.toString(size));
            }

            @Override
            public void onVoiceEnd() {
                Log.i("onVoiceEnd", "onVoiceEnd");
            }
        };

        modules.add(new VoiceModule(reactContext, mVoiceModuleCallback));

        return modules;
    }

}