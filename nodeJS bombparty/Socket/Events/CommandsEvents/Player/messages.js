const pasteBin = require('../../../../Misc/PasteBin/api')

async function messages(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer la liste des messages d\'un joueur présent dans la room. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $messages Ayaya OU $pm Ayaya')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var playerId = bot.get_room().getPlayerByPeerId(arguments)
        var playerAuth = bot.get_room().getPlayerByAuth(arguments)
        var player = null

        /* Check player */
        if (playerList.length == 0 && playerId == false && playerAuth == false) {bot.sendGameMessage("Joueur introuvable")}
        else if (playerId != false) {player = playerId     }
        else if (playerList.length == 1) {player = playerList[0] }
        else if (playerAuth != false) {player = playerAuth}
        else {bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")}

        /* Find player message */
        if (player != null) {
            if (player.get_messages().length == 0) {
                bot.sendGameMessage("Aucun message n'a été trouvé pour le joueur " + player.nickname)
            }
            else {
                var messageToPaste = "Player: " + player.nickname + "\n\n"
                for (const message of player.get_messages()) {
                    messageToPaste += message.toString() + "\n"
                }
                var pastLink = await pasteBin.pasteMessage(messageToPaste)
                bot.sendGameMessage("Messages du joueur " + player.nickname + ": " + pastLink)
            }
        }
    }
}


module.exports = messages