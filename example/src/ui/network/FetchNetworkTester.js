import ApiConstants from './ApiConstants';

class FetchNetworkTester {
    sendGetRequest() {
        fetch(ApiConstants.GET_URL, {
            method: 'GET',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });
    }

    sendPostRequest() {
        fetch(ApiConstants.POST_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'firstParam',
                secondParam: 'secondParam',
            }),
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });
    }

    sendErrorRequest() {
        fetch(ApiConstants.ERROR_URL, {
            method: 'GET',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });
    }

    sendTimeoutRequest() {
        alert('Not supported for test.');
    }

    postFileRequest() {
        const formData = new FormData();
        //formData.append('file', {uri: path, name: 'file.txt', type: 'text/plain'});
        formData.append('userId', 'xzy');

        fetch(ApiConstants.FILE_URL, {
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
            method: 'POST',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                console.log(error);
                alert('Request error.');
            });
    }

    getImageRequest() {
        fetch(ApiConstants.IMAGE_URL, {
            method: 'GET',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });
    }
}

export default FetchNetworkTester;
