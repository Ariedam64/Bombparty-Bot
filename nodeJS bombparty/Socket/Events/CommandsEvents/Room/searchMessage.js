
const pasteBin = require('../../../../Misc/PasteBin/api')

async function searchMessage(chatterPlayer, arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Cette commande permet de trouver un message posté dans les 1000 derniers message room. La commande prend en paramètres un message entre guillemets')
        bot.sendGameMessage('Utilisation: $searchMessage "pokémon" OU $rsm "pokémon"')
    }
    else if (!(arguments.includes('"')) || arguments.split('"').length - 1 < 2) {
        bot.sendGameMessage('Vous avez fourni un message sans guillemet. Utilisez la commande "$searchMessage" ou "$rsm" pour mieux comprendre son utilisation')
    }
    else {
        var messageToFind = arguments.substring(1).slice(0, -1)
        var messagesFound = bot.get_room().searchMessage(messageToFind, bot.get_nickname())
        if (messagesFound.length == 0) {bot.sendGameMessage("Aucun message trouvé")}
        else if (messagesFound.length == 1) {bot.sendGameMessage(messagesFound[0])}
        else {
            var messageToPaste = ""
            for (const message of messagesFound) {
                messageToPaste += message + "\n"
            }
            var pastLink = await pasteBin.pasteMessage(messageToPaste)
            bot.sendGameMessage("Plusieurs messages trouvés: " + pastLink)
        }
    }
}

module.exports = searchMessage