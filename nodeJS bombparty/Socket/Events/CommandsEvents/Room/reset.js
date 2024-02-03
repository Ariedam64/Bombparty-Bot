const GameSocket = require("../../../Sockets/GameSocket")

function reset(chatterPlayer, arguments, bot) {

    if (arguments.split(" ").length == 1 && chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId() && arguments.split(" ").length == 1) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (!bot.roles.includes("leader")) {
        bot.sendGameMessage('Vous ne pouvez pas exécuter cette commande dans ce salon')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres.')
    }
    else {
        bot.get_wsRoom().emit("setGame", "bombparty")
        bot.set_wsGame(new GameSocket("GameSocket", bot, true, true, bot.get_room().get_roomLink() + '/socket.io/?EIO=4&transport=websocket')) //On se reconnecte au socket de la game
    }
}

module.exports = reset