function bonusAlphabetCompleted(jsonData, bot) {

    var playerPeerId = jsonData[1]
    var newPlayerLives = jsonData[2]
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)

    if (player != false) {
        player.set_lives(newPlayerLives) //Set new lives to the players
    }       

}

module.exports = bonusAlphabetCompleted