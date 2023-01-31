const performance = require('performance-now');

const funct = require('../../../Misc/Functions.js')

async function setMilestone(jsonData, bot) {

    try {
        //If game is not started or end
        if (jsonData[1].name == "seating") {

            var milestone = jsonData[1]

            bot.get_room().game.updateMilestoneSeating(milestone) //room game update
            bot.set_isSuicide(false)

            await funct.sleep(Math.floor(Math.floor(Math.random() * (Math.floor(1200) - Math.ceil(250)) + Math.ceil(250))));

            if (bot.get_isAutoJoin()) {
                bot.get_wsGame().emit("joinRound")
            }

            for (const player of bot.get_room().get_players()) {
                player.resetGameInfo() //Reset player state
            }

        }
        else { //If game is started or start

            var milestone = jsonData[1]
            var playersPlaying = jsonData[1].playerStatesByPeerId
            var syllable = jsonData[1].syllable
            var currentPlayerPlaying = jsonData[1].currentPlayerPeerId
            var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), syllable)

            var player = bot.get_room().getPlayerByPeerId(currentPlayerPlaying)

            bot.get_room().game.updateMilestoneRound(milestone)//room game update

            for (const [key, data] of Object.entries(playersPlaying)) {
                try { bot.get_room().getPlayerByPeerId(key).updateGameInfo(data) } //update game player state
                catch { console.log("player " + key + " doesnt exist") }
            }

            if (currentPlayerPlaying == bot.get_peerId()) { //Bot turn

                bot.set_isPlaying(true)

                var word = bot.get_room().getWordWithHighOccurrence(foundWordArray)
                if (word != null) {
                    bot.simulateWord(word, bot.get_wpm(), bot.get_wordErrorPercentage())
                }
            }



            else { //Other players turn

                bot.set_isPlaying(false)
                try { var assistant = player.get_isAssisted() }
                catch { var assistant = false }

                //If player track is on
                if (assistant) {

                    var playerAlphabet = player.getNeededBonusLetters(bot.get_room().get_bonusAlphabet())
                    var wordsAlreadyPut = bot.get_room().game.get_usedWords()
                    var table = bot.get_language().split("-")[0].toLowerCase()

                    words = await bot.get_database().getBestWordWithBonusLetters(table, syllable, playerAlphabet, wordsAlreadyPut)

                    if (words == -1) {
                        bot.sendGameMessage("Assistant: Impossible d'éffectuer la requête vers la base de données")
                    }
                    else if (words == 0) {
                        bot.sendGameMessage("Assistant: Aucun mot trouvé")
                    }
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
    }
    catch {
        console.log("ERREUR SETMILESTONE")
    }

}

module.exports = setMilestone
