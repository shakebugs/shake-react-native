#import <React/RCTBridgeModule.h>
#import <Shake/Shake.h>
#import <Shake/ShakeEnums.h>
#import "RCTConvert+ShakeInvocationEvent.h"

@interface Shake : NSObject <RCTBridgeModule>

-(NSDictionary *)constantsToExport;
+(BOOL)requiredMainQueueSetup;

@end
