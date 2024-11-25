import { isBinaryData } from './Utils';
import NetworkRequest from '../models/NetworkRequest';

const XMLHttpRequest = global.XMLHttpRequest;
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let onRequestDone: ((networkRequest: NetworkRequest) => void) | null;
let isInterceptorEnabled: boolean = false;
let networkRequest: NetworkRequest = defaultNetworkRequest();

const XHRInterceptor = {
  setOnRequestDone(callback: (networkRequest: NetworkRequest) => void) {
    onRequestDone = callback;
  },
  enableInterception() {
    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL
    ) {
      networkRequest = defaultNetworkRequest();
      networkRequest.url = url.toString();
      networkRequest.method = method;

      originalXHROpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.setRequestHeader = function (
      header: string,
      value: string
    ) {
      networkRequest.requestHeaders[header] = String(value);
      originalXHRSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (
      data: Document | XMLHttpRequestBodyInit | null
    ) {
      let requestBody;
      if (typeof data !== 'string') {
        if (!data) {
          requestBody = '';
        } else {
          requestBody = JSON.stringify(data);
        }
      } else {
        requestBody = data;
      }

      if (isBinaryData(requestBody)) {
        requestBody = 'Binary data';
      }

      const currentDate = new Date();

      const networkRequestClone = JSON.parse(JSON.stringify(networkRequest));
      networkRequestClone.start = currentDate.getTime();
      networkRequestClone.timestamp = currentDate;
      networkRequestClone.requestBody = requestBody ? requestBody : '';

      if (this.addEventListener) {
        this.addEventListener('readystatechange', async () => {
          if (!isInterceptorEnabled) return;

          if (this.readyState === this.HEADERS_RECEIVED) {
            if (this.getAllResponseHeaders()) {
              networkRequestClone.responseHeaders = parseResponseHeaders(
                this.getAllResponseHeaders()
              );
            }
          }
        });

        this.addEventListener('load', async () => {
          if (!isInterceptorEnabled) return;

          let responseText = await new Response(this.response).text();
          if (responseText === undefined || isBinaryData(responseText)) {
            responseText = 'Binary data';
          }

          networkRequestClone.duration = Date.now() - networkRequestClone.start;
          networkRequestClone.responseBody = responseText ? responseText : '';
          networkRequestClone.statusCode = this.status
            ? this.status.toString()
            : 'n/a';

          reportRequest(networkRequestClone);
        });

        this.addEventListener('error', () => {
          if (!isInterceptorEnabled) {
            return;
          }

          networkRequestClone.duration = Date.now() - networkRequestClone.start;
          networkRequestClone.responseBody = 'Request error.';
          networkRequestClone.statusCode = 'err';

          reportRequest(networkRequestClone);
        });

        this.addEventListener('abort', () => {
          if (!isInterceptorEnabled) return;

          networkRequestClone.duration = Date.now() - networkRequestClone.start;
          networkRequestClone.responseBody = 'Request aborted.';
          networkRequestClone.statusCode = 'err';

          reportRequest(networkRequestClone);
        });

        this.addEventListener('timeout', () => {
          if (!isInterceptorEnabled) return;

          networkRequestClone.duration = Date.now() - networkRequestClone.start;
          networkRequestClone.responseBody = 'Request timeout.';
          networkRequestClone.statusCode = 't/o';

          reportRequest(networkRequestClone);
        });
      }

      const reportRequest = (networkReq: NetworkRequest) => {
        if (!networkReq.method) networkReq.method = '';
        if (!networkReq.statusCode) networkReq.statusCode = '';

        if (onRequestDone) onRequestDone(networkReq);
      };

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

function defaultNetworkRequest(): NetworkRequest {
  return {
    url: '',
    method: '',
    requestBody: '',
    responseBody: '',
    requestHeaders: {},
    responseHeaders: {},
    statusCode: '',
    duration: 0,
    timestamp: '',
    start: 0,
  } as NetworkRequest;
}

const parseResponseHeaders = (
  headersString: string
): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  try {
    if (headersString) {
      const responseHeaders: string[] = headersString.split('\r\n');

      responseHeaders.forEach((element: string) => {
        if (element) {
          const parts = element.split(/:(.+)/);
          const key = String(parts?.[0]);
          result[key] = String(parts?.[1]);
        }
      });
    }
  } catch (e) {
    // no-op
  }
  return result;
};

export default XHRInterceptor;
