const performance = require('performance-now');

function setPlayerWord(jsonData, bot) {


    var playerPeerId = jsonData[1]
    var word = jsonData[2]
    var send = jsonData[3]
    var player = bot.get_room().getPlayerByPeerId(playerPeerId)

    if (player != false) {
        /* UPDATE PRECISION OF PLAYER*/
        if (!send) {
            if (word.length > player.get_word().length) {
                if (player.get_isErased()) { player.set_isErased(false) }
            }
            
            else if (word.length < player.get_word().length) {
                if (!player.get_isErased()) {
                    player.set_isErased(true)
                    player.numberOfErrorTyped++
                }
            }
        }

        /* UPDATE REACTION TIME PLAYER */
        if (word.length == 1) { //If player started to type
            player.set_startWpmTime(performance()) //start record wpm
            if (player.isReactionTime == true) {
                player.endReactionTime = performance(); //stop record reaction time
                let duration = (player.endReactionTime - player.startReactionTime).toFixed(3);
                player.get_reactionsTimes().push(duration)
                player.isReactionTime = false
            }
        }
        player.set_word(word)
    }
}


module.exports = setPlayerWord