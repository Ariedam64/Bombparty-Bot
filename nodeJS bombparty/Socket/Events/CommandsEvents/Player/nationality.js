function nationality(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet la nationalité d\'un joueur présent dans la partie. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $nationality Ayaya OU $nationality 8')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false) {
            nationnality = player.get_language()
            bot.sendGameMessage("Nationalité du joueur " + player.nickname + ": " + nationnality)
        }
        else if (playerList.length == 1) {
            nationnality = playerList[0].get_language()
            bot.sendGameMessage("Nationalité du joueur " + playerList[0].nickname + ": " + nationnality)
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")
        }
    }
}

module.exports = nationality