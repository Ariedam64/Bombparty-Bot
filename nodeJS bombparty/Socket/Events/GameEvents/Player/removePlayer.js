function removePlayer(jsonData,bot) {

    var playerPeerId = jsonData[1]
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)

    if (player != false) {
        player.set_isOnline(null)
    }
}

module.exports = removePlayer