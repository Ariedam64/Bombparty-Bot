/* REQUIRES */

const api = require('./Game/API/jklmAPI.js')
const Bot = require('./Game/Bot/Bot.js');
const Room = require('./Game/Room/Room.js');

async function main() {
    const frBot = new Bot();
    const frRoom = new Room('TGZZ')
    frBot.connectToRoom(frRoom)
}

main()


