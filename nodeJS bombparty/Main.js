/* REQUIRES */

const api = require('./Game/API/jklmAPI.js')
const Bot = require('./Game/Bot/Bot.js');
const Room = require('./Game/Room/Room.js');



function main() {
    const frBot = new Bot("Eyeye",null);
    const frRoom = new Room('CDXG')
    frBot.connectToRoom(frRoom)
}

main()


