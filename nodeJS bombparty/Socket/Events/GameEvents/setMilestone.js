const performance = require('performance-now');

const funct = require('../../../Misc/Functions.js')

async function setMilestone(jsonData, bot) {


    /* GAME IS SEATING */
    if (jsonData[1].name == "seating") {

        var milestone = jsonData[1]

        bot.set_isSuicide(false)

        /* UPDATE ROOM INFO */
        bot.get_room().game.updateMilestoneSeating(milestone)
            
        /* RESET PLAYERS INGAME INFO + DELETE PLAYERS WHO QUIT THE ROOM DURING THE GAME */
        for (const player of bot.get_room().get_players()) {
            if (player.get_isOnline() == false) { bot.get_room().deletePlayer(player.get_peerId()) }
            player.resetGameInfo()             
        }

        /* AUTOJOIN */
        if (bot.get_isAutoJoin()) {
            await funct.sleep(Math.floor(Math.floor(Math.random() * (Math.floor(1200) - Math.ceil(800)) + Math.ceil(800))));
            bot.get_wsGame().emit("joinRound")
        }

    }

    /* GAME IS ROUND */
    else {

        var milestone = jsonData[1]
        var playersPlaying = jsonData[1].playerStatesByPeerId
        var syllable = jsonData[1].syllable
        var currentPlayerPlaying = jsonData[1].currentPlayerPeerId
        var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), syllable)
        var player = bot.get_room().getPlayerByPeerId(currentPlayerPlaying)


        /* UPDATE ROOM INFO */
        bot.get_room().game.updateMilestoneRound(milestone)

        /* UPDATE PLAYERS INGAME INFO */
        for (const [key, data] of Object.entries(playersPlaying)) {
            var player = bot.get_room().getPlayerByPeerId(key)
            if (player != false) {
                player.updateGameInfo(data)
            }
        }

        /* BOT TURN */
        if (currentPlayerPlaying == bot.get_peerId()) {

            bot.set_isPlaying(true)

            /* SIMULATE WORD TYPING */
            var word = bot.get_room().getWordWithHighOccurrence(foundWordArray)
            if (word != null) {
                bot.simulateWord(word, bot.get_wpm(), bot.get_wordErrorPercentage())
            }
        }


        /* OTHER PLAYERS TURN */
        else {

            bot.set_isPlaying(false)
            try { var assistant = player.get_isAssisted() }
            catch { var assistant = false }

            /* TRACKER ON */
            if (assistant) {

                var playerAlphabet = player.getNeededBonusLetters(bot.get_room().get_bonusAlphabet())
                var wordsAlreadyPut = bot.get_room().game.get_usedWords()
                var table = bot.get_language().split("-")[0].toLowerCase()

                words = await bot.get_database().getBestWordWithBonusLetters(table, syllable, playerAlphabet, wordsAlreadyPut)

                if (words == -1) {bot.sendGameMessage("Assistant: Impossible d'éffectuer la requête vers la base de données")}
                else if (words == 0) {bot.sendGameMessage("Assistant: Aucun mot trouvé")}
                else {
                    message = player.nickname + " assistant: "
                    for (const word of words) {
                        message += word.word
                        if (word.matched_letters != null) {message += "(" + word.matched_letters + ")"}
                        message += ", "
                    }
                    message = message.slice(0, -2)
                    bot.sendGameMessage(message)
                }
            }
        }

    }
}

module.exports = setMilestone
