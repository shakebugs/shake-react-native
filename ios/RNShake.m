#import "RNShake.h"

@implementation RNShake

+(void) initialize {
    if(self == [RNShake class]) {
        SEL *selector = @selector(_setNetworkRequestReporterEnabled:);
        [SHKShake.sharedInstance performSelector:selector withObject:NO];
        [SHKShake performSelector:sel_getUid(@"_setPlatformAndSDKVersion:".UTF8String) withObject:@"ReactNative|9.0.0"];
    }

}
+(BOOL)requiresMainQueueSetup
{
	return YES;
}
- (NSDictionary *)constantsToExport
{
    return @{@"ShakeInvocationEventShake": @(ShakeInvocationEventShake),
        	 @"ShakeInvocationEventButton": @(ShakeInvocationEventButton),
             @"ShakeInvocationEventScreenshot":@(ShakeInvocationEventScreenshot)};
}
-(dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(manualTrigger)
{
	NSLog(@"This functionality is not supported in iOS SDK");
}

RCT_EXPORT_METHOD(start)
{
    [SHKShake stop];
    [SHKShake start];
}

RCT_EXPORT_METHOD(setInvocationEvents:(nonnull NSArray *)eventsArray)
{
    [SHKShake stop];
	NSUInteger count = [eventsArray count];
	ShakeInvocationEvent event = 0;
    for(int i = 0; i < count; i++)
	{
		if([[eventsArray objectAtIndex:i] isEqual:@"BUTTON"])
			event |= ShakeInvocationEventButton;
		else if([[eventsArray objectAtIndex:i] isEqual:@"SHAKE"])
			event |= ShakeInvocationEventShake;
		else if([[eventsArray objectAtIndex:i] isEqual:@"SCREENSHOT"])
			event |= ShakeInvocationEventScreenshot;
	}
	[SHKShake startWithInvocationEvents:event];
}

RCT_EXPORT_METHOD(setQuickFacts:(nonnull NSString *)quickFacts)
{
	[[SHKShake sharedInstance] setOnPrepareData:^SHKShakeReportData *
	_Nonnull(SHKShakeReportData * _Nonnull reportData) {
		reportData.quickFacts = quickFacts;
		return reportData;
	}];
}
RCT_EXPORT_METHOD(attachFiles:(nonnull NSArray *)files)
{
	NSUInteger count  = [files count];
    NSMutableArray <SHKShakeFile *> *shakeFiles = [NSMutableArray array];
    [[SHKShake sharedInstance] setOnPrepareData:^SHKShakeReportData *
	_Nonnull(SHKShakeReportData * _Nonnull reportData) {
		for(int i = 0; i < count; i++)
		{
            NSArray *splitPath = [[files objectAtIndex:i] componentsSeparatedByString:@"/"];
            NSUInteger splitPathCount = [splitPath count];
            NSString *filename = [splitPath objectAtIndex:splitPathCount-1];
			SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:filename
                                                                    andData:[NSData dataWithContentsOfFile:[files objectAtIndex:i]]];
			[shakeFiles addObject:attachedFile];
		}
		reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
		return reportData;
	}];
    SHKShakeReportData *reportData = [[SHKShakeReportData alloc] init];
    [SHKShake sharedInstance].onPrepareData(reportData);

}
RCT_EXPORT_METHOD(attachFilesWithName:(nonnull NSDictionary *)filesDictionary)
{
    NSMutableArray <SHKShakeFile*> *shakeFiles = [NSMutableArray array];
    [[SHKShake sharedInstance] setOnPrepareData:^SHKShakeReportData *
    _Nonnull(SHKShakeReportData * _Nonnull reportData) {
        for (NSMutableString *key in filesDictionary) {
            SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:key andData:[NSData dataWithContentsOfFile:[filesDictionary objectForKey:key]]];
            [shakeFiles addObject:attachedFile];
        }
       reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
       return reportData;
    }];
    SHKShakeReportData *reportData = [[SHKShakeReportData alloc] init];
    [SHKShake sharedInstance].onPrepareData(reportData);
}
RCT_EXPORT_METHOD(setBlackBoxEnabled:(BOOL)isBlackBoxEnabled)
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