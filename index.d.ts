declare module '@shakebugs/react-native-shake' {
    export function start(): void;
    export function stop(): void;
    export function setInvocationEvents(eventsArray: Array<string>): void;
    export function setBlackBoxEnabled(enabled: boolean): void;
    export function setQuickFacts(quickFacts: string): void;
    export function attachFiles(filesArray: Array<string>): void;
    export function attachFilesWithName(filesDictionary: object): void;
    export function insertNetworkRequest(request: object): void;
}
