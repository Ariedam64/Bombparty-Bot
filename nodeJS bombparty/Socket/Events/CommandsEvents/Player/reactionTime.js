function reactionTime(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer le temps de réaction moyen d\'un joueur. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $reactionTime Ayaya OU $prt Ayaya')
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

        /* Find player reaction time */
        if (player != null) {
            if (player.get_reactionsTimes().length == 0) {bot.sendGameMessage("Aucun temps de réaction moyen disponible pour le joueur " + player.nickname)}
            else {bot.sendGameMessage("Temps de réaction moyen du joueur " + player.nickname + ": " + player.getReactionTimeAverage() + "ms" + " (" + player.get_reactionsTimes().length + " rec)")}  
        }
    }
}

module.exports = reactionTime