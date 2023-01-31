const funct = require('../../../Misc/Functions.js')
const performance = require('performance-now');


async function setup(jsonData, bot) {


    try {
        //Setup room
        bot.get_room().setup(jsonData)


        //If game is not started
        if (jsonData[1].milestone.name == "seating") {

            var milestone = jsonData[1].milestone
            bot.get_room().game.updateMilestoneSeating(milestone)//room game update

            await funct.sleep(Math.floor(Math.floor(Math.random() * (Math.floor(1200) - Math.ceil(250)) + Math.ceil(250))));

            if (bot.get_isAutoJoin()) {
                bot.get_wsGame().emit("joinRound")
            }
        }
        else {//If game is started

            var milestone = jsonData[1].milestone
            var playersPlaying = jsonData[1].milestone.playerStatesByPeerId
            var currentPlayerPlaying = jsonData[1].milestone.currentPlayerPeerId
            var syllable = jsonData[1].milestone.syllable

            var foundWordArray = await bot.get_database().getWordContainSyllables(bot.get_room().getDatabaseLanguage(), syllable)

            bot.get_room().game.updateMilestoneRound(milestone)//room game update

            for (const [key, data] of Object.entries(playersPlaying)) {
                if (bot.get_room().existPlayer(key)) {
                    bot.get_room().getPlayerByPeerId(key).updateGameInfo(data) //player game update state
                }
            }

            if (currentPlayerPlaying == bot.get_peerId()) { //Bot turn

                bot.set_isPlaying(true)

                var word = bot.get_room().getWordWithLowOccurrence(foundWordArray)
                if (word != null) {
                    bot.simulateWord(word, bot.get_wpm(), bot.get_wordErrorPercentage())
                }
            }
            else { //Other players turn

                bot.set_isPlaying(false)
                

            }

        }
    }
    catch {
        console.log("ERREUR SETUP")
    }

    
}

module.exports = setup