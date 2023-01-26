function playStyle(arguments, bot) {


    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de définir la manière dont le bot va jouer. La commande prend en paramètre un style de jeu')
        bot.sendGameMessage('Styles de jeu disponibles: Human, Bot')
        bot.sendGameMessage('Utilisation: $playStyle Bot')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$playStyle" pour mieux comprendre son utilisation')
    }
    else if (arguments != "Human" && arguments != "Bot") {
        bot.sendGameMessage('Le style de jeu fourni est introuvable. Voici les styles de jeu disponibles: Human, Bot')
    }
    else {
        if (arguments == "Human") {
            bot.set_playStyle("Human")
        }
        else if (arguments == "Bot") {
            bot.set_playStyle("Bot")
        }
        bot.sendGameMessage('Le bot a désormais le style de jeu: ' + arguments)
    }
}
module.exports = playStyle