# Shake SDK

## Run
If you want to run example app on your device or emulator,
navigate to the example directory and run following npm script.

For Android:
```
cd example
npm run android
```

For iOS:
```
cd example
npm run android
```

## Build
If you want to build distribution for example app,
navigate to the example directory and run following npm script.

For Android:
```
cd example
npm run build:android
```

For iOS:
```
cd example
npm run build:ios
```

If you are building for iOS make sure that you have correct
certificates installed in your keychain.

## Environments
By default all commands are using `uat` environment.

If you want to run or build app with different environment,
you can do that by appending :uat, :stg or :prd to npm scripts.

For Android:

Run
```
npm run android:uat
npm run android:stg
npm run android:prd
```

Build
```
npm run build:android:uat
npm run build:android:stg
npm run build:android:prd
```

For iOS:

Run
```
npm run ios:uat
npm run ios:stg
npm run ios:prd
```

Build
```
npm run build:ios:uat
npm run build:ios:stg
npm run build:ios:prd
```

## Clean
There are also utility scripts for cleaning cache:

For Android:
```
cd example
npm run clean:android
```

For iOS:
```
cd example
npm run clean:ios
```

## Documentation
If you want to integrate Shake SDK in to your project or you want to find more info on usage,
please visit ![Shake Documentation](https://www.shakebugs.com/docs) for more info!
