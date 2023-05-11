function ranked(chatterPlayer, arguments, bot) {

    console.log(bot.roles)

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet d'enregistrer les scores d'un joueur (WPM, temps de réaction et précision) dans un délai de 1 minute. La commande prend en paramètre la valeur 'on' ou 'off'")
        bot.sendGameMessage('Utilisation: $ranked on OU $br off')
    }
    else if (arguments.split(" ").length == 1 && chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId() && arguments.split(" ").length == 1) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (bot.roles[0] != "leader") {
        bot.sendGameMessage('Vous ne pouvez pas exécuter cette commande dans ce salon')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$suicide" ou "$bs" pour mieux comprendre son utilisation')
    }
    else if (arguments.toLowerCase() != "on" && arguments.toLowerCase() != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit avoir pour valeur "on" ou "off". Utilisez la commande "$ranked" ou "$br" pour mieux comprendre son utilisation')
    }
    else {
        if (arguments.toLowerCase() == "on") {
            bot.sendGameMessage('Début du mode ranked')
        }
        else {
            bot.sendGameMessage('Fin du mode ranked')
        }     
    }
}

module.exports = ranked