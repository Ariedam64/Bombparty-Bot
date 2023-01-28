﻿/* REQUIRES */

const api = require('./Game/API/jklmAPI.js')
const Bot = require('./Game/Bot/Bot.js');
const Room = require('./Game/Room/Room.js');

/*

async function test() {


    var rooms = await api.getRooms()


    var roomsToConnect = []
    const image64 = "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"

    

    for (const room of rooms) {
        if (room.playerCount > 3 && room.gameId == "bombparty") {
            roomsToConnect.push(room.roomCode)
        } 
    }

   for (const room of roomsToConnect) {
       new Bot("Eyeye", image64).connectToRoom(new Room(room))
    }
}

test()

*/

//Variables

const image64 = "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"

const frBot = new Bot("Eyeye", image64);
const frRoom = new Room('EZXM')

frBot.connectToRoom(frRoom)


/*
var test = ["DFNS", "TBRA", "JMNW", "CVTX", "JYKK", "YCSS", "RGKG", "FVZW", "QVUX", "RAWX"]

for (var i = 0; i < test.length; i++) {
    new Bot("Eyeye").connectToRoom(new Room(test[i]))
}

/*
const enBot = new Bot("ℤboss", image64);
const spBot = new Bot("ℤboss", image64);
const ptBot = new Bot("ℤboss", image64);
const deBot = new Bot("ℤboss", image64);
const itBot = new Bot("ℤboss", image64);
const enRoom = new Room("CJNZ")
const spRoom = new Room("QQYZ")
const ptRoom = new Room("HUHN")
const itRoom = new Room("YYPP")
//const deRoom = new Room("MMUX")
enBot.connectToRoom(enRoom)
spBot.connectToRoom(spRoom)
ptBot.connectToRoom(ptRoom)
itBot.connectToRoom(itRoom)
//deBot.connectToRoom(deRoom)

//Connect to room

*/





