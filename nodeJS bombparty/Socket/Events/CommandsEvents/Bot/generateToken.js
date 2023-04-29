const pasteBin = require('../../../../Misc/PasteBin/api')
const api = require('../../../../Game/API/jklmAPI')

async function generateToken(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        var token = await api.bypassAntiBotToken()
        var pastLink = await pasteBin.pasteMessage(token)
        bot.sendGameMessage("Token de connexion généré: " + pastLink)
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$generateToken" ou "$bgt" pour mieux comprendre son utilisation')
    }
}

module.exports = generateToken