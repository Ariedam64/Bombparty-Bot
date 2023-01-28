const pasteBin = require('../../../../Misc/PasteBin/api')

async function messages(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer la liste des messages d\'un joueur présent dans la room. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $messages Ayaya OU $messages 8')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false) {
            if (player.get_messages().length == 0) {
                bot.sendGameMessage("Aucun message n'a été trouvé pour le joueur " + player.nickname)
            }
            else {
                var messageToPaste = "Player: " + player.nickname + "\n\n"
                for (const message of player.get_messages()) {
                    messageToPaste += message._toString() + "\n"
                }
                var pastLink = await pasteBin.pasteMessage(messageToPaste)
                bot.sendGameMessage("Messages du joueur " + player.nickname + ": " + pastLink)
            }
          
        }
        else if (playerList.length == 1) {
            if (playerList[0].get_messages().length == 0) {
                bot.sendGameMessage("Aucun message n'a été trouvé pour le joueur " + playerList[0].nickname)
            }
            else {
                var messageToPaste = "Player: " + playerList[0].nickname + "\n\n"
                for (const message of playerList[0].get_messages()) {
                    messageToPaste += message._toString() + "\n"
                }
                var pastLink = await pasteBin.pasteMessage(messageToPaste)
                bot.sendGameMessage("Messages du joueur " + playerList[0].nickname + ": " + pastLink)
            }         
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")
        }
    }
}


module.exports = messages