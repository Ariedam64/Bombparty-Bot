function assistant(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de tracker un joueur et de lui donner les mots les plus optimales pour ces lettres bonus manquantes. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $assistant Ayaya OU $pa Ayaya')
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
        else if (playerAuth) {player = playerAuth}
        else {bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")}

        /* Find player bonus letters */
        if (player != null) {
            player.set_isAssisted(!player.get_isAssisted())
            if (player.get_isAssisted()) {bot.sendGameMessage("Le bot assiste désormais le joueur " + player.nickname)}
            else {bot.sendGameMessage("Le bot n'assiste plus le joueur " + player.nickname)}
        }
    }
}

module.exports = assistant