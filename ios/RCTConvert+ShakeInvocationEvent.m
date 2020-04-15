#import "RCTConvert+ShakeInvocationEvent.h"
#import <Shake/ShakeEnums.h>

@implementation RCTConvert (ShakeInvocationEvent)

RCT_ENUM_CONVERTER(ShakeInvocationEvent,
(@{@"ShakeInvocationEventShake": @(ShakeInvocationEventShake),
   @"ShakeInvocationEventButton": @(ShakeInvocationEventButton),
   @"ShakeInvocationEventScreenshot": @(ShakeInvocationEventScreenshot)}),
ShakeInvocationEventShake, integerValue)

@end
