#import "RNShake.h"
#import <React/RCTUIManager.h>
#import <Shake/Shake.h>
#import <Shake/SHKShakeConfiguration.h>
#import <Shake/SHKTheme.h>
#import <Shake/SHKShakeFile.h>
#import <Shake/SHKHomeAction.h>
#import <Shake/SHKHomeSubmitAction.h>
#import <Shake/SHKHomeChatAction.h>
#import <Shake/SHKHomeActionProtocol.h>
#import <Shake/SHKShakeReportConfiguration.h>
#import <Shake/SHKFormItemProtocol.h>

@implementation RNShake

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setPlatformInfo];
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
  return @[@"EventNotification", @"UnreadMessages", @"HomeActionTap", @"OnShakeOpen", @"OnShakeDismiss", @"OnShakeSubmit"];
}

// React Native

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(start, clientId:(NSString*)clientId clientSecret:(NSString*)clientSecret startResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [SHKShake startWithClientId:clientId clientSecret:clientSecret];

    /// Forward Shake callbacks to the RN
    SHKShake.configuration.shakeOpenListener = ^() {
        [self sendEventWithName:@"OnShakeOpen" body:nil];
    };
    SHKShake.configuration.shakeDismissListener = ^() {
        [self sendEventWithName:@"OnShakeDismiss" body:nil];
    };
    SHKShake.configuration.shakeSubmitListener = ^(NSString* type, NSDictionary* fields) {
        NSDictionary *data = @{
            @"type": type,
            @"fields": fields
        };
        [self sendEventWithName:@"OnShakeSubmit" body:data];
    };
    
    resolve(nil);
}

RCT_REMAP_METHOD(show, shakeScreen:(NSDictionary*)showOptionDic)
{
    SHKShowOption showOption = [self mapToShowOption:showOptionDic];
    [SHKShake show:showOption];
}

RCT_EXPORT_METHOD(setShakeForm:(NSDictionary *)shakeFormDic)
{
    SHKForm* shakeForm = [self mapDicToShakeForm:shakeFormDic];
    SHKShake.configuration.form = shakeForm;
}

RCT_EXPORT_METHOD(getShakeForm:(RCTPromiseResolveBlock)resolve:(RCTPromiseRejectBlock)reject)
{
    SHKForm *shakeForm = SHKShake.configuration.form;
    NSDictionary *shakeFormDict = [self mapShakeFormToDict:shakeForm];
    resolve(shakeFormDict);
}

RCT_EXPORT_METHOD(setShakeTheme:(NSDictionary *)shakeThemeDict)
{
    SHKTheme *shakeTheme = [self mapDictToShakeTheme:shakeThemeDict];
    SHKShake.configuration.theme = shakeTheme;
}

RCT_EXPORT_METHOD(setHomeSubtitle:(NSString*)subtitle)
{
    SHKShake.configuration.homeSubtitle = subtitle;
}

RCT_EXPORT_METHOD(setHomeActions:(NSArray*)actionsArray)
{
    NSArray<id<SHKHomeActionProtocol>> *homeActions = [self mapArrayToShakeActions:actionsArray];
    for(int i = 0; i < [homeActions count]; i++) {
        id<SHKHomeActionProtocol> action = [homeActions objectAtIndex:i];
        action.handler = ^{
            [self sendEventWithName:@"HomeActionTap" body:action.title];
        };
    }
    SHKShake.configuration.homeActions = homeActions;
}

RCT_EXPORT_METHOD(setUserFeedbackEnabled:(BOOL)enabled)
{
    SHKShake.configuration.isUserFeedbackEnabled = enabled;
}

RCT_REMAP_METHOD(isUserFeedbackEnabled, isUserFeedbackEnabledwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *isUserFeedbackEnabled = [NSNumber numberWithBool:SHKShake.configuration.isUserFeedbackEnabled];
    resolve(isUserFeedbackEnabled);
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

RCT_REMAP_METHOD(getDefaultScreen, getDefaultScreenwithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    SHKShowOption showOption = SHKShake.configuration.defaultShowOption;
    NSString *showOptionStr = [self showOptionToString:showOption];
    resolve(showOptionStr);
}

RCT_EXPORT_METHOD(setDefaultScreen:(NSDictionary*)showOptionDic)
{
    SHKShowOption showOption = [self mapToShowOption:showOptionDic];
    SHKShake.configuration.defaultShowOption = showOption;
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

RCT_EXPORT_METHOD(clearMetadata)
{
    [SHKShake clearMetadata];
}

RCT_EXPORT_METHOD(log:(NSDictionary *)logLevelDic:(NSString *)message)
{
    if (message == nil) message = @"";
    LogLevel logLevel = [self mapToLogLevel:logLevelDic];
    [SHKShake logWithLevel:logLevel message:message];
}

RCT_EXPORT_METHOD(setShakeReportData:(NSArray *)files)
{
    SHKShake.onPrepareReportData = ^NSArray<SHKShakeFile *> * _Nonnull {
        NSMutableArray<SHKShakeFile*> *shakeFiles = [self mapToShakeFiles:files];
        return shakeFiles;
    };
}

RCT_EXPORT_METHOD(silentReport:(NSString *)description:(NSArray *)files:(NSDictionary *)configurationMap)
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
    if (networkRequest != nil) {
        [self insertRNNetworkRequest:networkRequest];
    }
}

RCT_REMAP_METHOD(insertNotificationEvent, data:(NSDictionary*)notificationDict)
{
    NSDictionary* notificationEvent = [self mapToNotificationEvent:notificationDict];
    if (notificationEvent != nil) {
        [self insertRNNotificationEvent:notificationEvent];
    }
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

RCT_EXPORT_METHOD(startUnreadChatMessagesEmitter)
{
    SHKShake.unreadMessagesListener = ^(NSUInteger count) {
        [self sendEventWithName:@"UnreadMessages" body:[NSNumber numberWithInt:(int)count]];
    };
}

RCT_EXPORT_METHOD(stopUnreadChatMessagesEmitter)
{
    SHKShake.unreadMessagesListener = nil;
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

- (NSString*)showOptionToString:(SHKShowOption)showOption
{
    NSString* result = @"";

    if (showOption == SHKShowOptionHome)
        result = @"HOME";
    if (showOption == SHKShowOptionNew)
        result = @"NEW";

    return result;
}

- (NSMutableArray<SHKShakeFile*>*)mapToShakeFiles:(NSArray*)files
{
    if (files == nil) return nil;

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

- (SHKTheme*)mapDictToShakeTheme:(NSDictionary*)themeDict
{
    if (themeDict == nil) return nil;

    NSString *fontFamilyBold = [themeDict objectForKey:@"fontFamilyBold"];
    NSString *fontFamilyMedium = [themeDict objectForKey:@"fontFamilyMedium"];
    NSString *backgroundColor = [themeDict objectForKey:@"backgroundColor"];
    NSString *secondaryBackgroundColor = [themeDict objectForKey:@"secondaryBackgroundColor"];
    NSString *textColor = [themeDict objectForKey:@"textColor"];
    NSString *secondaryTextColor = [themeDict objectForKey:@"secondaryTextColor"];
    NSString *accentColor = [themeDict objectForKey:@"accentColor"];
    NSString *accentTextColor = [themeDict objectForKey:@"accentTextColor"];
    NSString *outlineColor = [themeDict objectForKey:@"outlineColor"];
    NSNumber *borderRadius = [themeDict objectForKey:@"borderRadius"];
    NSNumber *shadowRadius = [themeDict objectForKey:@"shadowRadius"];
    NSNumber *shadowOpacity = [themeDict objectForKey:@"shadowOpacity"];
    NSDictionary *shadowOffset = [themeDict objectForKey:@"shadowOffset"];
    NSNumber *shadowOffsetWidth = nil;
    NSNumber *shadowOffsetHeight = nil;
    if (shadowOffset) {
        shadowOffsetWidth = shadowOffset[@"width"];
        shadowOffsetHeight = shadowOffset[@"height"];
    }

    NSString *fontFamilyBoldValue = !fontFamilyBold ? nil : fontFamilyBold;
    NSString *fontFamilyMediumValue = !fontFamilyMedium ? nil : fontFamilyMedium;
    UIColor *backgroundColorValue = !backgroundColor ? nil : [self colorFromHexString:backgroundColor];
    UIColor *secondaryBackgroundColorValue = !secondaryBackgroundColor ? nil : [self colorFromHexString:secondaryBackgroundColor];
    UIColor *textColorValue = !textColor ? nil : [self colorFromHexString:textColor];
    UIColor *secondaryTextColorValue = !secondaryTextColor ? nil : [self colorFromHexString:secondaryTextColor];
    UIColor *accentColorValue = !accentColor ? nil : [self colorFromHexString:accentColor];
    UIColor *accentTextColorValue = !accentTextColor ? nil : [self colorFromHexString:accentTextColor];
    UIColor *outlineColorValue = !outlineColor ? nil : [self colorFromHexString:outlineColor];
    CGFloat borderRadiusValue = !borderRadius ? 11 : [borderRadius floatValue];
    CGFloat shadowRadiusValue = !shadowRadius ? 0 : [shadowRadius floatValue];
    CGFloat shadowOpacityValue = !shadowOpacity ? 0 : [shadowOpacity floatValue];
    CGFloat shadowOffsetWidthValue = !shadowOffsetWidth ? 0 : [shadowOffsetWidth floatValue];
    CGFloat shadowOffsetHeightValue = !shadowOffsetHeight ? 0 : [shadowOffsetHeight floatValue];

    return [[SHKTheme alloc] initWithFontFamilyMedium:fontFamilyMediumValue
                      fontFamilyBold:fontFamilyBoldValue
                      background:backgroundColorValue
                      secondaryBackground:secondaryBackgroundColorValue
                      textColor:textColorValue
                      secondaryTextColor:secondaryTextColorValue
                      brandAccentColor:accentColorValue
                      brandTextColor:accentTextColorValue
                      borderRadius:borderRadiusValue
                      outlineColor:outlineColorValue
                      shadowInfo:[[SHKShadowInfo alloc]initWithOffset:CGSizeMake(shadowOffsetWidthValue, shadowOffsetHeightValue)
                      opacity:shadowOpacityValue
                      radius:shadowRadiusValue
                      color:UIColor.blackColor]];
}

- (NSMutableArray<id<SHKHomeActionProtocol>>*)mapArrayToShakeActions:(NSArray*)actionsArray
{
    if (actionsArray == nil) return nil;

    NSMutableArray<id<SHKHomeActionProtocol>>* homeActions = [NSMutableArray array];
    for(int i = 0; i < [actionsArray count]; i++) {
        NSDictionary *actionDic = [actionsArray objectAtIndex:i];

        NSString *type = [actionDic objectForKey:@"type"];
        if ([type isEqualToString:@"chat"]) {
            NSString *title = [actionDic objectForKey:@"title"];
            NSString *subtitle = [actionDic objectForKey:@"subtitle"];
            NSString *icon = [actionDic objectForKey:@"icon"];

            // NSNull causes crash
            if (title && [title isEqual:[NSNull null]]) title=nil;
            if (subtitle && [subtitle isEqual:[NSNull null]]) subtitle=nil;
            if (icon && [icon isEqual:[NSNull null]]) icon=nil;

            SHKHomeChatAction *action = [[SHKHomeChatAction alloc] initWithTitle:title subtitle:subtitle icon:[self base64ToUIImage:icon]];
            [homeActions addObject:action];
        }
        if ([type isEqualToString:@"submit"]) {
            NSString *title = [actionDic objectForKey:@"title"];
            NSString *subtitle = [actionDic objectForKey:@"subtitle"];
            NSString *icon = [actionDic objectForKey:@"icon"];

            // NSNull causes crash
            if (title && [title isEqual:[NSNull null]]) title=nil;
            if (subtitle && [subtitle isEqual:[NSNull null]]) subtitle=nil;
            if (icon && [icon isEqual:[NSNull null]]) icon=nil;

            SHKHomeSubmitAction *action = [[SHKHomeSubmitAction alloc] initWithTitle:title subtitle:subtitle icon:[self base64ToUIImage:icon]];
            [homeActions addObject:action];
        }
        if ([type isEqualToString:@"default"]) {
            NSString *title = [actionDic objectForKey:@"title"];
            NSString *subtitle = [actionDic objectForKey:@"subtitle"];
            NSString *icon = [actionDic objectForKey:@"icon"];

            // NSNull causes crash
            if (title && [title isEqual:[NSNull null]]) title=nil;
            if (subtitle && [subtitle isEqual:[NSNull null]]) subtitle=nil;
            if (icon && [icon isEqual:[NSNull null]]) icon=nil;

            SHKHomeAction *action = [[SHKHomeAction alloc] initWithTitle:title subtitle:subtitle icon:[self base64ToUIImage:icon] handler:nil];
            [homeActions addObject:action];
        }
    }
    return homeActions;
}

- (SHKForm *)mapDicToShakeForm:(NSDictionary *)shakeFormDic
{
    if (shakeFormDic == nil) return nil;

    NSMutableArray *dictComponents = [shakeFormDic objectForKey:@"components"];
    if (dictComponents == nil) dictComponents = [NSMutableArray array];

    NSMutableArray<id<SHKFormItemProtocol>>* formComponents = [NSMutableArray array];

    for(int i = 0; i < [dictComponents count]; i++) {
        NSDictionary *component = [dictComponents objectAtIndex:i];

        NSString *type = [component objectForKey:@"type"];
        if ([type isEqualToString:@"title"]) {
            NSString *key = [component objectForKey:@"key"];
            NSString *label = [component objectForKey:@"label"];
            NSString *initialValue = [component objectForKey:@"initialValue"];
            BOOL required = [[component objectForKey:@"required"] boolValue];

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";
            if (initialValue && [initialValue isEqual:[NSNull null]]) initialValue=nil;

            [formComponents addObject:[[SHKTitle alloc] initWithKey:key label:label required:required initialValue:initialValue]];
        }
        if ([type isEqualToString:@"text_input"]) {
            NSString *key = [component objectForKey:@"key"];
            NSString *label = [component objectForKey:@"label"];
            NSString *initialValue = [component objectForKey:@"initialValue"];
            BOOL required = [[component objectForKey:@"required"] boolValue];

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";
            if (initialValue && [initialValue isEqual:[NSNull null]]) initialValue=nil;

            [formComponents addObject:[[SHKTextInput alloc] initWithKey:key label:label required:required initialValue:initialValue]];
        }
        if ([type isEqualToString:@"email"]) {
            NSString *key = [component objectForKey:@"key"];
            NSString *label = [component objectForKey:@"label"];
            NSString *initialValue = [component objectForKey:@"initialValue"];
            BOOL required = [[component objectForKey:@"required"] boolValue];

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";
            if (initialValue && [initialValue isEqual:[NSNull null]]) initialValue=nil;

            [formComponents addObject:[[SHKEmail alloc] initWithKey:key label:label required:required initialValue:initialValue]];
        }
        if ([type isEqualToString:@"picker"]) {
            NSString *key = [component objectForKey:@"key"];
            NSString *label = [component objectForKey:@"label"];
            NSArray *itemsArray = [component objectForKey:@"items"];

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";

            NSMutableArray<SHKPickerItem*>* items = [NSMutableArray array];
            for(int j = 0; j < [itemsArray count]; j++) {
                NSDictionary *arrayItem = [itemsArray objectAtIndex:j];

                NSString *key = [component objectForKey:@"key"];
                NSString *text = [arrayItem objectForKey:@"text"];
                NSString *icon = [arrayItem objectForKey:@"icon"];
                NSString *tag = [arrayItem objectForKey:@"tag"];

                // NSNull causes crash
                if (key && [key isEqual:[NSNull null]]) key=@"";
                if (text && [text isEqual:[NSNull null]]) text=@"";
                if (icon && [icon isEqual:[NSNull null]]) icon=nil;
                if (tag && [tag isEqual:[NSNull null]]) tag=nil;

                SHKPickerItem *pickerItem = [[SHKPickerItem alloc] initWithKey:key text:text icon:[self base64ToUIImage:icon] tag:tag];
                [items addObject:pickerItem];
            }

            [formComponents addObject:[[SHKPicker alloc] initWithKey:key label:label items:items]];
        }
        if ([type isEqualToString:@"attachments"]) {
            [formComponents addObject:SHKAttachments.new];
        }

        if ([type isEqualToString:@"inspect"]) {
            [formComponents addObject:SHKInspectButton.new];

        }
    }
    return [[SHKForm alloc] initWithItems:formComponents];
}

- (NSDictionary*)mapShakeFormToDict:(SHKForm*)shakeForm
{
    if (shakeForm == nil) return nil;

    NSMutableArray<NSDictionary*>* componentsArray = [NSMutableArray array];

    for(int i = 0; i < [shakeForm.items count]; i++) {
        id<SHKFormItemProtocol> item = [shakeForm.items objectAtIndex:i];

        if ([item isKindOfClass:[SHKTitle class]]) {
            SHKTitle *component = item;

            NSDictionary *dict = [[NSDictionary alloc] init];
            dict = @{
                @"type": @"title",
                @"key": component.key,
                @"label": component.label,
                @"initialValue": component.initialValue ?: @"",
                @"required": [NSNumber numberWithBool:component.required]
            };

            [componentsArray addObject:dict];
        }
        if ([item isKindOfClass:[SHKTextInput class]]) {
            SHKTextInput *component = item;

            NSDictionary *dict = [[NSDictionary alloc] init];
            dict = @{
                @"type": @"text_input",
                @"key": component.key,
                @"label": component.label,
                @"initialValue": component.initialValue ?: @"",
                @"required": [NSNumber numberWithBool:component.required]
            };

            [componentsArray addObject:dict];
        }

        if ([item isKindOfClass:[SHKEmail class]]) {
            SHKEmail *component = item;

            NSDictionary *dict = [[NSDictionary alloc] init];
            dict = @{
                @"type": @"email",
                @"key": component.key,
                @"label": component.label,
                @"initialValue": component.initialValue ?: @"",
                @"required": [NSNumber numberWithBool:component.required]
            };

            [componentsArray addObject:dict];
        }

        if ([item isKindOfClass:[SHKPicker class]]) {
            SHKPicker *component = item;

            NSMutableArray<NSDictionary*>* pickerItemsArray = [NSMutableArray array];
            for(int j = 0; j < [component.items count]; j++) {
                SHKPickerItem *pickerItem = [component.items objectAtIndex:j];

                NSDictionary *pickerItemDict = [[NSDictionary alloc] init];
                pickerItemDict = @{
                    @"key": component.key,
                    @"text": pickerItem.text,
                    @"icon": [self UIImageToBase64:pickerItem.icon] ?: [NSNull null],
                    @"tag": pickerItem.tag ?: [NSNull null],
                };

                [pickerItemsArray addObject:pickerItemDict];
            }


            NSDictionary *componentDict = [[NSDictionary alloc] init];
            componentDict = @{
                @"type": @"picker",
                @"key": component.key,
                @"label": component.label,
                @"items": pickerItemsArray
            };

            [componentsArray addObject:componentDict];
        }

        if ([item isKindOfClass:[SHKAttachments class]]) {
            NSDictionary *dict = [[NSDictionary alloc] init];
            dict = @{
                @"type": @"attachments",
            };

            [componentsArray addObject:dict];
        }
        if ([item isKindOfClass:[SHKInspectButton class]]) {
            NSDictionary *dict = [[NSDictionary alloc] init];
            dict = @{
                @"type": @"inspect",
            };

            [componentsArray addObject:dict];
        }
    }

    NSDictionary *shakeFormDict = [[NSDictionary alloc] init];
    shakeFormDict = @{@"components": componentsArray};

    return shakeFormDict;
}

- (SHKShakeReportConfiguration*)mapToConfiguration:(NSDictionary*)configurationDic
{
    if (configurationDic == nil) return nil;

    BOOL includesBlackBoxData = [[configurationDic objectForKey:@"blackBoxData"] boolValue];
    BOOL includesActivityHistoryData = [[configurationDic objectForKey:@"activityHistoryData"] boolValue];
    BOOL includesScreenshot = [[configurationDic objectForKey:@"screenshot"] boolValue];
    BOOL includesVideo = [[configurationDic objectForKey:@"video"] boolValue];
    BOOL showsToastMessageOnSend = [[configurationDic objectForKey:@"showReportSentMessage"] boolValue];

    SHKShakeReportConfiguration *conf = SHKShakeReportConfiguration.new;
    conf.includesBlackBoxData = includesBlackBoxData;
    conf.includesActivityHistoryData = includesActivityHistoryData;
    conf.includesScreenshotImage = includesScreenshot;
    conf.includesVideo = includesVideo;
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

- (UIColor *)colorFromHexString:(NSString *)hexString {
    if (hexString == nil) return nil;

    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

- (UIImage*)base64ToUIImage:(NSString *)base64 {
    if (base64 == nil) return nil;

    NSUInteger paddedLength = base64.length + (4 - (base64.length % 4));
    NSString* correctBase64String = [base64 stringByPaddingToLength:paddedLength withString:@"=" startingAtIndex:0];
    NSData* data = [[NSData alloc]initWithBase64EncodedString:correctBase64String options:NSDataBase64DecodingIgnoreUnknownCharacters];
    return [UIImage imageWithData:data];
}

- (NSString *)UIImageToBase64:(UIImage *)image {
    if (image == nil) return nil;

    NSData *data = UIImagePNGRepresentation(image);
    NSString *base64String = [data base64EncodedStringWithOptions:0];
    return base64String;
}

// Private

- (void)setPlatformInfo
{
    NSDictionary *shakeInfo = @{
        @"platform": @"ReactNative",
        @"sdkVersion": @"16.2.0"
    };
    [SHKShake performSelector:sel_getUid(@"_setPlatformAndSDKVersion:".UTF8String) withObject:shakeInfo];
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

