function bonusLetters(arguments, bot) {


    if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet de récupérer les lettres bonus manquantes d\'un joueur. La commande prend en paramètre le pseudo ou le peerId du joueur')
        bot.sendGameMessage('Utilisation: $bonusLetters Ayaya OU $bonusLetters 8')
    }
    else {

        var playerList = bot.get_room().getPlayerByNickname(arguments)
        var player = bot.get_room().getPlayerByPeerId(arguments)

        if (playerList.length == 0 && player == false) {
            bot.sendGameMessage("Joueur introuvable")
        }
        else if (player != false) {
            bonusLetters = player.getNeededBonusLetters(bot.get_room().get_bonusAlphabet()).toUpperCase()
            bot.sendGameMessage("Lettre bonus manquante du joueur " + player.nickname + " : " + bonusLetters)
        }
        else if (playerList.length == 1) {
            bonusLetters = playerList[0].getNeededBonusLetters(bot.get_room().get_bonusAlphabet()).toUpperCase()
            bot.sendGameMessage("Lettre bonus manquante du joueur " + playerList[0].nickname + " : " + bonusLetters)
        }
        else {
            bot.sendGameMessage("Plusieurs joueurs trouvé, renseigné plutôt le peerId du joueur")
        }
    }
}


module.exports = bonusLetters