function addPlayer(jsonData, bot) {

    var playerPeerId = jsonData[1].profile.peerId
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)   

    bot.get_room().game.totalPlayerInGame += 1

    if (player != false) {
        player.set_isOnline(true)

        /* RANKED MODE */
        if (bot.isRanked) {
            bot.checkPlayersRanked()
        }
    }


   
}

module.exports = addPlayer