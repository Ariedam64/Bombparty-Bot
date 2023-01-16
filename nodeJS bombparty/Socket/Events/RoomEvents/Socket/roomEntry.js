const GameSocket = require('../../../Sockets/GameSocket.js')

function roomEntry(jsonData, bot) {

    bot.updateBotInfoAfterJoin(jsonData) //Update bot info
    bot.get_room().updateGlobalInformation(jsonData) //Update room info
    bot.get_wsRoom().emit1("getChatterProfiles") //Get players infos

    bot.set_wsGame(new GameSocket("GameSocket",  false, false))
    bot.get_wsGame().set_bot(bot)

}

module.exports = roomEntry