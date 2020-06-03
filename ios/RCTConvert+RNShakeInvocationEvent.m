#import "RCTConvert+RNShakeInvocationEvent.h"
#import <Shake/ShakeEnums.h>

@implementation RCTConvert (RNShakeInvocationEvent)

RCT_ENUM_CONVERTER(ShakeInvocationEvent,
(@{@"ShakeInvocationEventShake": @(ShakeInvocationEventShake),
   @"ShakeInvocationEventButton": @(ShakeInvocationEventButton),
   @"ShakeInvocationEventScreenshot": @(ShakeInvocationEventScreenshot)}),
ShakeInvocationEventShake, integerValue)

@end
