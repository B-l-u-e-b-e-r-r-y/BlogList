class common {
    fetchData (url) {
        return new Promise((reslove, reject) => {
            fetch(url, {method: 'get'})
            .then((response) => {
                if (response.status !== 200) {
                    reject('Error, Status Code: ', response.status);
                }

                response.json().then((data) => {
                    reslove(data);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    subLongString(text, length) {
        if (text.length > length) {
            text = text.substring(0, length) + '...';
        }
    
        return text;
    }
}

export default common;