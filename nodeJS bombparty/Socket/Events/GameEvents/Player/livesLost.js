function livesLost(jsonData, bot) {

    if (player != false) {
        var playerPeerId = jsonData[1]
        var newPlayerLives = jsonData[2]
        var player = bot.get_room().getPlayerByPeerId(playerPeerId)

        /* UPDATE PLAYER STATE */
        if (player != false) {
            player.set_lives(newPlayerLives) //Set new lives to the player
            player.isReactionTime = false //Stop reaction time
            player.errorsPercentage.push(0) //Add new error percentage
        }      
    }
}

module.exports = livesLost