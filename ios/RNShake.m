#import "RNShake.h"

@implementation RNShake

+(void) initialize {
    if(self == [RNShake class]) {
        [SHKShake performSelector:sel_getUid(@"_setPlatformAndSDKVersion:".UTF8String) withObject:@"ReactNative|9.0.0"];
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
RCT_EXPORT_METHOD(setBlackBox:(BOOL)enableBlackBox)
{
    SHKShake.configuration.isBlackBoxEnabled = enableBlackBox;
}
RCT_EXPORT_METHOD(setEnableInspectScreen:(BOOL)enableInspectScreen)
{
    SHKShake.configuration.isInspectScreenEnabled = enableInspectScreen;
}
RCT_EXPORT_METHOD(setShowFloatingReportButton:(BOOL)showFloatingReportButton)
{
    SHKShake.configuration.isFloatingReportButtonShown = showFloatingReportButton;
}
RCT_EXPORT_METHOD(setInvokeShakeOnShaking:(BOOL)invokeOnShake)
{
    SHKShake.configuration.isInvokedByShakeDeviceEvent = invokeOnShake;
}
RCT_EXPORT_METHOD(setInvokeShakeOnScreenshot:(BOOL)invokeOnScreenshot)
{
    SHKShake.configuration.isInvokedByScreenshot = invokeOnScreenshot;
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

@end
