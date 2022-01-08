#!/usr/bin/env bash

set -e

# from https://stackoverflow.com/questions/35283959/build-and-install-unsigned-apk-on-device-without-the-development-server
# apk will be in android/app/build/outputs/apk/debug/app-debug.apk

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
cd android
./gradlew assembleDebug
cd ../
mv android/app/build/outputs/apk/debug/app-debug.apk android/app/build/outputs/apk/debug/TreeController.apk