#import "Shake.h"

@implementation Shake


- (NSDictionary *)constantsToExport
{
    return @{@"ShakeInvocationEventShake": @(ShakeInvocationEventShake),
        	 @"ShakeInvocationEventButton": @(ShakeInvocationEventButton),
             @"ShakeInvocationEventScreenshot":@(ShakeInvocationEventScreenshot)};
}
+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(start)
{
    [SHKShake start];
}

RCT_EXPORT_METHOD(startWithInvocationEvents:(ShakeInvocationEvent)invocationEvents)
{
    [SHKShake startWithInvocationEvents:invocationEvents];
}

RCT_EXPORT_METHOD(manualStart)
{
    [SHKShake manualStart];
}

RCT_EXPORT_METHOD(sharedInstance:(RCTResponseSenderBlock)callback)
{
    callback(@[[NSNull null], [SHKShake sharedInstance]]);
}
RCT_EXPORT_METHOD(setBlackBoxEnabled:(BOOL)isBlackBoxEnabled callback:(RCTResponseSenderBlock)callback)
{
    [SHKShake setBlackBoxEnabled:isBlackBoxEnabled];
}
RCT_EXPORT_METHOD(bundle:(RCTResponseSenderBlock)callback)
{
	NSBundle *SHKBundle = [SHKShake bundle];
    callback(@[[NSNull null], SHKBundle]);
}
RCT_EXPORT_METHOD(stop)
{
    [SHKShake stop];
}
@end
