#import "ShakeNotificationBridge.h"

@import Shake;

@implementation ShakeNotificationBridge

+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [SHKShake didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

+ (BOOL)isShakeNotification:(UNNotification *)notification {
  return [SHKShake isShakeNotification:notification];
}

+ (void)reportNotificationCenter:(UNUserNotificationCenter *)center
       didReceiveNotificationResponse:(UNNotificationResponse *)response
                withCompletionHandler:(void (^)(void))completionHandler {
  [SHKShake reportNotificationCenter:center
        didReceiveNotificationResponse:response
                 withCompletionHandler:completionHandler];
}

+ (void)reportNotificationCenter:(UNUserNotificationCenter *)center
              willPresentNotification:(UNNotification *)notification
                withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  [SHKShake reportNotificationCenter:center
                willPresentNotification:notification
                  withCompletionHandler:completionHandler];
}

@end
