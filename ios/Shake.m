#import "Shake.h"

@implementation Shake

+(void) initialize {
    if(self == [Shake class]) {
        SEL *selector = @selector(_setNetworkRequestReporterEnabled:);
        [SHKShake.sharedInstance performSelector:selector withObject:NO];
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
	NSMutableArray *shakeFiles;
	[[SHKShake sharedInstance] setOnPrepareData:^SHKShakeReportData *
	_Nonnull(SHKShakeReportData * _Nonnull reportData) {
		for(int i = 0; i < count; i++)
		{
			SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:[files objectAtIndex:i] andData:[NSData new]];
			[shakeFiles addObject:attachedFile];
		}
		reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
		return reportData;
	}];
}
RCT_EXPORT_METHOD(attachFilesWithName:(nonnull NSDictionary *)filesDictionary)
{
    NSMutableArray *shakeFiles;
    [[SHKShake sharedInstance] setOnPrepareData:^SHKShakeReportData *
	_Nonnull(SHKShakeReportData * _Nonnull reportData) {
        for (NSMutableString *key in filesDictionary) {
            SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:key andFileURL:[filesDictionary objectForKey:key]];
			[shakeFiles addObject:attachedFile];
        }
        reportData.attachedFiles = [NSArray arrayWithArray:shakeFiles];
		return reportData;
    }];
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
