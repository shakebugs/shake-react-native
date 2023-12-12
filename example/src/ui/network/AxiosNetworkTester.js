import axios from 'axios';
import ApiConstants from './ApiConstants';

class AxiosNetworkTester {
  sendGetRequest() {
    axios
      .get(ApiConstants.GET_URL, {
        headers: {
          'number-header': 100,
          'array-header': ['hello', 'world'],
        },
      })
      .then(function (response) {
        alert('Request sent.');
      })
      .catch(function (error) {
        alert('Request error.');
      });
  }

  sendPostRequest() {
    axios
      .post(ApiConstants.POST_URL, {
        firstParam: 'firstParam',
        secondParam: 'secondParam',
      })
      .then(function (response) {
        alert('Request sent.');
      })
      .catch(function (error) {
        alert('Request error.');
      });
  }

  sendErrorRequest() {
    axios
      .get(ApiConstants.ERROR_URL)
      .then(function (response) {
        alert('Request sent.');
      })
      .catch(function (error) {
        alert('Request error.');
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
        },
      )
      .then(function (response) {
        alert('Request sent.');
      })
      .catch(function (error) {
        alert('Request error.');
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
    };

    axios
      .post(ApiConstants.FILE_URL, formData, config)
      .then(function (response) {
        alert('Request sent.');
      })
      .catch(function (error) {
        alert('Request error.');
      });
  }

  getImageRequest() {
    axios
      .get(ApiConstants.IMAGE_URL, {
        responseType: 'blob',
      })
      .then(function (response) {
        alert('Request sent.');
      })
      .catch(function (error) {
        alert('Request error.');
      });
  }
}

export default AxiosNetworkTester;
