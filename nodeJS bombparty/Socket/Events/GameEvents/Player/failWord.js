async function failWord(jsonData, bot) {

    var playerPeerId = jsonData[1]
    var reason = jsonData[2]
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)

    if (player != false) {
        player.set_wasWordValidated(false)

        switch (reason) {
            case "mustContainSyllable":
                break
            case "alreadyUsed":
                player.errorsPercentage.push(0) //Update player precision
                break
            case "notInDictionary":
                player.errorsPercentage.push(0) //Update player precision
                break
        }

        if (playerPeerId == bot.get_peerId()) { //Bot turn
            var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), bot.get_room().game.get_syllable())
            bot.playWithPlayStyle(foundWordArray)
        }
        else { //Other players turn

        }
    } 
}

module.exports = failWord