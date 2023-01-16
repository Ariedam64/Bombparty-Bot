function playerCpPic(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Erreur: Aucun joueur renseigné (ex: $pcp Ayaya | $pcp 12")
    }
    else {
        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false) {
            bot.sendGameMessage("Copie du joueur " + player.nickname)
            bot.copyImagePlayer(player)
        }
        else if (playerList.length == 1) {
            bot.sendGameMessage("Copie du joueur " + playerList[0].nickname)
            bot.copyImagePlayer(playerList[0])
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvé, renseigné plutôt le peerId du joueur")
        }
    }
}


module.exports = playerCpPic