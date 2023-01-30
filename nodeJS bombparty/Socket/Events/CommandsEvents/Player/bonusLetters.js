function bonusLetters(chatterPlayer, arguments, bot) {


    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer les lettres bonus manquantes d\'un joueur. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $bonusLetters Ayaya OU $pbl Ayaya')
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

        /* Find player bonus letters */
        if (player != null) {
            bonusLetters = player.getNeededBonusLetters(bot.get_room().get_bonusAlphabet()).toUpperCase()
            bot.sendGameMessage("Lettre(s) bonus manquante(s) du joueur " + player.nickname + " : " + bonusLetters)
        }
    }
}


module.exports = bonusLetters