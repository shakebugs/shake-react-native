sed "s/MAVEN_REPOSITORY/$MAVEN_REPOSITORY/g" android/build.gradle > changed.txt && mv changed.txt android/build.gradle
sed "s/ANDROID_DEPENDENCY/$ANDROID_DEPENDENCY/g" android/build.gradle > changed.txt && mv changed.txt android/build.gradle
sed "s/IOS_DEPENDENCY/$IOS_DEPENDENCY/g" react-native-shake.podspec > changed.txt && mv changed.txt react-native-shake.podspec