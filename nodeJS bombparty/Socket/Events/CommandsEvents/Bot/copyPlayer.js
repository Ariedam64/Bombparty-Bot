

function playerCpPic(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet au bot de copier le pseudo et l\'image d\'un joueur présent dans la partie. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $copyProfile Ayaya OU $copyProfile 8')
    }
    else {
        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false) {
            bot.sendGameMessage("Copie du joueur " + player.nickname + " en cours")
            bot.copyImagePlayer(player)
        }
        else if (playerList.length == 1) {
            bot.sendGameMessage("Copie du joueur " + playerList[0].nickname + " en cours")
            bot.copyImagePlayer(playerList[0])
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")
        }
    }
}


module.exports = playerCpPic