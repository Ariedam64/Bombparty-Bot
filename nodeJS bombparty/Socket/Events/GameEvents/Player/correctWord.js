const performance = require('performance-now');

function correctWord(jsonData, bot) {

    try {
        var playerPeerId = jsonData[1].playerPeerId
        var bonusLetters = jsonData[1].bonusLetters
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

        bot.get_room().getPlayerByPeerId(playerPeerId).appendWpmWordLength(compteur)
        bot.get_room().getPlayerByPeerId(playerPeerId).appendWpmTime(duration)

        bot.get_room().getPlayerByPeerId(playerPeerId).addBonusLetters(bonusLetters, bot.get_room().get_bonusAlphabet()) //Update bonusLetter of the player
        bot.get_room().getPlayerByPeerId(playerPeerId).set_wasWordValidated(true)
        bot.get_room().game.set_lastCorrectWord(correctWord) //Update the last correct word
        bot.get_room().game.addUsedWord(correctWord)
        bot.get_room()

        if (playerPeerId != bot.get_peerId()) { //Add word to database if its from player
            bot.get_database().addNewWord(bot.get_room().getDatabaseLanguage(), correctWord)
        }
    }
    catch {
        console.log("ERROR CORRECT WORD")
    }
    

}

module.exports = correctWord