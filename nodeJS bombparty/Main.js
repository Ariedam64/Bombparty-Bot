/* REQUIRES */

//const api = require('./Game/API/jklmAPI.js')
const Bot = require('./Game/Bot/Bot.js');
const Room = require('./Game/Room/Room.js');
const mist = require('./Misc/Functions.js')

botList = []

function main() {
    const frBot = new Bot();

    botList.push(frBot)
    const frRoom = new Room('NFSE')
    frBot.connectToRoom(frRoom)
}

main()



/*
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function test() {
    for (var i = 0; i < 1000; i++) {
        new Bot("Guest" + getRandomInt(9999)).connectToRoom(new Room("RGWD"))
        await mist.sleep(3000)
    }
}

test()
*/
/*
var roomConnected = []

async function test() {
    var rooms = await api.getRooms()
    for (const room of rooms) {
        if (room.playerCount > 3 && room.gameId == "bombparty") {
            roomConnected.push(room.roomCode)
        } 
    }

   for (const room of roomConnected) {
       new Bot("Guest5431", null
       ).connectToRoom(new Room(room))
    }
}

test()
*/

//Variables

module.exports = {botList}


