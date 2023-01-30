function nationality(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer la langue du navigateur d\'un joueur présent dans la partie. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $nationality Ayaya OU $pn Ayaya')
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

        /* Find player language */
        if (player != null) {
            nationnality = player.get_language()
            bot.sendGameMessage("Le navigateur du joueur " + player.nickname + " est paramétré avec la langue: " + nationnality)
        }       
    }
}

module.exports = nationality