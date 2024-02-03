const fonct = require("../../../../Misc/Functions")
const GameSocket = require("../../../Sockets/GameSocket")

async function nightVision(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres.')
    }
    else {
        bot.set_isNightVision(!bot.get_isNightVision())
        if (bot.get_isNightVision()) {
            bot.sendGameMessage("Night vision activé")     
            while (bot.get_isNightVision()) {
                bot.get_wsRoom().emit("setGame", "bombparty")
                await fonct.sleep(50)
            }
        }
        else {
            bot.sendGameMessage("Night vision désactivé")
            bot.set_wsGame(new GameSocket("GameSocket", bot, true, true, bot.get_room().get_roomLink() + '/socket.io/?EIO=4&transport=websocket')) //On se reconnecte au socket de la game
        }
    }
}

module.exports = nightVision