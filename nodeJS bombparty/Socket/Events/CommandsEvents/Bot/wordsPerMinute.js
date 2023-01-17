const funct = require('../../../../Misc/Functions.js')

function wordsPerMinute(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet d\'augmenter ou de diminuer la vitesse d\'écriture du bot. La commande prend en paramètre un entier de 0 à 250')
        bot.sendGameMessage('Utilisation: $wordsPerMinute 80')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$wordsPerMinute" pour mieux comprendre son utilisation')
    }
    else if (!(funct.isInt(arguments))) {
        bot.sendGameMessage('La vitesse renseigné n\'est pas un entier. Utilisez la commande "$wordsPerMinute" pour mieux comprendre son utilisation')
    }
    else if (parseInt(arguments) < 0 || parseInt(arguments) > 250) {
        bot.sendGameMessage('La vitesse renseigné n\'est pas compris entre 0 et 250. Utilisez la commande "$wordError" pour mieux comprendre son utilisation')
    }
    else {
        var wpm = arguments

        bot.set_wpm(parseInt(wpm))
        bot.sendGameMessage("La vitesse d'écriture du bot est maintenant à " + bot.get_wpm() + " WPM")
    }
}

module.exports = wordsPerMinute