#import "RNShake.h"
#import <React/RCTUIManager.h>
#import <Shake/Shake.h>
#import <Shake/SHKShakeConfiguration.h>
#import <Shake/SHKShakeFile.h>
#import <Shake/SHKShakeReportConfiguration.h>

@implementation RNShake

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setPlatformInfo];
        [self disableNetworkRequests];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
	return YES;
}

- (dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventNotification"];
}

// React Native

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(start, clientId:(NSString*)clientId clientSecret:(NSString*)clientSecret)
{
    [SHKShake startWithClientId:clientId clientSecret:clientSecret];
}

RCT_REMAP_METHOD(show, shakeScreen:(NSDictionary*)showOptionDic)
{
    SHKShowOption showOption = [self mapToShowOption:showOptionDic];
    [SHKShake show:showOption];
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

RCT_REMAP_METHOD(isInvokeShakeOnScreenshot, isInvokeShakeOnScreenshotwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isInvokeOnScreenshot = [NSNumber numberWithBool:SHKShake.configuration.isInvokedByScreenshot];
    resolve(isInvokeOnScreenshot);
}

RCT_EXPORT_METHOD(setScreenshotIncluded:(BOOL)screenshotIncluded)
{
    SHKShake.configuration.isScreenshotIncluded = screenshotIncluded;
}

RCT_REMAP_METHOD(isScreenshotIncluded, isScreenshotIncludedwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isScreenshotIncluded = [NSNumber numberWithBool:SHKShake.configuration.isScreenshotIncluded];
    resolve(isScreenshotIncluded);
}

RCT_EXPORT_METHOD(setShakingThreshold:(float)shakingThreshold)
{
    SHKShake.configuration.shakingThreshold = shakingThreshold;
}

RCT_REMAP_METHOD(getShakingThreshold, getShakingThresholdwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *shakingThreshold = [NSNumber numberWithFloat:SHKShake.configuration.shakingThreshold];
    resolve(shakingThreshold);
}


RCT_EXPORT_METHOD(setEnableEmailField:(BOOL)isEmailFieldEnabled)
{
    SHKShake.configuration.isEmailFieldEnabled = isEmailFieldEnabled;
}

RCT_EXPORT_METHOD(isEnableEmailField:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isEmailFieldEnabled = [NSNumber numberWithBool:SHKShake.configuration.isEmailFieldEnabled];
    resolve(isEmailFieldEnabled);
}

RCT_EXPORT_METHOD(setEmailField:(NSString*)emailField)
{
    SHKShake.configuration.emailField = emailField;
}

RCT_EXPORT_METHOD(getEmailField:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSString *emailField = SHKShake.configuration.emailField;
    resolve(emailField);
}

RCT_EXPORT_METHOD(setFeedbackTypeEnabled:(BOOL)isFeedbackTypeEnabled)
{
    SHKShake.configuration.isFeedbackTypeEnabled = isFeedbackTypeEnabled;
}

RCT_EXPORT_METHOD(isFeedbackTypeEnabled:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isFeedbackTypeEnabled = [NSNumber numberWithBool:SHKShake.configuration.isFeedbackTypeEnabled];
    resolve(isFeedbackTypeEnabled);
}

RCT_EXPORT_METHOD(setFeedbackTypes:(nonnull NSArray*)feedbackTypesArray)
{
    NSMutableArray<SHKFeedbackEntry *> *feedbackTypes = [self mapArrayToFeedbackTypes:feedbackTypesArray];
    [SHKShake setFeedbackTypes:feedbackTypes];
}

RCT_EXPORT_METHOD(getFeedbackTypes:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSArray<SHKFeedbackEntry *> *feedbackTypes = [SHKShake getFeedbackTypes];
    NSArray<NSDictionary *> *feedbackTypesArray = [self mapFeedbackTypesToArray:feedbackTypes];
    resolve(feedbackTypesArray);
}

RCT_EXPORT_METHOD(setShowIntroMessage:(BOOL)showIntroMessage)
{
    SHKShake.configuration.setShowIntroMessage = showIntroMessage;
}

RCT_EXPORT_METHOD(getShowIntroMessage:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSNumber *showIntroMessage = [NSNumber numberWithBool:SHKShake.configuration.setShowIntroMessage];
    resolve(showIntroMessage);
}

RCT_EXPORT_METHOD(setAutoVideoRecording:(BOOL)isAutoVideoRecordingEnabled)
{
    SHKShake.configuration.isAutoVideoRecordingEnabled = isAutoVideoRecordingEnabled;
}

RCT_EXPORT_METHOD(isAutoVideoRecording:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isAutoVideoRecordingEnabled = [NSNumber numberWithBool:SHKShake.configuration.isAutoVideoRecordingEnabled];
    resolve(isAutoVideoRecordingEnabled);
}

RCT_EXPORT_METHOD(setConsoleLogsEnabled:(BOOL)isConsoleLogsEnabled)
{
    SHKShake.configuration.isConsoleLogsEnabled = isConsoleLogsEnabled;
}

RCT_EXPORT_METHOD(isConsoleLogsEnabled:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isConsoleLogsEnabled = [NSNumber numberWithBool:SHKShake.configuration.isConsoleLogsEnabled];
    resolve(isConsoleLogsEnabled);
}

RCT_EXPORT_METHOD(setMetadata:(NSString*)key:(NSString*)value)
{
    [SHKShake setMetadataWithKey: key value: value];
}

RCT_EXPORT_METHOD(log:(NSDictionary *)logLevelDic:(NSString *)message)
{
    LogLevel logLevel = [self mapToLogLevel:logLevelDic];
    [SHKShake logWithLevel:logLevel message:message];
}

RCT_EXPORT_METHOD(setShakeReportData:(nonnull NSArray *)files)
{
    SHKShake.onPrepareReportData = ^NSArray<SHKShakeFile *> * _Nonnull {
        NSMutableArray<SHKShakeFile*> *shakeFiles = [self mapToShakeFiles:files];
        return shakeFiles;
    };
}

RCT_EXPORT_METHOD(silentReport:(nonnull NSString *)description:(nonnull NSArray *)files:(nonnull NSDictionary *)configurationMap)
{
    NSArray<SHKShakeFile *> * (^fileAttachBlock)(void) = ^NSArray<SHKShakeFile *> *(void) {
        NSMutableArray <SHKShakeFile*> *shakeFiles = [self mapToShakeFiles:files];
        return shakeFiles;
    };

    SHKShakeReportConfiguration* conf = [self mapToConfiguration:configurationMap];

    [SHKShake silentReportWithDescription:description fileAttachBlock:fileAttachBlock reportConfiguration:conf];
}

RCT_EXPORT_METHOD(insertNetworkRequest:(NSDictionary*)requestDict)
{
    NSDictionary* networkRequest = [self mapToNetworkRequest:requestDict];
    [self insertRNNetworkRequest:networkRequest];
}

RCT_REMAP_METHOD(insertNotificationEvent, data:(NSDictionary*)notificationDict)
{
    NSDictionary* notificationEvent = [self mapToNotificationEvent:notificationDict];
    [self insertRNNotificationEvent:notificationEvent];
}

RCT_EXPORT_METHOD(startNotificationsEmitter)
{
    SHKShake.notificationEventsFilter = ^SHKNotificationEventEditor *(SHKNotificationEventEditor * notificationEvent) {
        NSDictionary* notificationDict = [self notificationToMap:notificationEvent];
        [self sendEventWithName:@"EventNotification" body:notificationDict];

        return nil;
    };
}

RCT_EXPORT_METHOD(stopNotificationsEmitter)
{
    SHKShake.notificationEventsFilter = nil;
}

RCT_EXPORT_METHOD(showNotificationsSettings)
{
    // Method used just on Android
}

RCT_EXPORT_METHOD(addPrivateView:(nonnull NSNumber*)tag)
{
    UIView* view = [self.bridge.uiManager viewForReactTag:tag];
    [SHKShake addPrivateView:view];
}

RCT_EXPORT_METHOD(removePrivateView:(nonnull NSNumber*)tag)
{
    UIView* view = [self.bridge.uiManager viewForReactTag:tag];
    [SHKShake removePrivateView:view];
}

RCT_EXPORT_METHOD(clearPrivateViews) {
    [SHKShake clearPrivateViews];
}

RCT_EXPORT_METHOD(setSensitiveDataRedactionEnabled:(BOOL)isSensitiveDataRedactionEnabled)
{
    SHKShake.configuration.isSensitiveDataRedactionEnabled = isSensitiveDataRedactionEnabled;
}

RCT_EXPORT_METHOD(isSensitiveDataRedactionEnabled:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isSensitiveDataRedactionEnabled = [NSNumber numberWithBool:SHKShake.configuration.isSensitiveDataRedactionEnabled];
    resolve(isSensitiveDataRedactionEnabled);
}

RCT_EXPORT_METHOD(registerUser:(NSString *)userId)
{
    [SHKShake registerUserWithUserId:userId];
}

RCT_EXPORT_METHOD(updateUserId:(NSString *)userId)
{
    [SHKShake updateUserId:userId];
}

RCT_EXPORT_METHOD(updateUserMetadata:(NSDictionary *)metadataDic)
{
    [SHKShake updateUserMetadata:metadataDic];
}

RCT_EXPORT_METHOD(unregisterUser)
{
    [SHKShake unregisterUser];
}

// Mappers

- (LogLevel)mapToLogLevel:(NSDictionary*)logLevelDic
{
    NSString *value = [logLevelDic objectForKey:@"value"];

    LogLevel logLevel = LogLevelInfo;

    if ([value isEqualToString:@"VERBOSE"])
        logLevel = LogLevelVerbose;
    if ([value isEqualToString:@"DEBUG"])
        logLevel = LogLevelDebug;
    if ([value isEqualToString:@"INFO"])
        logLevel = LogLevelInfo;
    if ([value isEqualToString:@"WARN"])
        logLevel = LogLevelWarn;
    if ([value isEqualToString:@"ERROR"])
        logLevel = LogLevelError;

    return logLevel;
}

- (SHKShowOption)mapToShowOption:(NSDictionary*)showOptionDic
{
    NSString *value = [showOptionDic objectForKey:@"value"];

    SHKShowOption showOption = SHKShowOptionHome;

    if ([value isEqualToString:@"HOME"])
        showOption = SHKShowOptionHome;
    if ([value isEqualToString:@"NEW"])
        showOption = SHKShowOptionNew;

    return showOption;
}

- (NSMutableArray<SHKShakeFile*>*)mapToShakeFiles:(nonnull NSArray*)files
{
    NSMutableArray<SHKShakeFile*>* shakeFiles = [NSMutableArray array];
    for(int i = 0; i < [files count]; i++) {
        NSDictionary *file = [files objectAtIndex:i];
        NSString *path = [file objectForKey:@"path"];
        NSString *name = [file objectForKey:@"name"];

        NSURL *url = [[NSURL alloc] initFileURLWithPath: path];
        SHKShakeFile *attachedFile = [[SHKShakeFile alloc] initWithName:name andFileURL:url];

        if (attachedFile != nil) {
            [shakeFiles addObject:attachedFile];
        }
    }
    return shakeFiles;
}

- (NSMutableArray<SHKFeedbackEntry*>*)mapArrayToFeedbackTypes:(nonnull NSArray*)feedbackTypesArray
{
    NSMutableArray<SHKFeedbackEntry*>* feedbackTypes = [NSMutableArray array];
    for(int i = 0; i < [feedbackTypesArray count]; i++) {
        NSDictionary *feedbackTypeDic = [feedbackTypesArray objectAtIndex:i];
        NSString *title = [feedbackTypeDic objectForKey:@"title"];
        NSString *tag = [feedbackTypeDic objectForKey:@"tag"];
        NSString *icon = [feedbackTypeDic objectForKey:@"icon"];
        
        UIImage *image = [UIImage imageNamed:icon];
        SHKFeedbackEntry *feedbackType = [SHKFeedbackEntry entryWithTitle:title andTag:tag icon:image];

        if (feedbackType != nil) {
            [feedbackTypes addObject:feedbackType];
        }
    }
    return feedbackTypes;
}

- (NSArray<NSDictionary*>*)mapFeedbackTypesToArray:(nonnull NSArray<SHKFeedbackEntry*>*)feedbackTypes
{
    NSMutableArray<NSDictionary*>* feedbackTypesArray = [NSMutableArray array];
    for(int i = 0; i < [feedbackTypes count]; i++) {
        SHKFeedbackEntry *feedbackType = [feedbackTypes objectAtIndex:i];
        
        NSDictionary *feedbackTypeDic = [[NSDictionary alloc] init];
        feedbackTypeDic = @{
            @"title": feedbackType.title,
            @"tag": feedbackType.tag,
            @"icon": @""
        };
        
        if (feedbackTypeDic != nil) {
            [feedbackTypesArray addObject:feedbackTypeDic];
        }
    }
    return feedbackTypesArray;
}

- (SHKShakeReportConfiguration*)mapToConfiguration:(nonnull NSDictionary*)configurationDic
{
    BOOL includesBlackBoxData = [[configurationDic objectForKey:@"blackBoxData"] boolValue];
    BOOL includesActivityHistoryData = [[configurationDic objectForKey:@"activityHistoryData"] boolValue];
    BOOL includesScreenshotImage = [[configurationDic objectForKey:@"screenshot"] boolValue];
    BOOL showsToastMessageOnSend = [[configurationDic objectForKey:@"showReportSentMessage"] boolValue];

    SHKShakeReportConfiguration *conf = SHKShakeReportConfiguration.new;
    conf.includesBlackBoxData = includesBlackBoxData;
    conf.includesActivityHistoryData = includesActivityHistoryData;
    conf.includesScreenshotImage = includesScreenshotImage;
    conf.showsToastMessageOnSend = showsToastMessageOnSend;

    return conf;
}

- (NSDictionary*)mapToNetworkRequest:(nonnull NSDictionary*)requestDict
{
    NSDictionary *networkRequest = [[NSDictionary alloc] init];
    NSData *data = [requestDict[@"requestBody"] dataUsingEncoding:NSUTF8StringEncoding];
    networkRequest = @{
        @"url": requestDict[@"url"],
        @"method": requestDict[@"method"],
        @"responseBody": requestDict[@"responseBody"],
        @"statusCode": requestDict[@"statusCode"],
        @"requestBody": data,
        @"requestHeaders": requestDict[@"requestHeaders"],
        @"duration": requestDict[@"duration"],
        @"responseHeaders": requestDict[@"responseHeaders"],
        @"timestamp": requestDict[@"timestamp"]
    };
    return networkRequest;
}

- (NSDictionary*)mapToNotificationEvent:(nonnull NSDictionary*)notificationDict
{
    NSDictionary *notificationEvent = [[NSDictionary alloc] init];
    notificationEvent = @{
        @"id": (notificationDict[@"id"] ?: @""),
        @"title": (notificationDict[@"title"] ?: @""),
        @"description": (notificationDict[@"description"] ?: @"")
    };
    return notificationEvent;
}

- (NSDictionary*)notificationToMap:(nonnull SHKNotificationEventEditor*)notification
{
    NSDictionary *notificationDict = [[NSDictionary alloc] init];
    notificationDict = @{
        @"id": (notification.identifier ?: @""),
        @"title": (notification.title ?: @""),
        @"description": (notification.description ?: @"")
    };
    return notificationDict;
}

// Private

- (void)setPlatformInfo
{
    NSDictionary *shakeInfo = @{
        @"platform": @"ReactNative",
        @"sdkVersion": @"10.0.0"
    };
    [SHKShake performSelector:sel_getUid(@"_setPlatformAndSDKVersion:".UTF8String) withObject:shakeInfo];
}

- (void)disableNetworkRequests
{
    [SHKShake performSelector:sel_getUid(@"_setNetworkRequestReporterDisabledDueToRN:".UTF8String) withObject:@YES];
}

- (void)insertRNNotificationEvent:(nonnull NSDictionary*)notificationEvent
{
    [SHKShake performSelector:sel_getUid(@"_reportNotification:".UTF8String) withObject:notificationEvent];
}

- (void)insertRNNetworkRequest:(nonnull NSDictionary*)networkRequest
{
    [SHKShake performSelector:sel_getUid(@"_reportRequestCompleted:".UTF8String) withObject:networkRequest];
}

@end

