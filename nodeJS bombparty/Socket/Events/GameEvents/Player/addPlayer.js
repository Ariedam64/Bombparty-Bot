function addPlayer(jsonData, bot) {

    var playerPeerId = jsonData[1].profile.peerId
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)   

    if (player != false) {
        player.set_isOnline(true)
    }
   
}

module.exports = addPlayer