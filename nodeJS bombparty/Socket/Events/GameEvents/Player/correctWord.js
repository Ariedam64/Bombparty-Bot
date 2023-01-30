const performance = require('performance-now');

function correctWord(jsonData, bot) {

    try {
        var playerPeerId = jsonData[1].playerPeerId
        var bonusLetters = jsonData[1].bonusLetters
        var player = bot.get_room().getPlayerByPeerId(playerPeerId)
        var correctWord = bot.get_room().getPlayerByPeerId(playerPeerId).get_word().replace(/[^a-zA-Z-']/gi, '')

        bot.get_room().getPlayerByPeerId(playerPeerId).isReactionTime = false

        bot.get_room().getPlayerByPeerId(playerPeerId).set_endWpmTime(performance())
        let duration = (bot.get_room().getPlayerByPeerId(playerPeerId).get_endWpmTime() - bot.get_room().getPlayerByPeerId(playerPeerId).get_startWpmTime()).toFixed(3);

        var compteur = 1
        var strVide = ""
        for (var i = 0; i < correctWord.length; i++) {
            strVide += correctWord.charAt(i)
            if (strVide.length % 7 === 0) {
                compteur++
            }
        }

        bot.get_room().getPlayerByPeerId(playerPeerId).get_wpmWords().push(compteur)
        bot.get_room().getPlayerByPeerId(playerPeerId).get_wpmTimes().push(duration)

        bot.get_room().getPlayerByPeerId(playerPeerId).addBonusLetters(bonusLetters, bot.get_room().get_bonusAlphabet()) //Update bonusLetter of the player
        bot.get_room().getPlayerByPeerId(playerPeerId).set_wasWordValidated(true)
        bot.get_room().game.set_lastCorrectWord(correctWord) //Update the last correct word
        bot.get_room().game.addUsedWord(correctWord)
        bot.get_room()

        if (playerPeerId != bot.get_peerId()) { //Add word to database if its from player
            bot.get_database().addNewWord(bot.get_room().getDatabaseLanguage(), correctWord)
        }

        //TRACKED

        //TRACKED

        try {
            var tracked = player.get_isTracked()
        }
        catch {
            var tracked = false
        }

        if (tracked) {

            if (player.get_wpmWords().length > 1) {
                var diffWpm = player.getDiffWpm()
                var diffReaction = player.getDiffReactionTime()

                if (diffWpm > 0) {
                    diffWpm = "+" + diffWpm.toString()
                }
                if (diffReaction > 0) {
                    diffReaction = "+" + diffReaction.toString()
                }

                bot.sendGameMessage(player.nickname + " traker: " + player.getLastReactionTime() + "ms (" + diffReaction + "), " + player.getLastWpm() + " mots/min (" + diffWpm + ")")
            }
            else {
                bot.sendGameMessage(player.nickname + " traker: " + player.getLastReactionTime() + "ms, " + player.getLastWpm() + " mots/min")
            }
        }

        player.set_lastWpmAverage(player.getWpmAverage())
        player.set_lastReactionTimeAverage(player.getReactionTimeAverage())
    }
    catch {
        console.log("ERREUR CORRECTWORD")
    }

       
    

}

module.exports = correctWord