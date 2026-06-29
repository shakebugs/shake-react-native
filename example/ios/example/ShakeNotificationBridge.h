#import <Foundation/Foundation.h>
#import <UserNotifications/UserNotifications.h>

NS_ASSUME_NONNULL_BEGIN

/// Objective-C shim around the Shake SDK's notification APIs.
///
/// The Shake SDK class `SHKShake` is annotated `NS_SWIFT_NAME(Shake)`, which collides
/// with the `Shake` module name and makes it unreferenceable from Swift. This thin
/// wrapper exposes the notification entry points to the Swift AppDelegate.
@interface ShakeNotificationBridge : NSObject

+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
+ (BOOL)isShakeNotification:(UNNotification *)notification;
+ (void)reportNotificationCenter:(UNUserNotificationCenter *)center
       didReceiveNotificationResponse:(UNNotificationResponse *)response
                withCompletionHandler:(void (^)(void))completionHandler;
+ (void)reportNotificationCenter:(UNUserNotificationCenter *)center
              willPresentNotification:(UNNotification *)notification
                withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler;

@end

NS_ASSUME_NONNULL_END
