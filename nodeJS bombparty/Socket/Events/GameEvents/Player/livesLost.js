function livesLost(jsonData, bot) {

    var playerPeerId = jsonData[1]
    var newPlayerLives = jsonData[2]



    if (bot.get_room().getPlayerByPeerId(playerPeerId) != false) { //Check if player exist

        bot.get_room().getPlayerByPeerId(playerPeerId).isReactionTime = false

        bot.get_room().getPlayerByPeerId(playerPeerId).set_lives(newPlayerLives) //Set new lives to the player
    }   

}

module.exports = livesLost