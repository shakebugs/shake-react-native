#import "Mapper.h"

@implementation Mapper

+(enum LogLevel)mapToLogLevel:(NSDictionary*)logLevelDic {
    NSString* value = [logLevelDic objectForKey:@"value"];
    if ([value isEqualToString:@"VERBOSE"])
        return LogLevelVerbose;
    if ([value isEqualToString:@"DEBUG"])
        return LogLevelDebug;
    if ([value isEqualToString:@"INFO"])
        return LogLevelInfo;
    if ([value isEqualToString:@"WARN"])
        return LogLevelWarn;
    if ([value isEqualToString:@"ERROR"])
        return LogLevelError;
}

@end
