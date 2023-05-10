const GameSocket = require('../../../Sockets/GameSocket.js')

function roomEntry(jsonData, bot) {

    bot.updateBotInfoAfterJoin(jsonData) //Update bot info
    bot.get_room().updateGlobalInformation(jsonData) //Update room info
    bot.get_wsRoom().emitCustom(1, "getChatterProfiles") //Get players infos

    bot.set_wsGame(new GameSocket("GameSocket", bot, false, false, bot.get_room().get_roomLink() + '/socket.io/?EIO=4&transport=websocket'))

}

module.exports = roomEntry