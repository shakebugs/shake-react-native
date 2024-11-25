import axios, { AxiosRequestConfig } from 'axios';
import ApiConstants from './ApiConstants';

class AxiosNetworkTester {
  sendGetRequest() {
    axios
      .get(ApiConstants.GET_URL, {
        headers: {
          'number-header': 100,
          'array-header': ['hello', 'world'],
        },
      } as AxiosRequestConfig)
      .then(function () {
        alertMsg('Request sent.');
      })
      .catch(function () {
        alertMsg('Request error.');
      });
  }

  sendPostRequest() {
    axios
      .post(ApiConstants.POST_URL, {
        firstParam: 'firstParam',
        secondParam: 'secondParam',
      })
      .then(function () {
        alertMsg('Request sent.');
      })
      .catch(function () {
        alertMsg('Request error.');
      });
  }

  sendErrorRequest() {
    axios
      .get(ApiConstants.ERROR_URL)
      .then(function () {
        alertMsg('Request sent.');
      })
      .catch(function () {
        alertMsg('Request error.');
      });
  }

  sendTimeoutRequest() {
    axios
      .post(
        ApiConstants.TIMEOUT_URL,
        {
          firstParam: 'firstParam',
          secondParam: 'secondParam',
        },
        {
          timeout: 1,
        } as AxiosRequestConfig
      )
      .then(function () {
        alertMsg('Request sent.');
      })
      .catch(function () {
        alertMsg('Request error.');
      });
  }

  postFileRequest() {
    const formData = new FormData();
    //formData.append('file', {uri: path, name: 'file.txt', type: 'text/plain'});
    formData.append('userId', 'xzy');

    const config = {
      headers: {
        accept: 'application/json',
      },
    } as AxiosRequestConfig;

    axios
      .post(ApiConstants.FILE_URL, formData, config)
      .then(function () {
        alertMsg('Request sent.');
      })
      .catch(function () {
        alertMsg('Request error.');
      });
  }

  getImageRequest() {
    axios
      .get(ApiConstants.IMAGE_URL, {
        responseType: 'blob',
      } as AxiosRequestConfig)
      .then(function () {
        alertMsg('Request sent.');
      })
      .catch(function () {
        alertMsg('Request error.');
      });
  }
}

const alertMsg = (message: string) => {
  // eslint-disable-next-line no-alert
  alert(message);
};

export default AxiosNetworkTester;
