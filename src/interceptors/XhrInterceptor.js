const XMLHttpRequest = global.XMLHttpRequest;
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let onProgressCallback;
let onDoneCallback;
let isInterceptorEnabled = false;
let network;

const _reset = () => {
    network = {
        url: '',
        requestBody: '',
        requestHeaders: {},
        method: '',
        responseBody: '',
        responseHeaders: {},
        statusCode: 0,
        contentType: '',
        duration: 0,
        timestamp: "",
        start: 0
    };
};

const XHRInterceptor = {
    setOnDoneCallback(callback) {
        onDoneCallback = callback;
    },
    setOnProgressCallback(callback) {
        onProgressCallback = callback;
    },
    enableInterception() {
        XMLHttpRequest.prototype.open = function (method, url) {
            _reset();
            network.url = url;
            network.method = method;
            originalXHROpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
            if (network.requestHeaders === '') {
                network.requestHeaders = {};
            }
            network.requestHeaders[header] = value;
            originalXHRSetRequestHeader.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function (data) {
            const cloneNetwork = JSON.parse(JSON.stringify(network));
            cloneNetwork.requestBody = data ? data : '';

            if (this.addEventListener) {
                this.addEventListener(
                    'readystatechange',
                    async () => {
                        if (!isInterceptorEnabled) {
                            return;
                        }
                        if (this.readyState === this.HEADERS_RECEIVED) {
                            const contentTypeString = this.getResponseHeader('Content-Type');
                            if (contentTypeString) {
                                cloneNetwork.contentType = contentTypeString.split(';')[0];
                            }

                            if (this.getAllResponseHeaders()) {
                                const responseHeaders = this.getAllResponseHeaders().split('\r\n');
                                const responseHeadersDictionary = {};
                                responseHeaders.forEach(element => {
                                    const key = element.split(':')[0];
                                    const value = element.split(':')[1];
                                    responseHeadersDictionary[key] = value;
                                });
                                cloneNetwork.responseHeaders = responseHeadersDictionary;
                            }
                        }
                        if (this.readyState === this.DONE) {
                            cloneNetwork.duration = (Date.now() - cloneNetwork.start);
                            if (this.status == null) {
                                cloneNetwork.statusCode = 0;
                            } else {
                                cloneNetwork.statusCode = this.status;
                            }

                            if (this.response) {
                                if (this.responseType === 'blob') {
                                    let responseText = await (new Response(this.response)).text();
                                    cloneNetwork.responseBody = responseText;
                                } else if (this.responseType === 'text') {
                                    cloneNetwork.responseBody = this.response;
                                }
                            }

                            if (this._hasError) {
                                cloneNetwork.requestBody = this._response;
                            }
                            if (onDoneCallback) {
                                onDoneCallback(cloneNetwork);
                            }
                        }
                    },
                    false
                );

                const downloadUploadProgressCallback = event => {
                    if (!isInterceptorEnabled) {
                        return;
                    }
                    // check if will be able to compute progress
                    if (event.lengthComputable && onProgressCallback) {
                        let totalBytesSent = event.loaded;
                        let totalBytesExpectedToSend = event.total - event.loaded;
                        onProgressCallback(totalBytesSent, totalBytesExpectedToSend);
                    }
                };
                this.addEventListener('progress', downloadUploadProgressCallback);
                this.upload.addEventListener('progress', downloadUploadProgressCallback);
            }

            const currentDate = new Date();
            cloneNetwork.start = currentDate.getTime();
            cloneNetwork.timestamp = currentDate.toISOString();

            originalXHRSend.apply(this, arguments);
        };
        isInterceptorEnabled = true;
    },

    disableInterception() {
        isInterceptorEnabled = false;
        XMLHttpRequest.prototype.send = originalXHRSend;
        XMLHttpRequest.prototype.open = originalXHROpen;
        XMLHttpRequest.prototype.setRequestHeader = originalXHRSetRequestHeader;
        onDoneCallback = null;
        onProgressCallback = null;
    }
};

export default XHRInterceptor;
