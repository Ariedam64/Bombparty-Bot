function updatePlayer(jsonData, bot) {

    var playerPeerId = jsonData[1]
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)

    if (player != false) {
        player.updateGeneralInfo(jsonData)
    } 
}

module.exports = updatePlayer