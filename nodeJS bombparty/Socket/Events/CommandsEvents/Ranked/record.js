function record(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet d'enregistrer les scores d'un joueur (WPM, temps de réaction et précision) dans un délai de 1 minute. La commande prend en paramètre la valeur 'on' ou 'off'")
        bot.sendGameMessage('Utilisation: $record on OU $rr off')
    }
    else if (arguments.split(" ").length == 1 && chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId() && arguments.split(" ").length == 1) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (bot.roles[0] != "leader") {
        bot.sendGameMessage('Vous ne pouvez pas exécuter cette commande dans ce salon')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$record" ou "$rr" pour mieux comprendre son utilisation')
    }
    else if (arguments.toLowerCase() != "on" && arguments.toLowerCase() != "off") {
        bot.sendGameMessage('Le paramètre renseigné doit avoir pour valeur "on" ou "off". Utilisez la commande "$record" ou "$rr" pour mieux comprendre son utilisation')
    }
    else {
        if (arguments.toLowerCase() == "on" && !bot.get_isRanked()) {
            bot.set_isRanked(true)
            bot.set_isAutoJoin(true)
            bot.get_wsGame().emit("joinRound")
            bot.sendGameMessage('Début du mode ranked')
            bot.get_wsGame().emit("setRulesLocked", false)
            bot.get_wsGame().emit("setRules", { "startingLives": 1 })
            bot.get_wsGame().emit("setRules", { "maxLives": 1 })
            bot.get_wsGame().emit("setRules", { "promptDifficulty": "custom", "customPromptDifficulty": 1 })
            bot.get_wsGame().emit("setRulesLocked", true)
        }
        else if (arguments.toLowerCase() == "off" && bot.get_isRanked()) {
            bot.set_isRanked(false)
            bot.set_isAutoJoin(false)
            bot.get_wsGame().emit("leaveRound")
            bot.sendGameMessage('Fin du mode ranked')
        }  
        else if (arguments.toLowerCase() == "off" && !bot.get_isRanked()) {
            bot.sendGameMessage("Le mode ranked n'est pas actif")
        }  
        else if (arguments.toLowerCase() == "on" && bot.get_isRanked()) {
            bot.sendGameMessage("Le mode ranked est déjà actif")
        }  
    }
}

module.exports = record