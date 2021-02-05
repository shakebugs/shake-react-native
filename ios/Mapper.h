#import <Foundation/Foundation.h>
#import <Shake/Shake.h>

@interface Mapper : NSObject

+(enum LogLevel)mapToLogLevel:(NSDictionary*)value;

@end
