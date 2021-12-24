#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

@import UserNotifications;

@interface AppDelegate : UIResponder <UIApplicationDelegate, UNUserNotificationCenterDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
