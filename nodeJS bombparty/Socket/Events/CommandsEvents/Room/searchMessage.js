
function searchMessage(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Erreur: Aucun message renseigné (ex: $searchMessage "je le dirais pas deux fois"')
    }
    else if (!(arguments.includes('"')) || arguments.split('"').length - 1 < 2)
        bot.sendGameMessage("Erreur: Le message n'est pas entre guillemet")
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
            bot.sendGameMessage(messagesFound.length + " messages trouvés")
        }
    }
}

module.exports = searchMessage