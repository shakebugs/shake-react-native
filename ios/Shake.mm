#import "Shake.h"
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

@implementation Shake
RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setPlatformInfo];
    }
    return self;
}

// Execute methods on main thread

+ (BOOL)requiresMainQueueSetup
{
	return YES;
}

- (dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}

// Shake SDK methods

- (void)start:(NSString *)apiKey resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [SHKShake startWithApiKey:apiKey];

    SHKShake.configuration.shakeOpenListener = ^{
        [self sendEventWithName:@"OnShakeOpen" body:nil];
    };
    SHKShake.configuration.shakeDismissListener = ^{
        [self sendEventWithName:@"OnShakeDismiss" body:nil];
    };
    SHKShake.configuration.shakeSubmitListener = ^(NSString *type, NSDictionary *fields) {
        NSDictionary *data = @{
            @"type": type,
            @"fields": fields
        };
        [self sendEventWithName:@"OnShakeSubmit" body:data];
    };

    resolve(nil);
}

- (void)show:(JS::NativeShake::ShakeScreen &)nativeShakeScreen {
    SHKShowOption showOption = [self nativeShakeScreenToShowOption:nativeShakeScreen];
    [SHKShake show:showOption];
}

- (void)setShakeForm:(JS::NativeShake::ShakeForm &)nativeShakeForm {
    SHKForm *shakeForm = [self mapDicToShakeForm:nativeShakeForm];
    SHKShake.configuration.form = shakeForm;
}

- (NSDictionary *)getShakeForm {
    SHKForm *shakeForm = SHKShake.configuration.form;
    NSDictionary *shakeFormDict = [self mapShakeFormToDict:shakeForm];
    return shakeFormDict;
}

- (void)setShakeTheme:(JS::NativeShake::ShakeTheme &)nativeShakeTheme
{
    SHKTheme *shakeTheme = [self mapNativeShakeThemeToShakeTheme:nativeShakeTheme];
    SHKShake.configuration.theme = shakeTheme;
}

- (void)setHomeSubtitle:(NSString *)subtitle {
    SHKShake.configuration.homeSubtitle = subtitle;
}

- (void)setHomeActions:(NSArray *)nativeActions
{
    NSArray<id<SHKHomeActionProtocol>> *homeActions = [self mapArrayToShakeActions:nativeActions];
    for (int i = 0; i < [homeActions count]; i++) {
        id<SHKHomeActionProtocol> action = [homeActions objectAtIndex:i];
        action.handler = ^{
            [self sendEventWithName:@"HomeActionTap" body:action.title];
        };
    }
    SHKShake.configuration.homeActions = homeActions;
}

- (void)setUserFeedbackEnabled:(BOOL)enabled {
    SHKShake.configuration.isUserFeedbackEnabled = enabled;
}

- (NSNumber *)isUserFeedbackEnabled {
    return [NSNumber numberWithBool:SHKShake.configuration.isUserFeedbackEnabled];
}

- (void)setEnableActivityHistory:(BOOL)enableActivityHistory {
    SHKShake.configuration.isActivityHistoryEnabled = enableActivityHistory;
}

- (NSNumber *)isEnableActivityHistory {
    return [NSNumber numberWithBool:SHKShake.configuration.isActivityHistoryEnabled];
}

- (void)setEnableBlackBox:(BOOL)enableBlackBox {
    SHKShake.configuration.isBlackBoxEnabled = enableBlackBox;
}

- (NSNumber *)isEnableBlackBox {
    return [NSNumber numberWithBool:SHKShake.configuration.isBlackBoxEnabled];
}

- (void)setShowFloatingReportButton:(BOOL)showFloatingReportButton {
    SHKShake.configuration.isFloatingReportButtonShown = showFloatingReportButton;
}

- (NSNumber *)isShowFloatingReportButton {
    return [NSNumber numberWithBool:SHKShake.configuration.isFloatingReportButtonShown];
}

- (void)setInvokeShakeOnShakeDeviceEvent:(BOOL)invokeOnShake {
    SHKShake.configuration.isInvokedByShakeDeviceEvent = invokeOnShake;
}

- (NSNumber *)isInvokeShakeOnShakeDeviceEvent {
    return [NSNumber numberWithBool:SHKShake.configuration.isInvokedByShakeDeviceEvent];
}

- (void)setInvokeShakeOnScreenshot:(BOOL)invokeOnScreenshot {
    SHKShake.configuration.isInvokedByScreenshot = invokeOnScreenshot;
}

- (NSNumber *)isInvokeShakeOnScreenshot {
    return [NSNumber numberWithBool:SHKShake.configuration.isInvokedByScreenshot];
}

- (void)setScreenshotIncluded:(BOOL)screenshotIncluded {
    SHKShake.configuration.isScreenshotIncluded = screenshotIncluded;
}

- (NSNumber *)isScreenshotIncluded {
    return [NSNumber numberWithBool:SHKShake.configuration.isScreenshotIncluded];
}

- (NSDictionary *)getDefaultScreen {
    SHKShowOption showOption = SHKShake.configuration.defaultShowOption;
    NSDictionary *shakeScreenDict = [self showOptionToNativeShakeScreen:showOption];
    return shakeScreenDict;
}

- (void)setDefaultScreen:(JS::NativeShake::ShakeScreen &)nativeShakeScreen {
    SHKShowOption showOption = [self nativeShakeScreenToShowOption:nativeShakeScreen];
    SHKShake.configuration.defaultShowOption = showOption;
}

- (void)setShakingThreshold:(double)shakingThreshold {
    SHKShake.configuration.shakingThreshold = shakingThreshold;
}

- (NSNumber *)getShakingThreshold {
    NSNumber *shakingThreshold = [NSNumber numberWithFloat:SHKShake.configuration.shakingThreshold];
    return shakingThreshold;
}

- (void)setShowIntroMessage:(BOOL)showIntroMessage {
    SHKShake.configuration.setShowIntroMessage = showIntroMessage;
}

- (NSNumber *)getShowIntroMessage {
    return [NSNumber numberWithBool:SHKShake.configuration.setShowIntroMessage];
}

- (void)setAutoVideoRecording:(BOOL)isAutoVideoRecordingEnabled {
    SHKShake.configuration.isAutoVideoRecordingEnabled = isAutoVideoRecordingEnabled;
}

- (NSNumber *)isAutoVideoRecording {
    return [NSNumber numberWithBool:SHKShake.configuration.isAutoVideoRecordingEnabled];
}

- (void)setConsoleLogsEnabled:(BOOL)isConsoleLogsEnabled {
    SHKShake.configuration.isConsoleLogsEnabled = isConsoleLogsEnabled;
}

- (NSNumber *)isConsoleLogsEnabled {
    return [NSNumber numberWithBool:SHKShake.configuration.isConsoleLogsEnabled];
}

- (void)setMetadata:(NSString *)key value:(NSString *)value {
    [SHKShake setMetadataWithKey:key value:value];
}

- (void)clearMetadata {
    [SHKShake clearMetadata];
}

- (void)log:(JS::NativeShake::LogLevel &)nativeLogLevel message:(NSString *)message {
    LogLevel logLevel = [self mapToLogLevel:nativeLogLevel];
    [SHKShake logWithLevel:logLevel message:message];
}

- (void)setShakeReportData:(NSArray *)files {
    SHKShake.onPrepareReportData = ^NSArray<SHKShakeFile *> * _Nonnull {
        NSMutableArray<SHKShakeFile *> *shakeFiles = [self mapToShakeFiles:files];
        return shakeFiles;
    };
}

- (void)silentReport:(NSString *)description files:(NSArray *)files configuration:(JS::NativeShake::ShakeReportConfiguration &)nativeConfiguration {
    NSArray<SHKShakeFile *> * (^fileAttachBlock)(void) = ^NSArray<SHKShakeFile *> *(void) {
        NSMutableArray<SHKShakeFile *> *shakeFiles = [self mapToShakeFiles:files];
        return shakeFiles;
    };

    SHKShakeReportConfiguration *conf = [self mapToConfiguration:nativeConfiguration];
    [SHKShake silentReportWithDescription:description fileAttachBlock:fileAttachBlock reportConfiguration:conf];
}

- (void)insertNetworkRequest:(JS::NativeShake::NetworkRequest &)nativeNetworkRequest {
    NSDictionary *networkRequest = [self mapToNetworkRequestToDict:nativeNetworkRequest];
    if (networkRequest != nil) {
        [self insertRNNetworkRequest:networkRequest];
    }
}

- (void)insertNotificationEvent:(JS::NativeShake::NotificationEvent &)nativeNotification {
    NSDictionary *notificationEvent = [self mapToNotificationEvent:nativeNotification];
    if (notificationEvent != nil) {
        [self insertRNNotificationEvent:notificationEvent];
    }
}

- (void)startNotificationsEmitter {
    SHKShake.notificationEventsFilter = ^SHKNotificationEventEditor *(SHKNotificationEventEditor *notificationEvent) {
        NSDictionary *notificationDict = [self notificationToMap:notificationEvent];
        [self sendEventWithName:@"EventNotification" body:notificationDict];

        return nil;
    };
}

- (void)stopNotificationsEmitter {
    SHKShake.notificationEventsFilter = nil;
}

- (void)startUnreadChatMessagesEmitter {
    SHKShake.unreadMessagesListener = ^(NSUInteger count) {
        [self sendEventWithName:@"UnreadMessages" body:[NSNumber numberWithInt:(int)count]];
    };
}

- (void)stopUnreadChatMessagesEmitter {
    SHKShake.unreadMessagesListener = nil;
}

- (void)addPrivateView:(double)tag {
    UIView *view = [self.bridge.uiManager viewForReactTag:[NSNumber numberWithDouble:tag]];
    [SHKShake addPrivateView:view];
}

- (void)removePrivateView:(double)tag {
    UIView *view = [self.bridge.uiManager viewForReactTag:[NSNumber numberWithDouble:tag]];
    [SHKShake removePrivateView:view];
}

- (void)clearPrivateViews {
    [SHKShake clearPrivateViews];
}

- (void)setSensitiveDataRedactionEnabled:(BOOL)isSensitiveDataRedactionEnabled {
    SHKShake.configuration.isSensitiveDataRedactionEnabled = isSensitiveDataRedactionEnabled;
}

- (NSNumber *)isSensitiveDataRedactionEnabled {
    return [NSNumber numberWithBool:SHKShake.configuration.isSensitiveDataRedactionEnabled];
}

- (void)registerUser:(NSString *)userId {
    [SHKShake registerUserWithUserId:userId];
}

- (void)updateUserId:(NSString *)userId {
    [SHKShake updateUserId:userId];
}

- (void)updateUserMetadata:(NSDictionary *)metadataDic {
    [SHKShake updateUserMetadata:metadataDic];
}

- (void)unregisterUser {
    [SHKShake unregisterUser];
}

- (void)setTags:(NSArray *)tags {
    SHKShake.configuration.tags = tags;
}

- (void)setPushNotificationsToken:(NSString *)token {
    // Ignore
}

- (void)showChatNotification:(JS::NativeShake::ChatNotification &)notification {
    // Ignore
}

- (void)showNotificationsSettings {
    // Ignore
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeShakeSpecJSI>(params);
}

// ObjC - JS events

- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventNotification", @"UnreadMessages", @"HomeActionTap", @"OnShakeOpen", @"OnShakeDismiss", @"OnShakeSubmit"];
}

// Objc - JS models mappers

- (LogLevel)mapToLogLevel:(JS::NativeShake::LogLevel &)nativeLogLevel
{
    NSString *value = nativeLogLevel.value();

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

- (SHKShowOption)nativeShakeScreenToShowOption:(JS::NativeShake::ShakeScreen &)nativeShakeScreen
{
    NSString *value = nativeShakeScreen.value();

    SHKShowOption showOption = SHKShowOptionHome;

    if ([value isEqualToString:@"HOME"])
        showOption = SHKShowOptionHome;
    if ([value isEqualToString:@"NEW"])
        showOption = SHKShowOptionNew;

    return showOption;
}

- (NSDictionary *)showOptionToNativeShakeScreen:(SHKShowOption)showOption
{
    NSString* value = @"HOME";

    if (showOption == SHKShowOptionHome)
        value = @"HOME";
    if (showOption == SHKShowOptionNew)
        value = @"NEW";

    return @{value: value};
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

- (SHKTheme*)mapNativeShakeThemeToShakeTheme:(JS::NativeShake::ShakeTheme &)nativeShakeTheme {

    NSString *fontFamilyBold = nativeShakeTheme.fontFamilyBold();
    NSString *fontFamilyMedium = nativeShakeTheme.fontFamilyMedium();
    NSString *backgroundColor = nativeShakeTheme.backgroundColor();
    NSString *secondaryBackgroundColor = nativeShakeTheme.secondaryBackgroundColor();
    NSString *textColor = nativeShakeTheme.textColor();
    NSString *secondaryTextColor = nativeShakeTheme.secondaryTextColor();
    NSString *accentColor = nativeShakeTheme.accentColor();
    NSString *accentTextColor = nativeShakeTheme.accentTextColor();
    NSString *outlineColor = nativeShakeTheme.outlineColor();
    NSNumber *borderRadius = nil;
    if (nativeShakeTheme.borderRadius().has_value()) borderRadius = [NSNumber numberWithDouble:nativeShakeTheme.borderRadius().value()];
    NSNumber *shadowRadius = nil;
    if (nativeShakeTheme.shadowRadius().has_value()) shadowRadius = [NSNumber numberWithDouble:nativeShakeTheme.shadowRadius().value()];
    NSNumber *shadowOpacity = nil;
    if (nativeShakeTheme.shadowOpacity().has_value()) shadowOpacity = [NSNumber numberWithDouble:nativeShakeTheme.shadowOpacity().value()];
    NSDictionary *shadowOffset = (NSDictionary *)nativeShakeTheme.shadowOffset();
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

- (SHKForm *)mapDicToShakeForm:(JS::NativeShake::ShakeForm &)nativeShakeForm {
    facebook::react::LazyVector<JS::NativeShake::ShakeFormComponent> nativeComponents = nativeShakeForm.components();

    NSMutableArray<id<SHKFormItemProtocol>>* formComponents = [NSMutableArray array];

    for(int i = 0; i < nativeComponents.size(); i++) {
        JS::NativeShake::ShakeFormComponent component = nativeComponents.at(i);

        NSString *type = component.type();
        if ([type isEqualToString:@"title"]) {
            NSString *key = component.key();
            NSString *label = component.label();
            NSString *initialValue = component.initialValue();
            BOOL required = component.required();

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";
            if (initialValue && [initialValue isEqual:[NSNull null]]) initialValue=nil;

            [formComponents addObject:[[SHKTitle alloc] initWithKey:key label:label required:required initialValue:initialValue]];
        }
        if ([type isEqualToString:@"text_input"]) {
            NSString *key = component.key();
            NSString *label = component.label();
            NSString *initialValue = component.initialValue();
            BOOL required = component.required();

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";
            if (initialValue && [initialValue isEqual:[NSNull null]]) initialValue=nil;

            [formComponents addObject:[[SHKTextInput alloc] initWithKey:key label:label required:required initialValue:initialValue]];
        }
        if ([type isEqualToString:@"email"]) {
            NSString *key = component.key();
            NSString *label = component.label();
            NSString *initialValue = component.initialValue();
            BOOL required = component.required();

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";
            if (initialValue && [initialValue isEqual:[NSNull null]]) initialValue=nil;

            [formComponents addObject:[[SHKEmail alloc] initWithKey:key label:label required:required initialValue:initialValue]];
        }
        if ([type isEqualToString:@"picker"]) {
            NSString *key = component.key();
            NSString *label = component.label();

            NSArray *itemsArray = (NSArray *)component.items();

            // NSNull causes crash
            if (key && [key isEqual:[NSNull null]]) key=@"";
            if (label && [label isEqual:[NSNull null]]) label=@"";

            NSMutableArray<SHKPickerItem*>* items = [NSMutableArray array];
            for(int j = 0; j < [itemsArray count]; j++) {
                NSDictionary *arrayItem = [itemsArray objectAtIndex:j];

                NSString *key = component.key();
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
            [formComponents addObject:[[SHKAttachments alloc] init]];
        }

        if ([type isEqualToString:@"inspect"]) {
            [formComponents addObject:[[SHKInspectButton alloc] init]];

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

- (SHKShakeReportConfiguration*)mapToConfiguration:(JS::NativeShake::ShakeReportConfiguration &)nativeConfiguration
{
    SHKShakeReportConfiguration *conf = [[SHKShakeReportConfiguration alloc] init];
    conf.includesBlackBoxData = nativeConfiguration.blackBoxData();
    conf.includesActivityHistoryData = nativeConfiguration.activityHistoryData();
    conf.includesScreenshotImage = nativeConfiguration.screenshot();
    conf.includesVideo = nativeConfiguration.video();
    conf.showsToastMessageOnSend = nativeConfiguration.showReportSentMessage();

    return conf;
}

- (NSDictionary*)mapToNetworkRequestToDict:(JS::NativeShake::NetworkRequest &)nativeNetworkRequest
{
    NSDictionary *networkRequest = [[NSDictionary alloc] init];
    NSString *requestBody = nativeNetworkRequest.requestBody() ?: @"";
    NSData *data = [requestBody dataUsingEncoding:NSUTF8StringEncoding];
    networkRequest = @{
        @"url": nativeNetworkRequest.url() ?: @"",
        @"method": nativeNetworkRequest.method() ?: @"",
        @"responseBody": nativeNetworkRequest.responseBody() ?: @"",
        @"statusCode": nativeNetworkRequest.statusCode() ?: @"",
        @"requestBody": data,
        @"requestHeaders": nativeNetworkRequest.requestHeaders() ?: @{},
        @"duration": [NSNumber numberWithDouble:nativeNetworkRequest.duration() ?: 0],
        @"responseHeaders": nativeNetworkRequest.responseHeaders() ?: @{},
        @"timestamp": nativeNetworkRequest.timestamp() ?: @""
    };
    return networkRequest;
}

- (NSDictionary*)mapToNotificationEvent:(JS::NativeShake::NotificationEvent &)nativeNotification
{
    NSDictionary *notificationEvent = [[NSDictionary alloc] init];
    notificationEvent = @{
        @"id": (nativeNotification.id_() ?: @""),
        @"title": (nativeNotification.title() ?: @""),
        @"description": (nativeNotification.description() ?: @"")
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

// Private native SDK methods

- (void)setPlatformInfo
{
    NSDictionary *shakeInfo = @{
        @"platform": @"ReactNative",
        @"sdkVersion": @"17.0.0"
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

