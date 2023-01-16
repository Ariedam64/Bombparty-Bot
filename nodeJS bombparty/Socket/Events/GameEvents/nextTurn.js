async function nextTurn(jsonData, bot) {


    var playerPeerIdTurn = jsonData[1]
    var syllable = jsonData[2]
    var turnWithSameSyllable = jsonData[3]

    var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), syllable)

    bot.get_room().game.set_currentPlayerPeerIdTurn(playerPeerIdTurn) //Set the new current player turn
    bot.get_room().game.set_syllable(syllable) //set the new syllable

    if (turnWithSameSyllable == 0) {
        bot.get_database().addNewSyllable(bot.get_room().getDatabaseLanguage(), syllable)
    }

    if (playerPeerIdTurn == bot.get_peerId()) { //Bot turn

        bot.set_isPlaying(true)

        if (bot.get_isSuicide()) {

            bot.get_wsGame().emit("setWord", "💥", true)
        }
        else {
            var word = bot.get_room().getWordWithHighOccurrence(foundWordArray)
            if (word != null) {
                bot.simulateWord(word, bot.get_wpm(), bot.get_wordErrorPercentage())
            } 
        }      
    }
    else { //Other players turn

        bot.set_isPlaying(false)

    }

}

module.exports = nextTurn