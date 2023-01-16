const funct = require('../../../../Misc/Functions.js')

function wordError(arguments, bot) {

    if (arguments == null || arguments == "" || (!(arguments.includes("%")))) {
        bot.sendGameMessage("Erreur: Aucun pourcentage renseigné (ex: $wordError 85%)")
    }
    else if (!(funct.isInt(arguments.split(" ")[0].replace("%", "")))) {
        bot.sendGameMessage("Erreur: Le pourcentage renseigné n'est pas un entier (ex: $wordError 85%)")
    }
    else {
        var pourcentage = arguments.split(" ")[0].replace("%", "")

        bot.set_wordErrorPercentage(parseInt(pourcentage) / 100)
        bot.sendGameMessage("Le pourcentage d'erreur du bot est maintenant à " + bot.get_wordErrorPercentage()*100 + "%")
    }
}

module.exports = wordError