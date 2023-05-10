function playStyle(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de définir la manière dont le bot va jouer. La commande prend en paramètre un style de jeu')
        bot.sendGameMessage('Styles de jeu disponibles: Human, Bot et Drunk')
        bot.sendGameMessage('Utilisation: $playStyle Bot OU $bps Bot')
    } 
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$playStyle" ou "$bps" pour mieux comprendre son utilisation')
    }
    else if (arguments.toLowerCase() != "human" && arguments.toLowerCase() != "bot" && arguments.toLowerCase() != "drunk") {
        bot.sendGameMessage('Le style de jeu fourni est introuvable. Voici les styles de jeu disponibles: Human et Bot')
    }
    else {
        if (arguments.toLowerCase() == "human") {bot.set_playStyle("human")}
        else if (arguments.toLowerCase() == "bot") { bot.set_playStyle("bot") }
        else if (arguments.toLowerCase() == "drunk") { bot.set_playStyle("drunk") }
        bot.sendGameMessage('Le bot a désormais le style de jeu: ' + arguments)
    }
}
module.exports = playStyle