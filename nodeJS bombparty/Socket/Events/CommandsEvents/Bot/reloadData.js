function reloadData(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else {
        try {
            bot.initAI()
            bot.sendGameMessage('Les datas ont été rechargés')
        }
        catch {
            bot.sendGameMessage('Erreur lors du chargement des datas')
        }
        
    }
}
module.exports = reloadData