
function searchMessage(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Cette commande permet de trouver un message posté dans les 1000 derniers message room. La commande prend en paramètres un message entre guillemets')
        bot.sendGameMessage('Utilisation: $searchMessage "pokémon"')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$searchMessage" pour mieux comprendre son utilisation')
    }
    else if (!(arguments.includes('"')) || arguments.split('"').length - 1 < 2) {
        bot.sendGameMessage('Vous avez fourni un message sans guillemet. Utilisez la commande "$searchMessage" pour mieux comprendre son utilisation')
    }
    else {
        var messageToFind = arguments.substring(1).slice(0, -1)

        var messagesFound = bot.get_room().searchMessage(messageToFind, bot.get_nickname())

        if (messagesFound.length == 0) {
            bot.sendGameMessage("Aucun message trouvé")
        }
        else if (messagesFound.length == 1) {
            bot.sendGameMessage(messagesFound[0])
        }
        else {
            bot.sendGameMessage(messagesFound.length + " messages trouvés, renseigné un message plus précis")
        }
    }
}

module.exports = searchMessage