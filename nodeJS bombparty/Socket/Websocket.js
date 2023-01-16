/* REQUIRES */
const ws = require('ws');
const packet = require('./Packets.js')

class Websocket {

    constructor(name, wsDEBUG = true, eventDEBUG = true, url = 'wss://falcon.jklm.fun/socket.io/?EIO=4&transport=websocket', transport = 'websocket') {

        if (this.constructor === Websocket) { //Abstract class
            throw new TypeError('Abstract class "Websocket" cannot be instantiated directly');
        }

        this.url = url;
        this.transport = transport;
        this.name = name;
        this.wsDEBUG = wsDEBUG;
        this.eventDEBUG = eventDEBUG;

        this.connected = false;
        this.ready = false;

        this.connection = null;
        this.bot = null;

        //Create websocket connection
        this.connection = new ws(this.url);

        //on_open socket
        this.connection.onopen = () => {
            if (this.wsDEBUG) {
                console.log(this.name + ": Connected!");
            }
            this.connected = true;
        }

        //on_message socket
        this.connection.onmessage = message => {

            if (this.wsDEBUG) {
                console.log(this.name + ': ↓ ' + message.data);
            }   
        }

        //on_error socket
        this.connection.onerror = error => {
            console.log(this.name + ': ${error}');
        }

        //on_close socket
        this.connection.onclose = () => {
            console.log(this.name + ': Disconnected!');
            this.connected = false;
        }
    }

    /* SETTERS */
    set_ready(state) { this.ready = state }
    set_bot(newBot) { this.bot = newBot }


    /* GETTERS */
    get_ready() { return this.ready }
    get_bot() { return this.bot }

    /* FUNCTIONS */

    //Send message to the websocket
    sendMessage(message) {
        if (this.wsDEBUG) { 
            console.log(this.name + ': ↑ ' + message);
        }
        this.connection.send(message);
    }

    emit1(...data) {
        this.sendMessage(packet.message_EVENT + "1" + JSON.stringify(data))
    }

    //Emit event connect
    emit0(...data) {
        this.sendMessage(packet.message_EVENT + "0" + JSON.stringify(data))
    }

    //Emit event
    emit(...data) {
        this.sendMessage(packet.message_EVENT + JSON.stringify(data))
    }

}

//Export the class
module.exports = Websocket;





