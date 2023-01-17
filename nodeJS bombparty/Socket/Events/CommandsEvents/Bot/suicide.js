function suicide(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet au bot de se suicider pendant la partie. La commande prend en paramètre la valeur "on" ou "off"')
        bot.sendGameMessage('Utilisation: $suicide on/off')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$suicide" pour mieux comprendre son utilisation')
    }
    else if (arguments != "on" && arguments != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit avoir pour valeur "on" ou "off". Utilisez la commande "$suicide" pour mieux comprendre son utilisation')
    }
    else {
        if (arguments == "on") {
            bot.set_isSuicide(true)
            bot.get_wsGame().emit("joinRound")
            bot.sendGameMessage('Le bot va se suicider automatiquement')
        }
        else {
            bot.set_isSuicide(false)
            bot.get_wsGame().emit("leaveRound")
            bot.sendGameMessage('Le bot ne va plus se suicider automatiquement')
        }
    }
}

module.exports = suicide