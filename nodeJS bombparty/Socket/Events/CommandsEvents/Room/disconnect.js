function disconnect(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }   
    else {
        bot.get_wsGame().disconnect()
        bot.get_wsRoom().disconnect()
        delete bot
    }
}

module.exports = disconnect