package com.stromdog.voice;

import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class VoiceIntegrationModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public VoiceIntegrationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "VoiceModule";
    }

    private VoiceModule mVoiceModule;
    private final VoiceModule.Callback mVoiceCallback = new VoiceModule.Callback() {

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

    @ReactMethod
    private void startVoiceRecorder() {
        if (mVoiceModule != null) {
            mVoiceModule.stop();
        }
        mVoiceModule = new VoiceModule(mVoiceCallback);
        mVoiceModule.start();
    }

    @ReactMethod
    private void stopVoiceRecorder() {
        if (mVoiceModule != null) {
            mVoiceModule.stop();
            mVoiceModule = null;
        }
    }
}