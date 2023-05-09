const chat = require("../RoomEvents/Chat/chat");
const chatterAdded = require("../RoomEvents/Chat/chatterAdded");
const chatterRemoved = require("../RoomEvents/Chat/chatterRemoved");
const getChatterProfiles = require("../RoomEvents/Chat/getChatterProfiles");
const kicked = require("../RoomEvents/kicked");
const roomEntry = require("../RoomEvents/Socket/roomEntry");
const setPlayerCount = require("../RoomEvents/setPlayerCount");
const setSelfRoles = require("../RoomEvents/setSelfRoles");
const connectionEtablished = require("../RoomEvents/Socket/connectionEtablished");
const userBanned = require("../RoomEvents/userBanned");
const disconnect = require("../RoomEvents/disconnect");
const getChatterProfile = require("../RoomEvents/Chat/getChatterProfile");

function processEvent(data, bot, DEBUG) {

    var event = ""

    if (data.toString().indexOf("[") != -1) {

        var jsonData = JSON.parse(data.toString().substring(data.toString().indexOf("["))) 
        id = data.slice(0, data.toString().indexOf("["))

        if (id == "430") { //RoomEntry event
            event = "roomEntry"
        }
        else if (id.slice(0, 2) == "43") { //GetChattersProfiles
            if (Array.isArray(jsonData[0])) { //Check if its getChatterProfile or getChatterProfiles, one has 2 arrays and the other only 1
                event = "getChatterProfiles"
            }
            else {
                event = "getChatterProfile"
            }
        }
        else { //message event
            event = jsonData[0]
        }   
    }
    else {
        event = data.slice(0, data.toString().indexOf("{")) // wsConnected event
        if (event == "40") {
            event = "connectionEtablished"
            var jsonData = JSON.parse(data.toString().substring(data.toString().indexOf("{")))
        }
    }

    switch (event) {

        case 'chat':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            chat(jsonData, bot)
            break;

        case 'chatterAdded':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            chatterAdded(jsonData, bot)
            break;

        case 'chatterRemoved':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            chatterRemoved(jsonData, bot)
            break;

        case 'connectionEtablished':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            connectionEtablished(jsonData, bot)
            break;

        case 'getChatterProfiles':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            getChatterProfiles(jsonData, bot)
            break;

        case 'getChatterProfile':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            getChatterProfile(jsonData, bot)
            break;

        case 'kicked':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            kicked(jsonData, bot)
            break;

        case 'roomEntry':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            roomEntry(jsonData, bot)
            break;

        case 'setPlayerCount':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            setPlayerCount(jsonData, bot)
            break;

        case 'setSelfRoles':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            setSelfRoles(jsonData, bot)
            break;

        case 'userBanned':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            userBanned(jsonData, bot)
            break;

        case 'willTransferRoom':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            userBanned(jsonData, bot)
            break;

        case 'disconnect':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            disconnect(jsonData, bot)
            break;

        /*
        case 'nodeWillRestart':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            userBanned(jsonData, bot)
            break;

        case 'changeRoom':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            userBanned(jsonData, bot)
            break;

        case 'connect_error':
            if (DEBUG) { console.log("Room event: " + event + " OK") }
            userBanned(jsonData, bot)
            break;
        */

        default:
            if (DEBUG) { console.log("Room event: " + event + " ERROR") }
            //CODE
            break;
    }
}

//Export the module
module.exports = { processEvent };