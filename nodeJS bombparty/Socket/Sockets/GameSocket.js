/* REQUIRES */
const packet = require('../Packets.js')
const GameEventManager = require('../Events/EventsManager/GameEventManager.js')
const Websocket = require('../Websocket.js')

class GameSocket extends Websocket {

    constructor(name = "GameSocket", wsDEBUG = false, eventDEBUG = false, url = 'wss://falcon.jklm.fun/socket.io/?EIO=4&transport=websocket', transport = 'websocket') {

        super(name, wsDEBUG, eventDEBUG, url, transport); //Call constructor of child class (Websocket)

        //on_message socket
        this.connection.onmessage = message => {

            if (this.wsDEBUG) {
                console.log(this.name + ': ↓ ' + message.data);
            }

            //Events packets
            if (message.data.slice(0, 1) == packet.message) {
                GameEventManager.processEvent(message.data, this.get_bot(), this.eventDEBUG) //Process game packets
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
module.exports = GameSocket;





