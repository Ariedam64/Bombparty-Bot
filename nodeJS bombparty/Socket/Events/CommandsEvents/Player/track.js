function track(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) || chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de tracker un joueur et de lui donner ses statistiques à chaque fin de tour (temps de réaction et vitesse d\'écriture). La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $track Ayaya OU $pt Ayaya')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var playerId = bot.get_room().getPlayerByPeerId(arguments)
        var playerAuth = bot.get_room().getPlayerByAuth(arguments)
        var player = null

        /* Check player */
        if (playerList.length == 0 && playerId == false && playerAuth == false) {bot.sendGameMessage("Joueur introuvable")}
        else if (playerId != false) {player = playerId}
        else if (playerList.length == 1) {player = playerList[0]}
        else if (playerAuth != false) {player = playerAuth}
        else {bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")}

        /* Start or stop track player */
        if (player != null) {        
            player.set_isTracked(!player.get_isTracked())
            if (player.get_isTracked()) { bot.sendGameMessage("Le bot track désormais le joueur " + player.nickname) }
            else { bot.sendGameMessage("Le bot ne track plus le joueur " + player.nickname) }
        }
    }
}

module.exports = track