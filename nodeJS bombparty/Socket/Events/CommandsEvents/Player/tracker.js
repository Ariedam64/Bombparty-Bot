function track(arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de tracker un joueur et de lui donner les mots les plus optimales pour ces lettres bonus manquantes. La commande prend en paramètre la valeur "on" ou "off" ainsi que le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $track on Ayaya OU $track off 8')
    }
    else if (arguments.split(" ")[0] != "on" && arguments.split(" ")[0] != "off") {
        bot.sendGameMessage('Le premier paramètre renseigné doit être avoir pour valeur "on" ou "off". Utilisez la commande "$track" pour mieux comprendre son utilisation')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments.split(" ")[1])
        var player = bot.get_room().getPlayerByPeerId(arguments.split(" ")[1])

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false && arguments.split(" ")[0] == "on") {
            bot.sendGameMessage("Le bot track désormais le joueur " + player.nickname)
            player.set_isTrack(true)
        }
        else if (player != false && arguments.split(" ")[0] == "off") {
            bot.sendGameMessage("Le bot ne track plus le joueur " + player.nickname)
            player.set_isTrack(false)
        }
        else if (playerList.length == 1 && arguments.split(" ")[0] == "on") {
            bot.sendGameMessage("Le bot track désormais le joueur " + playerList[0].nickname)
            playerList[0].set_isTrack(true)
        }
        else if (playerList.length == 1 && arguments.split(" ")[0] == "off") {
            bot.sendGameMessage("Le bot ne track plus le joueur " + playerList[0].nickname)
            playerList[0].set_isTrack(false)
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvés, renseignez plutôt le peerId du joueur")
        }
    }
}

module.exports = track