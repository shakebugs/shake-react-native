#import "RNShakeFile.h"

@implementation RNShakeFile

RCT_EXPORT_MODULE()
             
RCT_EXPORT_METHOD(initWithName:(nonnull NSString*)name andData:(nonnull NSData*)data callback:(RCTResponseSenderBlock) callback)
{
    SHKShakeFile *shakeFile = [[SHKShakeFile alloc] initWithName:name andData:data];
    callback(@[[NSNull null], shakeFile]);
}
             
RCT_EXPORT_METHOD(initWithName:(nonnull NSString *)name andFileURL:(nonnull NSURL *)url callback:(RCTResponseSenderBlock) callback)
{
    SHKShakeFile *shakeFile = [[SHKShakeFile alloc] initWithName:name andFileURL:url];
    callback(@[[NSNull null], shakeFile]);
        
}

RCT_EXPORT_METHOD(initWithFileURL:(nonnull NSURL *)url callback:(RCTResponseSenderBlock) callback)
{
    SHKShakeFile *shakeFile = [[SHKShakeFile alloc] initWithFileURL:url];
    callback(@[[NSNull null], shakeFile]);
}

@end
