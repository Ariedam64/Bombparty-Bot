/* REQUIRES */

const api = require('./Game/API/jklmAPI.js')
const Bot = require('./Game/Bot/Bot.js');
const Room = require('./Game/Room/Room.js');

var roomConnected = []
/*

async function test() {
    var rooms = await api.getRooms()
    for (const room of rooms) {
        if (room.playerCount > 3 && room.gameId == "bombparty") {
            roomConnected.push(room.roomCode)
        } 
    }

   for (const room of roomConnected) {
       new Bot("Guest8465", null).connectToRoom(new Room(room))
    }
}

test()

//Variables
*/

const frBot = new Bot();
const frRoom = new Room('FRCD')

frBot.connectToRoom(frRoom)



