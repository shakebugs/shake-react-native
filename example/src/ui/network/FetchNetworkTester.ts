import ApiConstants from './ApiConstants';

class FetchNetworkTester {
  sendGetRequest() {
    fetch(ApiConstants.GET_URL, {
      method: 'GET',
    })
      .then(() => {
        alertMsg('Request sent.');
      })
      .catch(() => {
        alertMsg('Request error.');
      });
  }

  sendPostRequest() {
    fetch(ApiConstants.POST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'firstParam',
        secondParam: 'secondParam',
      }),
    })
      .then(() => {
        alertMsg('Request sent.');
      })
      .catch(() => {
        alertMsg('Request error.');
      });
  }

  sendErrorRequest() {
    fetch(ApiConstants.ERROR_URL, {
      method: 'GET',
    })
      .then(() => {
        alertMsg('Request sent.');
      })
      .catch(() => {
        alertMsg('Request error.');
      });
  }

  sendTimeoutRequest() {
    alertMsg('Not supported for test.');
  }

  postFileRequest() {
    const formData = new FormData();
    //formData.append('file', {uri: path, name: 'file.txt', type: 'text/plain'});
    formData.append('userId', 'xzy');

    fetch(ApiConstants.FILE_URL, {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      method: 'POST',
    })
      .then(() => {
        alertMsg('Request sent.');
      })
      .catch((error) => {
        console.log(error);
        alertMsg('Request error.');
      });
  }

  getImageRequest() {
    fetch(ApiConstants.IMAGE_URL, {
      method: 'GET',
    })
      .then(() => {
        alertMsg('Request sent.');
      })
      .catch(() => {
        alertMsg('Request error.');
      });
  }
}

const alertMsg = (message: string) => {
  // eslint-disable-next-line no-alert
  alert(message);
};

export default FetchNetworkTester;
