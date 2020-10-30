#import "RNShake.h"

@implementation RNShake

+(void) initialize {
    if(self == [RNShake class]) {
        NSDictionary *platformAndSdkVersionDict = @{
            @"platform": @"ReactNative",
            @"sdkVersion": @"10.0.4"
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
RCT_REMAP_METHOD(isEnableActivityHistory, isEnableActivityHistorywithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isActivityHistoryEnabled = [NSNumber numberWithBool:SHKShake.configuration.isActivityHistoryEnabled];
    resolve(isActivityHistoryEnabled);
}
RCT_EXPORT_METHOD(setEnableBlackBox:(BOOL)enableBlackBox)
{
    SHKShake.configuration.isBlackBoxEnabled = enableBlackBox;
}
RCT_REMAP_METHOD(isEnableBlackBox, isEnableBlackBoxwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isEnableBlackBox = [NSNumber numberWithBool:SHKShake.configuration.isBlackBoxEnabled];
    resolve(isEnableBlackBox);
}
RCT_EXPORT_METHOD(setEnableInspectScreen:(BOOL)enableInspectScreen)
{
    SHKShake.configuration.isInspectScreenEnabled = enableInspectScreen;
}
RCT_REMAP_METHOD(isEnableInspectScreen, isEnableInspectScreenwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isEnableInspectScreen = [NSNumber numberWithBool:SHKShake.configuration.isInspectScreenEnabled];
    resolve(isEnableInspectScreen);
}
RCT_EXPORT_METHOD(setShowFloatingReportButton:(BOOL)showFloatingReportButton)
{
    SHKShake.configuration.isFloatingReportButtonShown = showFloatingReportButton;
}
RCT_REMAP_METHOD(isShowFloatingReportButton, isShowFloatingReportButtonwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isShowFloatingReportButton = [NSNumber numberWithBool:SHKShake.configuration.isFloatingReportButtonShown];
    resolve(isShowFloatingReportButton);
}
RCT_EXPORT_METHOD(setInvokeShakeOnShakeDeviceEvent:(BOOL)invokeOnShake)
{
    SHKShake.configuration.isInvokedByShakeDeviceEvent = invokeOnShake;
}
RCT_REMAP_METHOD(isInvokeShakeOnShakeDeviceEvent, isInvokeShakeOnShakeDeviceEventwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isInvokeShakeOnShakeDeviceEvent = [NSNumber numberWithBool:SHKShake.configuration.isInvokedByShakeDeviceEvent];
    resolve(isInvokeShakeOnShakeDeviceEvent);
}
RCT_EXPORT_METHOD(setInvokeShakeOnScreenshot:(BOOL)invokeOnScreenshot)
{
    SHKShake.configuration.isInvokedByScreenshot = invokeOnScreenshot;
}
RCT_REMAP_METHOD(isInvokeShakeOnScreenshot, withResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isInvokeOnScreenshot = [NSNumber numberWithBool:SHKShake.configuration.isInvokedByScreenshot];
    resolve(isInvokeOnScreenshot);
}
RCT_EXPORT_METHOD(setShakeReportData:(nonnull NSArray *)files:(nonnull NSString *)quickFacts)
{
    NSMutableArray <SHKShakeFile *> *shakeFiles = [NSMutableArray array];
    for(int i = 0; i < [files count]; i++) {
        NSDictionary *file = [files objectAtIndex:i];
        NSString *path = [file objectForKey:@"path"];
        NSArray *name = [file objectForKey:@"name"];

        NSURL *url = [[NSURL alloc] initFileURLWithPath: path];
        SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:name andFileURL:url];

        [shakeFiles addObject:attachedFile];
    }

    SHKShake.onPrepareReportData = ^SHKShakeReportData *_Nonnull(SHKShakeReportData *_Nonnull reportData) {
      reportData.quickFacts = quickFacts;
      reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
      return reportData;
    };
}
RCT_EXPORT_METHOD(silentReport:(nonnull NSString *)description:(nonnull NSArray *)files
                  :(nonnull NSString *)quickFacts:(nonnull NSDictionary *)configurationMap)
{
    BOOL includesBlackBoxData = [[configurationMap objectForKey:@"blackBoxData"] boolValue];
    BOOL includesActivityHistoryData = [[configurationMap objectForKey:@"activityHistoryData"] boolValue];
    BOOL includesScreenshotImage = [[configurationMap objectForKey:@"screenshot"] boolValue];
    BOOL showsToastMessageOnSend = [[configurationMap objectForKey:@"showReportSentMessage"] boolValue];

    SHKShakeReportConfiguration *reportConfiguration = [[SHKShakeReportConfiguration alloc] init];
    reportConfiguration.includesBlackBoxData = includesBlackBoxData;
    reportConfiguration.includesActivityHistoryData = includesActivityHistoryData;
    reportConfiguration.includesScreenshotImage = includesScreenshotImage;
    reportConfiguration.showsToastMessageOnSend = showsToastMessageOnSend;

    NSMutableArray <SHKShakeFile *> *shakeFiles = [NSMutableArray array];
    for(int i = 0; i < [files count]; i++) {
        NSDictionary *file = [files objectAtIndex:i];
        NSString *path = [file objectForKey:@"path"];
        NSArray *name = [file objectForKey:@"name"];

        NSURL *url = [[NSURL alloc] initFileURLWithPath: path];
        SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:name andFileURL:url];

        [shakeFiles addObject:attachedFile];
      }

    SHKShakeReportData *reportData = [[SHKShakeReportData alloc] init];
    reportData.bugDescription = description;
    reportData.quickFacts = quickFacts;
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
        @"requestBody": data,
        @"requestHeaders": request[@"requestHeaders"],
        @"duration": request[@"duration"],
        @"responseHeaders": request[@"responseHeaders"],
        @"timestamp": request[@"timestamp"]
    };
    [SHKShake performSelector:sel_getUid(@"_reportRequestCompleted:".UTF8String) withObject:dict];
}
@end
