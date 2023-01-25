function reactionTime(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de donner le temps de réaction moyen d\'un joueur. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $reactionTime Ayaya OU $reactionTime 8')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }       
        else if (player != false) {
            if (player.get_reactionsTimes().length == 0) {
                bot.sendGameMessage("Aucun temps de réaction disponible pour le joueur " + player.nickname)
            }
            else {
                bot.sendGameMessage("Temps de réaction moyen du joueur " + player.nickname + ": " + player.getReactionTimeAverage() + "ms")
            }           
        }
        else if (playerList.length == 1) {
            if (playerList[0].get_reactionsTimes().length == 0) {
                bot.sendGameMessage("Aucun temps de réaction disponible pour le joueur " + playerList[0].nickname)
            }
            else {
                bot.sendGameMessage("Temps de réaction moyen du joueur " + playerList[0].nickname + ": " + playerList[0].getReactionTimeAverage() + "ms")
            }       
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")
        }
    }
}

module.exports = reactionTime