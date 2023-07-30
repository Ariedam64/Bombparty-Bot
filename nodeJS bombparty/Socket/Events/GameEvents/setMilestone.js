const performance = require('performance-now');

const funct = require('../../../Misc/Functions.js')

async function setMilestone(jsonData, bot) {


    /* GAME IS SEATING */
    if (jsonData[1].name == "seating") {

        var milestone = jsonData[1]
        bot.set_isSuicide(false)

        /* RANKED MODE */
        if (!bot.isTimerExpired && bot.timerRanked != null) {
            clearTimeout(bot.timerRanked);
            bot.timerRanked = null
           // bot.rankedPlayer.set_isTracked(false)
            bot.rankedPlayer = null
            bot.sendGameMessage('Le joueur est mort, le score ne sera pas sauvegardé');        
        }     

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

            if (bot.get_isSuicide()) {
                bot.get_wsGame().emit("setWord", "💥", true)
            }
            else {
                bot.playWithPlayStyle(foundWordArray)
            }
        }



        /* OTHER PLAYERS TURN */
        else {

            bot.set_isPlaying(false)
            try { var assistant = player.get_isAssisted() }
            catch { var assistant = false }

            /* ASSIST ON */

            try { var assisted = player.get_isAssisted() }
            catch { var assisted = false }

            if (assisted) {

                var table = bot.get_language().split("-")[0].toLowerCase()
                var wordsAlreadyPut = bot.get_room().game.get_usedWords()

                words = await bot.get_database().getBestWordWithBonusLetters(table, syllable, player.get_bonusLetters(), wordsAlreadyPut)

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

        /* RANKED MODE */
        if (bot.get_isRanked()) {

            var player = bot.get_room().getPlayerByPeerId(currentPlayerPlaying)
            if (currentPlayerPlaying != bot.get_peerId()) { player.rankedSyllables.push(syllable); /*player.set_isTracked(true)*/ }         
            bot.set_playStyle("bot")

            bot.isTimerExpired = false
            bot.timerRanked = setTimeout(function () {
                bot.set_isSuicide(true)
                for (const key in playersPlaying) {
                    if (key != bot.peerId) {
                        bot.rankedPlayer = bot.get_room().getPlayerByPeerId(key)
                        const totalWord = bot.rankedPlayer.totalCorrectWord
                        if (totalWord < 20) { bot.sendGameMessage('Vous avez fourni moins de 20 mots, vos scores ne seront pas sauvegardés'); player.set_isTracked(false) }
                        else if (bot.rankedPlayer.auth == null) { bot.sendGameMessage("Vous n'êtes pas connecté, vos scores ne seront pas sauvegardés"); player.set_isTracked(false) }
                        else {
                            const WPM = bot.rankedPlayer.getWpmAverage()
                            const reactionTime = bot.rankedPlayer.getReactionTimeAverage()
                            const precision = bot.rankedPlayer.getPrecisionAverage()
                            bot.sendGameMessage(bot.rankedPlayer.nickname + ': Mots: ' + totalWord + ", WPM: " + WPM + ", temps de réaction: " + reactionTime + "ms, précision: " + precision + "%");
                            bot.get_database().addRecord(bot.rankedPlayer)
                        }
                    }
                }
                //bot.rankedPlayer.set_isTracked(false)
                bot.rankedPlayer = null
                bot.isTimerExpired = true
            }, 60000);
        }

    }
}

module.exports = setMilestone
