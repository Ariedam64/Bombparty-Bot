function suicide(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id)) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet au bot de se suicider pendant la partie. La commande prend en paramètre la valeur "on" ou "off"')
        bot.sendGameMessage('Utilisation: $suicide on OU $bs off')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$suicide" ou "$bs" pour mieux comprendre son utilisation')
    }
    else if (arguments.toLowerCase() != "on" && arguments.toLowerCase() != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit avoir pour valeur "on" ou "off". Utilisez la commande "$suicide" ou "$bs" pour mieux comprendre son utilisation')
    }
    else {
        if (arguments.toLowerCase() == "on") {
            bot.set_isSuicide(true)
            bot.sendGameMessage('Le bot va se suicider automatiquement')
        }
        else {
            bot.set_isSuicide(false)
            bot.sendGameMessage('Le bot ne va plus se suicider automatiquement')
        }
    }
}

module.exports = suicide