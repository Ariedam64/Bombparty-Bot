const funct = require('../../../../Misc/Functions.js')

function wpm(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Erreur: Aucun WPM renseigné (ex: $wpm 85)")
    }
    else if (!(funct.isInt(arguments))) {
        bot.sendGameMessage("Erreur: Le WPM renseigné n'est pas un entier")
    }
    else if (parseInt(arguments) < 10 || parseInt(arguments) > 250) {
        bot.sendGameMessage("Erreur: Le WPM renseigné doit être compris entre 10 et 250")
    }
    else {
        bot.set_wpm(arguments)
        bot.sendGameMessage("Le WPM du bot est maintenant de " + bot.get_wpm())
    }
}

module.exports = wpm