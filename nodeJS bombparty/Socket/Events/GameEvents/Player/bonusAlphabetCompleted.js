function bonusAlphabetCompleted(jsonData, bot) {

    var playerPeerId = jsonData[1]
    var newPlayerLives = jsonData[2]

    bot.get_room().getPlayerByPeerId(playerPeerId).resetBonusLetters() //Reset bonusLetters of the player
    bot.get_room().getPlayerByPeerId(playerPeerId).set_lives(newPlayerLives) //Set new lives to the players

}

module.exports = bonusAlphabetCompleted