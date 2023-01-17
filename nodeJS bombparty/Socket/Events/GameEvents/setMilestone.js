const funct = require('../../../Misc/Functions.js')

async function setMilestone(jsonData, bot) {


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

        bot.get_room().game.updateMilestoneRound(milestone)//room game update

        for (const [key, data] of Object.entries(playersPlaying)) {
            if (bot.get_room().existPlayer(key)) {
                bot.get_room().getPlayerByPeerId(key).updateGameInfo(data) //update game player state
            }
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

        }

    }
}

module.exports = setMilestone
