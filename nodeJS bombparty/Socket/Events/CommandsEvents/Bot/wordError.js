const funct = require('../../../../Misc/Functions.js')

function wordError(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet d\'augmenter ou de diminuer le pourcentage d\'erreur du bot lorsqu\'il écrit un mot. La commande prend en paramètre un pourcentage de 0 à 100')
        bot.sendGameMessage('Utilisation: $wordError 10%')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$wordError" pour mieux comprendre son utilisation')
    }
    else if ((!(arguments.includes("%")))) {
        bot.sendGameMessage('Aucun pourcentage renseigné. Utilisez la commande "$wordError" pour mieux comprendre son utilisation')
    }
    else if (!(funct.isInt(arguments.replace("%", "")))) {
        bot.sendGameMessage('Le pourcentage renseigné n\'est pas un entier. Utilisez la commande "$wordError" pour mieux comprendre son utilisation')
    }
    else if (parseInt(arguments) < 0 || parseInt(arguments) > 100) {
        bot.sendGameMessage('Le pourcentage renseigné n\'est pas compris entre 0 et 100. Utilisez la commande "$wordError" pour mieux comprendre son utilisation')
    }
    else {
        var pourcentage = arguments.replace("%", "")

        bot.set_wordErrorPercentage(parseInt(pourcentage) / 100)
        bot.sendGameMessage("Le pourcentage d'erreur du bot est maintenant à " + bot.get_wordErrorPercentage()*100 + "%")
    }
}

module.exports = wordError