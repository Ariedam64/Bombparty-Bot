/* REQUIRES */
const packet = require('../Packets.js')
const RoomEventManager = require('../Events/EventsManager/RoomEventManager.js')
const Websocket = require('../Websocket.js');

class RoomSocket extends Websocket {

    constructor(name = "GameSocket", bot, wsDEBUG = false, eventDEBUG = false, url = null, transport = 'websocket') {

        super(name, bot, wsDEBUG, eventDEBUG, url, transport); //Call constructor of child class (Websocket)

        this.readyToConnectToRoom = false

        //on_message socket
        this.connection.onmessage = message => {

            if (this.wsDEBUG) {
                console.log("[" + this.bot.get_room().get_roomCode() + "]" +this.name + ': ↓ ' + message.data);
            }

            //Events packets
            if (message.data.slice(0, 1) == packet.message) {
                RoomEventManager.processEvent(message.data, this.get_bot(), this.eventDEBUG) //Process room packets
            }

            //Connection packet
            if (message.data.slice(0, 1) == packet.open) {
                this.sendMessage(packet.message_CONNECT);
            }

            //Ping packet
            if (message.data.slice(0, 1) == packet.ping) {
                this.sendMessage(packet.pong);
            }
        }
    }
}

//Export the class
module.exports = RoomSocket;





