const axios = require('axios');
const request = require('request');

async function getRooms() {
    return axios.get('https://jklm.fun/api/rooms')
        .then(response => {
            var arrayRooms = []
            for (const [key, rooms] of Object.entries(response.data)) {
                for (const [key, room] of Object.entries(rooms)) {
                    arrayRooms.push(room)
                }
            }
            return arrayRooms
        })
        .catch(error => {
            return -1;
        });
}

async function joinRoom(room) {

    const data = { roomCode: room };

    return axios.post('https://jklm.fun/api/joinRoom', data)
        .then(response => {  
            if (response.data.errorCode == 'noSuchRoom') {
                return 0
            }
            else {
                return response.data["url"].replace("https", "wss")
            } 
        })
        .catch(error => {
            return -1;
        });
}

module.exports = { getRooms, joinRoom };
