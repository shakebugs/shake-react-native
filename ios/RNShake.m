#import "RNShake.h"

@implementation RNShake

+(void) initialize {
    if(self == [RNShake class]) {
        NSDictionary *platformAndSdkVersionDict = @{
            @"platform": @"ReactNative",
            @"sdkVersion": @"10.0.0"
        };
        NSNumber *disableDueToRN = @YES;
        [SHKShake performSelector:sel_getUid(@"_setNetworkRequestReporterDisabledDueToRN:".UTF8String) withObject:disableDueToRN];
        [SHKShake performSelector:sel_getUid(@"_setPlatformAndSDKVersion:".UTF8String) withObject:platformAndSdkVersionDict];
    }

}
+(BOOL)requiresMainQueueSetup
{
	return YES;
}
-(dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(start)
{
    [SHKShake start];
}
RCT_EXPORT_METHOD(show)
{
    [SHKShake show];
}
RCT_EXPORT_METHOD(setEnabled:(BOOL)enabled)
{
    SHKShake.isPaused = !enabled;
}
RCT_EXPORT_METHOD(setEnableActivityHistory:(BOOL)enableActivityHistory)
{
    SHKShake.configuration.isActivityHistoryEnabled = enableActivityHistory;
}
RCT_EXPORT_METHOD(isEnableActivityHistory:(RCTResponseSenderBlock)callback)
{
    NSNumber *isActivityHistoryEnabled = [NSNumber numberWithBool:SHKShake.configuration.isActivityHistoryEnabled];
    callback(@[[NSNull null], isActivityHistoryEnabled]);
}
RCT_EXPORT_METHOD(setEnableBlackBox:(BOOL)enableBlackBox)
{
    SHKShake.configuration.isBlackBoxEnabled = enableBlackBox;
}
RCT_EXPORT_METHOD(isEnableBlackBox:(RCTResponseSenderBlock)callback)
{
    NSNumber *isEnableBlackBox = [NSNumber numberWithBool:SHKShake.configuration.isBlackBoxEnabled];
    callback(@[[NSNull null], isEnableBlackBox]);
}
RCT_EXPORT_METHOD(setEnableInspectScreen:(BOOL)enableInspectScreen)
{
    SHKShake.configuration.isInspectScreenEnabled = enableInspectScreen;
}
RCT_EXPORT_METHOD(isEnableInspectScreen:(RCTResponseSenderBlock)callback)
{
    NSNumber *isEnableInspectScreen = [NSNumber numberWithBool:SHKShake.configuration.isInspectScreenEnabled];
    callback(@[[NSNull null], isEnableInspectScreen]);
}
RCT_EXPORT_METHOD(setShowFloatingReportButton:(BOOL)showFloatingReportButton)
{
    SHKShake.configuration.isFloatingReportButtonShown = showFloatingReportButton;
}
RCT_EXPORT_METHOD(isShowFloatingReportButton:(RCTResponseSenderBlock)callback)
{
    NSNumber *isShowFloatingReportButton = [NSNumber numberWithBool:SHKShake.configuration.isFloatingReportButtonShown];
    callback(@[[NSNull null], isShowFloatingReportButton]);
}
RCT_EXPORT_METHOD(setInvokeShakeOnShaking:(BOOL)invokeOnShake)
{
    SHKShake.configuration.isInvokedByShakeDeviceEvent = invokeOnShake;
}
RCT_EXPORT_METHOD(isInvokeShakeOnShaking:(RCTResponseSenderBlock)callback)
{
    NSNumber *isInvokeShakeOnShaking = [NSNumber numberWithBool:SHKShake.configuration.isInvokedByShakeDeviceEvent];
    callback(@[[NSNull null], isInvokeShakeOnShaking]);
}
RCT_EXPORT_METHOD(setInvokeShakeOnScreenshot:(BOOL)invokeOnScreenshot)
{
    SHKShake.configuration.isInvokedByScreenshot = invokeOnScreenshot;
}
RCT_EXPORT_METHOD(isInvokeShakeOnScreenshot:(RCTResponseSenderBlock)callback)
{
    NSNumber *isInvokeOnScreenshot = [NSNumber numberWithBool:SHKShake.configuration.isInvokedByScreenshot];
    callback(@[[NSNull null], isInvokeOnScreenshot]);
}
RCT_EXPORT_METHOD(setShakeReportData:(nonnull NSArray *)files:(nonnull NSString *)quickFacts)
{
    NSString *filename;
    SHKShakeReportData *reportData = [[SHKShakeReportData alloc] init];
	NSUInteger count  = [files count];
    NSMutableArray <SHKShakeFile *> *shakeFiles = [NSMutableArray array];
    reportData.quickFacts = quickFacts;
    for(int i = 0; i < count; i++)
    {
        NSDictionary *filesDict = [files objectAtIndex:i];
        NSArray *splitPath = [[filesDict objectForKey:@"path"] componentsSeparatedByString:@"/"];
        NSUInteger splitPathCount = [splitPath count];
        if([filesDict objectForKey:@"name"])
            filename = [filesDict objectForKey:@"name"];
        else
            filename = [splitPath objectAtIndex:splitPathCount-1];
        NSURL *fileURL = [[NSURL alloc] initFileURLWithPath:[filesDict objectForKey:@"path"]];
        SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:filename andFileURL:fileURL];
        [shakeFiles addObject:attachedFile];
    }
    reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
    [SHKShake showWithReportData:reportData];
}
RCT_EXPORT_METHOD(silentReport:(nonnull NSString *)description:(nonnull NSArray *)filesArray
                  :(nonnull NSString *)quicFacts:(nonnull NSDictionary *)configurationMap)
{
    NSString *filename;
    SHKShakeReportData *reportData = [[SHKShakeReportData alloc] init];
    SHKShakeReportConfiguration *reportConfiguration = [[SHKShakeReportConfiguration alloc] init];
    for(NSString *key in configurationMap)
    {
        if([key isEqualToString:@"blackBoxData"])
            reportConfiguration.includesBlackBoxData = [configurationMap objectForKey:key];
        else if([key isEqualToString:@"activityHistoryData"])
            reportConfiguration.includesActivityHistoryData = [configurationMap objectForKey:key];
        else if([key isEqualToString:@"screenshot"])
            reportConfiguration.includesScreenshotImage = [configurationMap objectForKey:key];
        else if([key isEqualToString:@"showReportSentMessage"])
            reportConfiguration.showsToastMessageOnSend = [configurationMap objectForKey:key];
    }
    reportData.bugDescription = description;
    reportData.quickFacts = quicFacts;
    NSUInteger count  = [filesArray count];
    NSMutableArray <SHKShakeFile *> *shakeFiles = [NSMutableArray array];
    for(int i = 0; i < count; i++)
      {
          NSDictionary *filesDict = [filesArray objectAtIndex:i];
          NSArray *splitPath = [[filesDict objectForKey:@"path"] componentsSeparatedByString:@"/"];
          NSUInteger splitPathCount = [splitPath count];
          if([filesDict objectForKey:@"name"])
              filename = [filesDict objectForKey:@"name"];
          else
              filename = [splitPath objectAtIndex:splitPathCount-1];
          NSURL *fileURL = [[NSURL alloc] initFileURLWithPath:[filesDict objectForKey:@"path"]];
          SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:filename andFileURL:fileURL];
          [shakeFiles addObject:attachedFile];
      }
      reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
    
    [SHKShake silentReportWithReportData:reportData reportConfiguration:reportConfiguration];
}
RCT_EXPORT_METHOD(insertNetworkRequest:(NSDictionary*)request)
{
    NSDictionary *dict = [[NSDictionary alloc] init];
    NSData *data = [request[@"requestBody"] dataUsingEncoding:NSUTF8StringEncoding];
    dict = @{
        @"url": request[@"url"],
        @"method": request[@"method"],
        @"responseBody": request[@"responseBody"],
        @"statusCode": request[@"statusCode"],
        @"start": request[@"start"],
        @"contentType": request[@"contentType"],
        @"requestBody": data,
        @"requestHeaders": request[@"requestHeaders"],
        @"duration": request[@"duration"],
        @"responseHeaders": request[@"responseHeaders"],
        @"timestamp": request[@"timestamp"]
    };
    [SHKShake performSelector:sel_getUid(@"_reportRequestCompleted:".UTF8String) withObject:dict];
}
@end
