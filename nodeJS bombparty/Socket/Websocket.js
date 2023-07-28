/* REQUIRES */
const ws = require('ws');
const packet = require('./Packets.js')

class Websocket {

    constructor(name, bot, wsDEBUG = true, eventDEBUG = true, url = null, transport = 'websocket') {

        if (this.constructor === Websocket) { //Abstract class
            throw new TypeError('Abstract class "Websocket" cannot be instantiated directly');
        }

        this.url = url;
        this.transport = transport;
        this.name = name;
        this.bot = bot;
        this.wsDEBUG = wsDEBUG;
        this.eventDEBUG = eventDEBUG;

        this.connected = false;
        this.ready = false;

        this.connection = null; 

        const headers = {
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'Upgrade',
            'Sec-Websocket-Extensions': 'permessage-deflate; client_max_window_bits',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        };

        //Create websocket connection
        this.connection = new ws(this.url, headers);

        //on_open socket
        this.connection.onopen = () => {
            console.log("[" + this.bot.get_room().get_roomCode() + "]" +this.name + ": Connected!");
            this.connected = true;
        }

        //on_message socket
        this.connection.onmessage = message => {

            if (this.wsDEBUG) {
                console.log("[" + this.bot.get_room().get_roomCode() + "]" +this.name + ': ↓ ' + message.data);
            }   
        }

        //on_error socket
        this.connection.onerror = error => {
            console.log("[" + this.bot.get_room().get_roomCode() + "]" +this.name + ': ' + error);
        }

        //on_close socket
        this.connection.onclose = () => {
            console.log("[" + this.bot.get_room().get_roomCode() + "]" + this.name + ': Disconnected!');
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
            console.log("[" + this.bot.get_room().get_roomCode() + "]" +this.name + ': ↑ ' + message);
        }
        this.connection.send(message);
    }

    //Emit event
    emit(...data) {
        this.sendMessage(packet.message_EVENT + JSON.stringify(data))
    }

    //Emit custom event
    emitCustom(i, ...data) {
        this.sendMessage(packet.message_EVENT + i + JSON.stringify(data))
    }

    disconnect() {
        if (this.connection) {
            this.connection.close();
            this.connected = false;
        }
    }

}

//Export the class
module.exports = Websocket;





