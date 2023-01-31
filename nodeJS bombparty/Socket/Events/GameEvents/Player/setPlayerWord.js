const performance = require('performance-now');

function setPlayerWord(jsonData, bot) {



        var playerPeerId = jsonData[1]
        var word = jsonData[2]
        var send = jsonData[3]
        var player = bot.get_room().getPlayerByPeerId(playerPeerId)

        if (!send) {
            if (word.length > player.get_word().length) {
                if (player.get_isErased()) {
                    player.set_isErased(false)
                }
            }
            else if (word.length < player.get_word().length) {
                if (!player.get_isErased()) {
                    player.set_isErased(true)
                    player.numberOfErrorTyped++
                }
            }
        }

        if (word.length == 1) {
            bot.get_room().getPlayerByPeerId(playerPeerId).set_startWpmTime(performance()) //WPM

            if (bot.get_room().getPlayerByPeerId(playerPeerId).isReactionTime == true) {
                bot.get_room().getPlayerByPeerId(playerPeerId).endReactionTime = performance(); //Reaction time
                let duration = (bot.get_room().getPlayerByPeerId(playerPeerId).endReactionTime - bot.get_room().getPlayerByPeerId(playerPeerId).startReactionTime).toFixed(3);
                bot.get_room().getPlayerByPeerId(playerPeerId).get_reactionsTimes().push(duration)
                bot.get_room().getPlayerByPeerId(playerPeerId).isReactionTime = false
            }
        }
        bot.get_room().getPlayerByPeerId(playerPeerId).set_word(word)


    
}

module.exports = setPlayerWord