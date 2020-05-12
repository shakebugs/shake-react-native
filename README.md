# Shake SDK

## Requirements
Android API version should be at least 17.

Update minSdkVersion in project level build.gradle
```javascript
ext {
    buildToolsVersion = "28.0.3"
    minSdkVersion = 17
    compileSdkVersion = 28
    targetSdkVersion = 28
}
```

## Getting started

`$ npm install @shakebugs/react-native-shake --save`

If you are using react native above version 0.60, you should call

`$ react-native add-shake`

If you are using React Native version lower then 0.60, you should call

`$ react-native link @shakebugs/react-native-shake`

If you support iOS platform, you should install pods also.

`cd ios && pod install && cd ..`

## Manual linking
Skip this step if you already linked library using commands from the Getting Started section.

### Android
This isn't necessary if react-native add-shake command is run,
or if you are using react-native link.
Add to settings.gradle
```javascript
include ':@shakebugs_react-native-shake'
project(':@shakebugs_react-native-shake').projectDir = new File(rootProject.projectDir, '../node_modules/@shakebugs/react-native-shake/android')
```

Add dependency to app level build.gradle
```javascript
dependencies {
    implementation project(':@shakebugs_react-native-shake')
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"  // From node_modules
}
```

Add package to MainApplication.java
```javascript
@Override protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Packages that cannot be autolinked yet can be added manually here, for example:
    // packages.add(new MyReactNativePackage());
    packages.add(new ShakePackage());
    return packages;
 }
```

### iOS
Add Shake.xcodeproj to Libraries in Xcode.

Go to `Build Phases`, and add libShake.a from the `Products` folder inside the Library you are importing to `Link Binary With Libraries`
## Initialization
Skip this step if you already initialized library using commands from the Getting Started section.
### Android
Add maven repository to your project level build.gradle file
```javascript
allprojects {
   repositories {
       mavenLocal()
       maven {
           // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
           url("$rootDir/../node_modules/react-native/android")
       }
       maven {
           // Android JSC is installed from npm
           url("$rootDir/../node_modules/jsc-android/dist")
       }

       google()
       jcenter()
       maven { url 'https://www.jitpack.io' }
       maven { url 'https://dl.bintray.com/shake/shake' }
   }
}
```
Add dependency to your app level build.gradle file
```javascript
dependencies {
    implementation 'com.shakebugs.android:shake:9.0.+'
}
```

Update MainApplication.java file
```javascript
import com.shakebugs.shake.Shake;
import com.shakebugs.shake.ShakeInvocationEvent;
```
```javascript
@Override
public void onCreate() {
 super.onCreate();
 SoLoader.init(this, /* native exopackage */ false);
 initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
 Shake.setInvocationEvents(ShakeInvocationEvent.BUTTON);
 Shake.start(this);
}
```
### iOS
No initialization needed

## Adjust keys
### Android
Adjust client id and client secret for your account in AndroidManifest.xml
```xml
<meta-data
       android:name="com.shakebugs.APIClientID"
       android:value="your-api-client-id" />
<meta-data
       android:name="com.shakebugs.APIClientSecret"
       android:value="your-api-client-secret" />
```

### iOS
Add client id and client secret for your account in Info.plist
```xml
<?xml version="1.0" encoding="utf-8" ?>
<plist version="1.0">
  <dict>
      <key>Shake</key>
        <dict>
          <key>APIClientID</key>
          <string>your-api-client-id</string>
          <key>APIClientSecret</key>
          <string>your-api-client-secret</string>
        </dict>
  </dict>
</plist>
```

## Usage
### Import
```javascript
import Shake, {ShakeInvocationEvent} from '@shakebugs/react-native-shake';
```
### Start shake
```javascript
Shake.start();
```
### Stop shake
```javascript
Shake.stop();
```
### Set invocation events
```javascript
Shake.setInvocationEvents([
    ShakeInvocationEvent.BUTTON,
    ShakeInvocationEvent.SHAKE,
    ShakeInvocationEvent.SCREENSHOT])
```
### Blackbox
```javascript
Shake.setBlackBoxEnabled(false);
Shake.setBlackBoxEnabled(true);
```
### Quick facts
```javascript
Shake.setQuickFacts('Sample quick facts');
```
### Attaching files
Attach files with default names
```javascript
Shake.attachFiles([filePath]);
```
Attach files with custom names
```javascript
Shake.attachFilesWithName({
  "file1": filePath1,
  "file2": filePath2
});
```
### Network tracking
```javascript
import {NetworkTracker} from '@shakebugs/react-native-shake';

NetworkTracker.enable();
NetworkTracker.disable();
```
### Touch tracking
#### Android
If you initialized SDK using commands from the Getting Started section, touch tracking will be enabled by default.

Otherwise add following code into the MainActivity.java
```java
package com.example;

import android.os.Bundle;
import android.view.MotionEvent;

import com.facebook.react.ReactActivity;
import com.shakebugs.react.TouchTracker;

public class MainActivity extends ReactActivity {
    private TouchTracker touchTracker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        touchTracker = new TouchTracker(getApplicationContext());
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        touchTracker.handleTouchEvent(ev, this);

        return super.dispatchTouchEvent(ev);
    }

    @Override
    protected String getMainComponentName() {
        return "example";
    }
}
```
#### iOS
Touch tracking is enabled by default
