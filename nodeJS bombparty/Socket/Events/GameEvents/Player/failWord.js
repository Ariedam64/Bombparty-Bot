async function failWord(jsonData, bot) {

    try {
        var playerPeerId = jsonData[1]
        var reason = jsonData[2]

        bot.get_room().getPlayerByPeerId(playerPeerId).set_wasWordValidated(false)

        if (reason == "alreadyUsed") {
            //Code
        }

        if (playerPeerId == bot.get_peerId()) { //Bot turn
            var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), bot.get_room().game.get_syllable())
            bot.playWithPlayStyle(foundWordArray)
        }
        else { //Other players turn

        }
    }
    catch {
        console.log("FAILWORD ERROR")
    }

    

}

module.exports = failWord