import Utils from "./Utils";

const XMLHttpRequest = global.XMLHttpRequest;
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let onDoneCallback;
let isInterceptorEnabled = false;
let networkRequest;

const Interceptor = {
    setOnDoneCallback(callback) {
        onDoneCallback = callback;
    },
    enableInterception() {
        XMLHttpRequest.prototype.open = function (method, url) {
            networkRequest = {
                url: "",
                method: "",
                requestBody: "",
                responseBody: "",
                requestHeaders: {},
                responseHeaders: {},
                statusCode: "",
                duration: 0,
                timestamp: "",
                start: 0,
            };

            networkRequest.url = url;
            networkRequest.method = method;

            originalXHROpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
            if (networkRequest.requestHeaders === "") {
                networkRequest.requestHeaders = {};
            }
            networkRequest.requestHeaders[header] = String(value);

            originalXHRSetRequestHeader.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function (data) {
            let requestBody;
            if (typeof data !== "string") {
                if (!data) {
                    requestBody = "";
                } else {
                    requestBody = JSON.stringify(data);
                }
            } else {
                requestBody = data;
            }

            if (Utils.isBinary(requestBody)) {
                requestBody = "Binary data";
            }

            const currentDate = new Date();

            const cloneNetwork = JSON.parse(JSON.stringify(networkRequest));
            cloneNetwork.start = currentDate.getTime();
            cloneNetwork.timestamp = currentDate;
            cloneNetwork.requestBody = requestBody ? requestBody : "";

            if (this.addEventListener) {
                this.addEventListener(
                    "readystatechange",
                    async () => {
                        if (!isInterceptorEnabled) {
                            return;
                        }

                        if (this.readyState === this.HEADERS_RECEIVED) {
                            if (this.getAllResponseHeaders()) {
                                cloneNetwork.responseHeaders =  parseResponseHeaders(this.getAllResponseHeaders());
                            }
                        }
                    },
                    false
                );

                this.addEventListener(
                    "load",
                    async () => {
                        if (!isInterceptorEnabled) {
                            return;
                        }

                        let responseText = await new Response(this.response).text();
                        if (responseText === undefined || Utils.isBinary(responseText)) {
                            responseText = "Binary data";
                        }

                        cloneNetwork.duration = Date.now() - cloneNetwork.start;
                        cloneNetwork.responseBody = responseText ? responseText : "";
                        cloneNetwork.statusCode = this.status ? this.status.toString() : "n/a";

                        if (onDoneCallback) {
                            onDoneCallback(cloneNetwork);
                        }
                    },
                    false
                );

                this.addEventListener(
                    "error",
                    () => {
                        if (!isInterceptorEnabled) {
                            return;
                        }

                        cloneNetwork.duration = Date.now() - cloneNetwork.start;
                        cloneNetwork.responseBody = "Request error.";
                        cloneNetwork.statusCode = "err";

                        if (onDoneCallback) {
                            onDoneCallback(cloneNetwork);
                        }
                    },
                    false
                );

                this.addEventListener(
                    "abort",
                    () => {
                        if (!isInterceptorEnabled) {
                            return;
                        }

                        cloneNetwork.duration = Date.now() - cloneNetwork.start;
                        cloneNetwork.responseBody = "Request aborted.";
                        cloneNetwork.statusCode = "err";

                        if (onDoneCallback) {
                            onDoneCallback(cloneNetwork);
                        }
                    },
                    false
                );

                this.addEventListener(
                    "timeout",
                    () => {
                        if (!isInterceptorEnabled) {
                            return;
                        }

                        cloneNetwork.duration = Date.now() - cloneNetwork.start;
                        cloneNetwork.responseBody = "Request timeout.";
                        cloneNetwork.statusCode = "t/o";

                        if (onDoneCallback) {
                            onDoneCallback(cloneNetwork);
                        }
                    },
                    false
                );
            }

            originalXHRSend.apply(this, arguments);
        };

        isInterceptorEnabled = true;
    },
    disableInterception() {
        isInterceptorEnabled = false;
        XMLHttpRequest.prototype.send = originalXHRSend;
        XMLHttpRequest.prototype.open = originalXHROpen;
        XMLHttpRequest.prototype.setRequestHeader = originalXHRSetRequestHeader;
    },
};

const parseResponseHeaders = (responseHeaders) => {
    const result = {};
    try {
        if (responseHeaders) {
            responseHeaders = responseHeaders.split("\r\n");
            responseHeaders.forEach((element) => {
                const parts = element.split(/:(.+)/);
                const key = String(parts?.[0]);
                result[key] = String(parts?.[1]);
            });
        }
    } catch (e) {
        // no-op
    }
    return result;
}

export default Interceptor;
