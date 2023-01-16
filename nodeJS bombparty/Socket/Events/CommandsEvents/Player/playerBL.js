function playerBL(arguments, bot) {

    if (arguments == null) {
        bot.sendGameMessage("Erreur: Aucun joueur renseigné (ex: $playerBL Ayaya | $playerBL 12")
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
            bot.sendGameMessage(playerList.length + " joueurs trouvés")
        }
    }
}


module.exports = playerBL