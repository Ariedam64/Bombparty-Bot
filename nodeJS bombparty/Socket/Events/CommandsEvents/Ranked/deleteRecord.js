const funct = require('../../../../Misc/Functions')

async function deleteRecord(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet de supprimer un record. Elle prend paramètre l'id du record")
        bot.sendGameMessage('Utilisation: $deleteRecord 56 ou $rdr 56')
    }
    else if (arguments.split(" ").length == 1 && chatterPlayer.auth == null || chatterPlayer.auth.id != bot.get_creatorId() && arguments.split(" ").length == 1) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$deleteRecord" ou "$rdr" pour mieux comprendre son utilisation')
    }
    else if (!(funct.isInt(arguments))) {
        bot.sendGameMessage('Le paramètre renseigné n\'est pas un entier. Utilisez la commande "$deleteRecord" ou "$rdr" pour mieux comprendre son utilisation')
    }
    else {
        let resultRequest = null
        resultRequest = await bot.get_database().deleteRecord(arguments)
        if (resultRequest == 1) {
            bot.sendGameMessage("Le record a bien été supprimé")
        }
        else {
            bot.sendGameMessage("Erreur lors de la suppression du record")
        }
    }
}

module.exports = deleteRecord