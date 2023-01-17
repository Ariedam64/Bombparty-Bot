function nationnality(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet la nationnalité d\'un joueur présent dans la partie. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $nationnality Ayaya OU $nationnality 8')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false) {
            nationnality = player.get_language().split("-")[1]
            if (nationnality == null) { nationnality = "Bot" }
            bot.sendGameMessage("Nationnalité du joueur " + player.nickname + ": " + nationnality)
        }
        else if (playerList.length == 1) {
            nationnality = playerList[0].get_language().split("-")[1]
            if (nationnality == null) { nationnality = "Bot" }
            bot.sendGameMessage("Nationnalité du joueur " + playerList[0].nickname + ": " + nationnality)
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvé, renseigné plutôt le peerId du joueur")
        }
    }
}

module.exports = nationnality