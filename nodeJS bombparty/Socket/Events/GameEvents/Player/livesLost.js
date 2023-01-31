function livesLost(jsonData, bot) {

    try {
        var playerPeerId = jsonData[1]
        var newPlayerLives = jsonData[2]

        if (bot.get_room().getPlayerByPeerId(playerPeerId) != false) { //Check if player exist
            bot.get_room().getPlayerByPeerId(playerPeerId).isReactionTime = false
            bot.get_room().getPlayerByPeerId(playerPeerId).set_lives(newPlayerLives) //Set new lives to the player
            bot.get_room().getPlayerByPeerId(playerPeerId).errorsPercentage.push(0)
        }


    }
    catch {
        console.log("ERREUR LIVELOST")
    }
    

}

module.exports = livesLost