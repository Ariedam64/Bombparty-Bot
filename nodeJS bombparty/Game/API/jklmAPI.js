const axios = require('axios');

function getRooms() {
    return axios.get('https://jklm.fun/api/rooms')
        .then(response => {
            return (response.data);
        })
        .catch(error => {
            return error;
        });
}

module.exports = { getRooms };
