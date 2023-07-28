const performance = require('performance-now');

async function nextTurn(jsonData, bot) {


    var playerPeerIdTurn = jsonData[1]
    var syllable = jsonData[2]
    var turnWithSameSyllable = jsonData[3]
    var player = bot.get_room().getPlayerByPeerId(playerPeerIdTurn)

    var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), syllable)

    bot.get_room().game.set_currentPlayerPeerIdTurn(playerPeerIdTurn) //Set the new current player turn
    bot.get_room().game.set_syllable(syllable) //set the new syllable

    if (turnWithSameSyllable == 0) {
        bot.get_database().addNewSyllable(bot.get_room().getDatabaseLanguage(), syllable)
    }

    if (player != false) {
        /* REACTION TIME */
        player.isReactionTime = true
        player.startReactionTime = performance();

        /* ERROR PERCENTAGE */
        player.set_isErased(false)
        player.numberOfErrorTyped = 0
        player.set_word("")


        if (playerPeerIdTurn == bot.get_peerId()) { //Bot turn

            bot.set_isPlaying(true)

            if (bot.get_isSuicide()) {
                bot.get_wsGame().emit("setWord", "💥", true)
            }
            else {
                bot.playWithPlayStyle(foundWordArray)
            }
        }
        else { //Other players turn

            bot.set_isPlaying(false)

            //ASSISTED

            try { var assisted = player.get_isAssisted() }
            catch { var assisted = false }

            if (assisted) {

                var table = bot.get_language().split("-")[0].toLowerCase()
                var playerAlphabet = player.getNeededBonusLetters(bot.get_room().get_bonusAlphabet())
                var wordsAlreadyPut = bot.get_room().game.get_usedWords()

                words = await bot.get_database().getBestWordWithBonusLetters(table, syllable, playerAlphabet, wordsAlreadyPut)

                if (words == -1) { bot.sendGameMessage("Assistant: Impossible d'éffectuer la requête vers la base de données") }
                else if (words == 0) { bot.sendGameMessage("Assistant: Aucun mot trouvé") }
                else {
                    message = player.nickname + " assistant: "
                    for (const word of words) {
                        message += word.word
                        if (word.matched_letters != null) {
                            message += "(" + word.matched_letters + ")"
                        }
                        message += ", "
                    }
                    bot.sendGameMessage(message)
                }
            }
        }
    }

    /* RANKED */

    if (playerPeerIdTurn != bot.get_peerId()) { player.rankedSyllables.push(syllable); console.log(player) }
    
}

module.exports = nextTurn