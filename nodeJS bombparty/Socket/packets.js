/* ENGINE.IO & SOCKET.IO PACKETS */

//Engine.io
const open = "0" //Used during the handshake
const close = "1" //Used to indicate that a transport can be closed
const ping = "2" //Used in the heartbeat mechanism
const pong = "3" //Used in the heartbeat mechanism
const message = "4" //Used to send a payload to the other side
const upgrade = "5" //Used during the upgrade process
const noop = "6" //Used during the upgrade process

//Socket.io
const CONNECT = "0" //Used during the connection to a namespace
const DISCONNECT = "1" //Used when disconnecting from a namespace
const EVENT = "2" //Used to send data to the other side
const ACK = "3" //Used to acknowledge an event
const ERROR = "4" //Used during the connection to a namespace
const BINARY_EVENT = "5" //Used to send binary data to the other side
const BINARY_ACK = "6" //Used to acknowledge an event (the response includes binary data)

//Combination
const message_ACK = message + ACK //43
const message_EVENT = message + EVENT //42
const message_CONNECT = message + CONNECT //40
const message_DISCONNECT = message + DISCONNECT //41

//Export the module
module.exports = {
    open, close, ping, pong, message, upgrade, noop,
    CONNECT, DISCONNECT, EVENT, ACK, ERROR, BINARY_EVENT, BINARY_ACK,
    message_ACK, message_EVENT, message_CONNECT, message_DISCONNECT
};