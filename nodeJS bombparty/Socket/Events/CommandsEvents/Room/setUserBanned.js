async function setUserBanned(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet au bot de bannir un joueur du salon. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $ban Ayaya OU $rb Ayaya')
    }
    else if (!bot.roles.includes("leader") && !bot.roles.includes("moderator")) {
        bot.sendGameMessage("Impossible d'effectuer la commande, le bot n'a pas les autorisations requises")
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var playerId = bot.get_room().getPlayerByPeerId(arguments)
        var playerAuth = bot.get_room().getPlayerByAuth(arguments)
        var player = null

        /* Check player */
        if (playerList.length == 0 && playerId == false && playerAuth == false) { bot.sendGameMessage("Joueur introuvable") }
        else if (playerId != false) { player = playerId }
        else if (playerList.length == 1) { player = playerList[0] }
        else if (playerAuth != false) { player = playerAuth }
        else { bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur") }

        if (player != null) {
            if (player.roles.includes("moderator") && bot.roles.includes("leader")) {
                bot.get_wsRoom().emitCustom(5, "setUserModerator", player.get_peerId(), false)
            }
            bot.get_wsRoom().emitCustom(5, "setUserBanned", player.get_peerId(), true)
        }
    }
}

module.exports = setUserBanned