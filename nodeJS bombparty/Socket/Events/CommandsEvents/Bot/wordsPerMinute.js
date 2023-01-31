const funct = require('../../../../Misc/Functions.js')

function wordsPerMinute(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) || chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet d\'augmenter ou de diminuer la vitesse d\'écriture du bot. La commande prend en paramètre un entier de 30 à 200')
        bot.sendGameMessage('Utilisation: $wordsPerMinute 80 OU $bwpm 80')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$wordsPerMinute" ou "$bwpm" pour mieux comprendre son utilisation')
    }
    else if (!(funct.isInt(arguments))) {
        bot.sendGameMessage('La vitesse renseigné n\'est pas un entier. Utilisez la commande "$wordsPerMinute" ou "$bwpm" pour mieux comprendre son utilisation')
    }
    else if (parseInt(arguments) < 30 || parseInt(arguments) > 200) {
        bot.sendGameMessage('La vitesse renseigné n\'est pas comprise entre 30 et 200. Utilisez la commande "$wordsPerMinute" ou "$bwpm" pour mieux comprendre son utilisation')
    }
    else {
        var wpm = arguments

        bot.set_wpm(parseInt(wpm))
        bot.sendGameMessage("La vitesse d'écriture du bot est maintenant à " + bot.get_wpm() + " WPM")
    }
}

module.exports = wordsPerMinute