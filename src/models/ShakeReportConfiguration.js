class ShakeReportConfiguration {
    blackBoxData = true;
    activityHistoryData = true;
    screenshot = true;
    showReportSentMessage = true;
}

export default ShakeReportConfiguration;

function setPrivateView(viewRef) {
    const nativeTag = findNodeHandle(viewRef);
    if (Platform.OS === 'ios') {
        Instabug.hideView(nativeTag);
    } else {
        Instabug.hideView([nativeTag]);
    }
}
