# Shake React Native SDK example

## Installation

Before running the project make sure you have installed project packages from the **root** directory of the project:

`yarn install`

## Make sure that sdk generated files are existing

In the root directory _ios/generated_ and _android/generated_ folders should be created.

Run the following command in the root directory if files are missing:

`yarn prepare`

## Run

Now, you can run the project on Android or iOS by using one of the following commands from the **example** directory:

`yarn run android` - run Android staging build (alias)
`yarn run android:stg` - run Android staging build
`yarn run android:prd` - run Android production build

`yarn run ios` - run iOS staging build (alias)
`yarn run ios:stg` - run iOS staging build
`yarn run ios:prd` - run iOS production build

Note: you must use **Yarn** and Node 20.19.0+
