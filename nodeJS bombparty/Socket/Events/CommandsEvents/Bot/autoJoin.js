function autoJoin(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id)) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet au bot de rejoindre la partie automatiquement. La commande prend en paramètre la valeur "on" ou "off"')
        bot.sendGameMessage('Utilisation: $autoJoin on OU $baj off')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$autoJoin" ou "$baj" pour mieux comprendre son utilisation')
    }
    else if (arguments != "on" && arguments != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit être avoir pour valeur "on" ou "off". Utilisez la commande "$autoJoin" ou "$baj" pour mieux comprendre son utilisation')
    }
    else {
        if (arguments == "on") {
            bot.set_isAutoJoin(true)
            bot.get_wsGame().emit("joinRound")
            bot.sendGameMessage('Le bot va rejoindre les parties automatiquement')
        }
        else {
            bot.set_isAutoJoin(false)
            bot.get_wsGame().emit("leaveRound")
            bot.sendGameMessage("Le bot ne va plus rejoindre les parties automatiquement")
        }
    }
}

module.exports = autoJoin