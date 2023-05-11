const funct = require('../../../Misc/Functions.js')
const performance = require('performance-now');


async function setup(jsonData, bot) {



        //Setup room
        bot.get_room().setup(jsonData)

        /* GAME IS SEATING */
        if (jsonData[1].milestone.name == "seating") {

            var milestone = jsonData[1].milestone
            var players = jsonData[1].players

            /* UPDATE ROOM INFO */
            bot.get_room().game.updateMilestoneSeating(milestone)

            /* RESET PLAYERS INGAME INFO + DELETE PLAYERS WHO QUIT THE ROOM DURING THE GAME */
            for (const player of bot.get_room().get_players()) {
                if (player.get_isOnline() == false) { bot.get_room().deletePlayer(player.get_peerId()) }
                player.resetGameInfo()                
            }
            for (const player of players) {
                var playerExist = bot.get_room().getPlayerByPeerId(player.profile.peerId)
                if (playerExist != false) {
                    playerExist.set_isOnline(player.isOnline)
                }  
                bot.get_room().game.totalPlayerInGame += 1
            }

            /* AUTO JOIN */
            if (bot.get_isAutoJoin()) {
                await funct.sleep(Math.floor(Math.floor(Math.random() * (Math.floor(1200) - Math.ceil(250)) + Math.ceil(250))));
                bot.get_wsGame().emit("joinRound")
            }
        }

        /* GAME IS ROUND */
        else {

            var milestone = jsonData[1].milestone
            var playersPlaying = jsonData[1].milestone.playerStatesByPeerId
            var players = jsonData[1].players
            var currentPlayerPlaying = jsonData[1].milestone.currentPlayerPeerId
            var syllable = jsonData[1].milestone.syllable

            /* UPDATE ROOM INFO */
            bot.get_room().game.updateMilestoneRound(milestone)

            /* UPDATE PLAYERS INGAME INFO */
            for (const [key, data] of Object.entries(playersPlaying)) {
                var playerExist = bot.get_room().getPlayerByPeerId(key)
                if (playerExist != false) {
                    playerExist.updateGameInfo(data)//player game update state   
                }
            }

            for (const player of players) {
                var playerExist = bot.get_room().getPlayerByPeerId(player.profile.peerId)
                if (playerExist != false) {
                    playerExist.set_isOnline(player.isOnline)
                }         
            }

            /* BOT TURN */
            if (currentPlayerPlaying == bot.get_peerId()) {

                bot.set_isPlaying(true)  

                /* SIMULATE WORD TYPING */
                var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), syllable)
                var word = bot.get_room().getWordWithLowOccurrence(foundWordArray)                 
                if (word != null) {
                    bot.simulateWord(word, bot.get_wpm(), bot.get_wordErrorPercentage())
                }
            }

            /* OTHER PLAYERS TURNS */
            else { 
                bot.set_isPlaying(false)
            }
        } 

}

module.exports = setup