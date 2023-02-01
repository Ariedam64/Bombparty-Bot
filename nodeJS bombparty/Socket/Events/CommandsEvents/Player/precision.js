function precision(chatterPlayer, arguments, bot) {


    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer la précision d\'un joueur. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $precision Ayaya OU $pp Ayaya')
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

        /* Find player precision */
        if (player != null) {
            if (player.errorsPercentage.length == 0) { bot.sendGameMessage("Aucune précision moyenne disponible pour le joueur " + player.nickname) } 
            else {bot.sendGameMessage("Précision moyenne du joueur " + player.nickname + ": " + player.getPrecisionAverage() + "%" + " (" + player.errorsPercentage.length + " rec)")}          
        }
    }
}


module.exports = precision