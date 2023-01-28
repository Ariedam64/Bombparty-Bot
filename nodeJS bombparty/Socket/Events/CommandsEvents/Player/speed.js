function speed(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de donner la vitesse d\'écriture d\'un joueur. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $speed Ayaya OU $speed 8')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }       
        else if (player != false) {
            if (player.get_reactionsTimes().length == 0) {
                bot.sendGameMessage("Aucune vitesse d\'écriture disponible pour le joueur " + player.nickname)
            }
            else {
                bot.sendGameMessage("Vitesse d\'écriture moyen du joueur " + player.nickname + ": " + player.getWpmAverage() + " mots/min")
            }           
        }
        else if (playerList.length == 1) {
            if (playerList[0].get_reactionsTimes().length == 0) {
                bot.sendGameMessage("Aucune vitesse d\'écriture disponible pour le joueur " + playerList[0].nickname)
            }
            else {
                bot.sendGameMessage("Vitesse d\'écriture moyen du joueur " + playerList[0].nickname + ": " + playerList[0].getWpmAverage() + " mots/min")
            }       
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")
        }
    }
}

module.exports = speed