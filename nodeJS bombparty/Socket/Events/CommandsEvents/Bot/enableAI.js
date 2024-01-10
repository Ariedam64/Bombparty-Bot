function enableAI(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet d'activer ou non l'IA du bot. La commande prend en paramètre la valeur 'on' ou 'off'")
        bot.sendGameMessage('Utilisation: $ai on OU $ai off')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$ai" pour mieux comprendre son utilisation')
    }
    else if (arguments.toLowerCase() != "on" && arguments.toLowerCase() != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit avoir pour valeur "on" ou "off". Utilisez la commande "$ai" pour mieux comprendre son utilisation')
    }
    else {

        if (arguments.toLowerCase() == "on" && !bot.get_isAi()) {
            bot.set_isAi(true)
            bot.sendGameMessage("L'IA du bot est maintenant actif")
        }
        else if (arguments.toLowerCase() == "off" && bot.get_isAi()) {
            bot.set_isAi(false)
            bot.sendGameMessage("L'IA du bot est maintenant inactif")
        }
        else if (arguments.toLowerCase() == "off" && !bot.get_isAi()) {
            bot.sendGameMessage("L'IA du bot est déjà inactif")
        }
        else if (arguments.toLowerCase() == "on" && bot.get_isAi()) {
            bot.sendGameMessage("L'IA du bot est déjà actif")
        }
    }
}


module.exports = enableAI