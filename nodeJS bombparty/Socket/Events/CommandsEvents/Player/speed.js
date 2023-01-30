function speed(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de donner la vitesse d\'écriture d\'un joueur. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $speed Ayaya OU $ps Ayaya')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var playerId = bot.get_room().getPlayerByPeerId(arguments)
        var playerAuth = bot.get_room().getPlayerByAuth(arguments)
        var player = null

        /* Check player */
        if (playerList.length == 0 && playerId == false && playerAuth == false) {bot.sendGameMessage("Joueur introuvable")}       
        else if (playerId != false) {player = playerId  }
        else if (playerList.length == 1) {player = playerList[0]}
        else if (playerAuth != false) {player = playerAuth}
        else {bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")}

        /* Find player speed */
        if (player != false) {
            if (player.get_wpmTimes().length == 0) {bot.sendGameMessage("Aucune vitesse d\'écriture moyen disponible pour le joueur " + player.nickname)}
            else {bot.sendGameMessage("Vitesse d\'écriture moyen du joueur " + player.nickname + ": " + player.getWpmAverage() + " mots/min (" + player.get_wpmTimes().length + " rec)")} 
        }
    }
}

module.exports = speed