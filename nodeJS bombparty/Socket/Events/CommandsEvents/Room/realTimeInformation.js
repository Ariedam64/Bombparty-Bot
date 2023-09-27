async function realTimeInformation(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Cette commande permet de données les informations de la room en temps réel au bot')
        bot.sendGameMessage('Utilisation: $realTimeInformation on OU $rr off')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$realTimeInformation" ou "$rr" pour mieux comprendre son utilisation')
    }
    else if (arguments != "on" && arguments != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit être avoir pour valeur "on" ou "off". Utilisez la commande "$realTimeInformation" ou "$rr" pour mieux comprendre son utilisation')
    }
    else {
        if (arguments == "on") {
            bot.get_room().isRealTimeInformation = true
            bot.sendGameMessage('Le bot a désormais accès aux informations de la room')
        }
        else {
            bot.get_room().isRealTimeInformation = false
            bot.initAI()
            bot.sendGameMessage("Le bot n'a plus accès aux informations de la room")
        }
    }
}

module.exports = realTimeInformation