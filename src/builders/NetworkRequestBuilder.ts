import NetworkRequest from '../models/NetworkRequest';

/**
 * Builds network request object.
 */
class NetworkRequestBuilder {
  _url: string;
  _method: string;
  _requestBody: string;
  _responseBody: string;
  _requestHeaders: { [key: string]: string };
  _responseHeaders: { [key: string]: string };
  _statusCode: string;
  _duration: number;
  _date: Date;

  /**
   * Creates builder from {@link NetworkRequest}
   * @param networkRequest object
   */
  constructor(networkRequest?: NetworkRequest) {
    if (networkRequest) {
      this._url = networkRequest.url;
      this._method = networkRequest.method;
      this._statusCode = networkRequest.statusCode;
      this._requestBody = networkRequest.requestBody;
      this._responseBody = networkRequest.responseBody;
      this._requestHeaders = networkRequest.requestHeaders;
      this._responseHeaders = networkRequest.responseHeaders;
      this._duration = networkRequest.duration;
      this._date = new Date(networkRequest.timestamp);
    } else {
      this._url = '';
      this._method = '';
      this._statusCode = '';
      this._requestBody = '';
      this._responseBody = '';
      this._requestHeaders = {};
      this._responseHeaders = {};
      this._duration = 0;
      this._date = new Date();
    }
  }

  getUrl(): string {
    return this._url;
  }

  setUrl(value: string): NetworkRequestBuilder {
    this._url = value;
    return this;
  }

  getMethod(): string {
    return this._method;
  }

  setMethod(value: string): NetworkRequestBuilder {
    this._method = value;
    return this;
  }

  getRequestBody(): string {
    return this._requestBody;
  }

  setRequestBody(value: string): NetworkRequestBuilder {
    this._requestBody = value;
    return this;
  }

  getResponseBody(): string {
    return this._responseBody;
  }

  setResponseBody(value: string): NetworkRequestBuilder {
    this._responseBody = value;
    return this;
  }

  getRequestHeaders(): { [key: string]: string } {
    return this._requestHeaders;
  }

  setRequestHeaders(value: { [key: string]: string }): NetworkRequestBuilder {
    this._requestHeaders = value;
    return this;
  }

  getResponseHeaders(): { [key: string]: string } {
    return this._responseHeaders;
  }

  setResponseHeaders(value: { [key: string]: string }): NetworkRequestBuilder {
    this._responseHeaders = value;
    return this;
  }

  getStatusCode(): string {
    return this._statusCode;
  }

  setStatusCode(value: string): NetworkRequestBuilder {
    this._statusCode = value;
    return this;
  }

  getDuration(): number {
    return this._duration;
  }

  setDuration(value: number): NetworkRequestBuilder {
    this._duration = value;
    return this;
  }

  getDate(): Date {
    return this._date;
  }

  setDate(date: Date): NetworkRequestBuilder {
    this._date = date;
    return this;
  }

  /**
   * Builds and validates network request data.
   * @return {NetworkRequest} object
   */
  build(): NetworkRequest {
    let timestamp: string, method: string, status: string, url: string;

    try {
      timestamp = this._date.toISOString();
    } catch (e) {
      timestamp = new Date().toISOString();
    }

    // SDK expects: 2022-07-21T09:53:36.958000+0000
    timestamp = timestamp.replace('Z', '000+0000');
    method = !this._method ? '' : this._method;
    status = !this._statusCode ? '' : this._statusCode;
    url = !this._url ? '' : this._url;

    const networkRequest = new NetworkRequest();
    networkRequest.url = url;
    networkRequest.method = method;
    networkRequest.statusCode = status;
    networkRequest.requestBody = this._requestBody;
    networkRequest.requestHeaders = this._requestHeaders;
    networkRequest.responseBody = this._responseBody;
    networkRequest.responseHeaders = this._responseHeaders;
    networkRequest.timestamp = timestamp;
    networkRequest.duration = this._duration;

    return networkRequest;
  }
}

export default NetworkRequestBuilder;
