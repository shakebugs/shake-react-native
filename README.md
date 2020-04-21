# Shake SDK

## Getting started

`$ npm install @shakebugs/react-native-shake --save`

If you are using React Native version lower then 0.60, you should also link library with command.

`$ react-native link @shakebugs/react-native-shake`

If you support iOS platform, you should install pods also.

`cd ios && pod install && cd ..`

## Manual linking
Skip this step if you do not need to link library manually.

### Android

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
    implementation 'com.shakebugs.android:shake:<version>'
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
Adjust client id and client secret for your account in AndroidManifest.xml
```xml
<meta-data
       android:name="com.shakebugs.APIClientID"
       android:value="jULjX6ntQODCC6ao0uea0bLvAG9FTb8oByeJWYQx" />
<meta-data
       android:name="com.shakebugs.APIClientSecret"
       android:value="eIFuGOnX8CjeEvm0bkoZGe5BYv46cWlUQ95mceW2PEfYphWXW3oyNAJ" />
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
Import
```javascript
import Shake, {ShakeInvocationEvent} from '@shakebugs/react-native-shake';
```
Start shake
```javascript
Shake.start();
```
Stop shake
```javascript
Shake.stop();
```
Set invocation events
```javascript
Shake.setInvocationEvents([
    ShakeInvocationEvent.BUTTON,
    ShakeInvocationEvent.SHAKE,
    ShakeInvocationEvent.SCREENSHOT])
```
Manual trigger (only Android)
```javascript
Shake.manualTrigger();
```
Blackbox
```javascript
Shake.setBlackBoxEnabled(false);
Shake.setBlackBoxEnabled(true);
```
Quick facts
```javascript
Shake.setQuickFacts('Sample quick facts');
```
Attaching files
```javascript
Shake.attachFiles([filePath]);
```
