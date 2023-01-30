function permission(chatterPlayer, arguments, bot) {


    if (chatterPlayer.auth == null || chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet d\'ajouter ou de retirer les droits d\'accès à l\'ensemble des commandes disponibles pour un joueur. La commande prend en paramètre le pseudo (jklm, twitch ou discord) ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $permission Ayaya OU $pp Ayaya')
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
            if (player.auth == null) {
                bot.sendGameMessage("Impossible d\'ajouter ou de supprimer les droits d\'accès au joueur " + player.nickname + " car il n\'est pas connecté")
            }
            else if (bot.get_playerStaff().includes(player.auth.id)) {
                bot.get_playerStaff().splice(bot.get_playerStaff().indexOf(player.auth.id), 1)
                bot.sendGameMessage("Le joueur " + player.nickname + " n'a plus accès à toutes les commandes disponibles")             
            }
            else {               
                bot.get_playerStaff().push(player.auth.id)     
                bot.sendGameMessage("Le joueur " + player.nickname + " a désormais accès à toutes les commandes disponibles")
            }
        }
    }
}


module.exports = permission