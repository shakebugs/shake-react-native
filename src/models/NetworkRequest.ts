/**
 * Represents network request.
 */
class NetworkRequest {
  url: string = '';
  method: string = '';
  requestBody: string = '';
  responseBody: string = '';
  requestHeaders: { [key: string]: string } = {};
  responseHeaders: { [key: string]: string } = {};
  statusCode: string = '';
  duration: number = 0;
  timestamp: string = '';
}

export default NetworkRequest;
