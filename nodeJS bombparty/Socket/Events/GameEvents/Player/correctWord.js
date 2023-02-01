const performance = require('performance-now');

function correctWord(jsonData, bot) {


    var playerPeerId = jsonData[1].playerPeerId
    var bonusLetters = jsonData[1].bonusLetters
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)

    if (player != false) {
        var correctWord = player.get_word().replace(/[^a-zA-Z-']/gi, '')


        /* REACTION TIME */
        player.isReactionTime = false
        player.set_endWpmTime(performance())
        let duration = (player.get_endWpmTime() - player.get_startWpmTime()).toFixed(3);

        /* WPM */
        var compteur = 1
        var strVide = ""
        for (var i = 0; i < correctWord.length; i++) {
            strVide += correctWord.charAt(i)
            if (strVide.length % 7 === 0) { compteur++ }
        }

        player.get_wpmWords().push(compteur)
        player.get_wpmTimes().push(duration)

        /* ERROR PERCENTAGE */
        if (player.numberOfErrorTyped == 0) {
            player.errorsPercentage.push(1)
        }
        else {
            var lengthWordError = player.get_word().length - player.numberOfErrorTyped
            var lengthWord = player.get_word().length
            var errorPercentage = lengthWordError / lengthWord
            player.errorsPercentage.push(errorPercentage)
        }

        /* UPDATE PLAYER STATE */
        player.addBonusLetters(bonusLetters, bot.get_room().get_bonusAlphabet()) //Update bonusLetter of the player
        player.set_wasWordValidated(true)
        bot.get_room().game.set_lastCorrectWord(correctWord) //Update the last correct word
        bot.get_room().game.addUsedWord(correctWord)


        /* ADD WORD TO DATABASE */
        if (playerPeerId != bot.get_peerId()) { //Add word to database if its from player
            bot.get_database().addNewWord(bot.get_room().getDatabaseLanguage(), correctWord)
        }

        /* TRACKED */
        try { var tracked = player.get_isTracked() }
        catch { var tracked = false }

        if (tracked) {

            if (player.get_wpmWords().length > 1) {
                var diffWpm = player.getDiffWpm()
                var diffReaction = player.getDiffReactionTime()
                var diffPrecision = player.getDiffPrecision()

                if (diffWpm > 0) { diffWpm = "+" + diffWpm.toString() }
                if (diffReaction > 0) { diffReaction = "+" + diffReaction.toString() }
                if (diffPrecision > 0) { diffPrecision = "+" + diffPrecision.toString() }

                bot.sendGameMessage(player.nickname + " traker: " + player.getLastReactionTime() + "ms (" + diffReaction + "), " + player.getLastWpm() + " mots/min (" + diffWpm + "), " + player.getLastPrecision() + "% (" + diffPrecision + "%)")
            }
            else { bot.sendGameMessage(player.nickname + " traker: " + player.getLastReactionTime() + "ms, " + player.getLastWpm() + " mots/min, " + player.getLastPrecision() + "%") }
        }

        /* LAST WPM */
        player.set_lastWpmAverage(player.getWpmAverage())
        player.set_lastReactionTimeAverage(player.getReactionTimeAverage()) 
    }

}

module.exports = correctWord