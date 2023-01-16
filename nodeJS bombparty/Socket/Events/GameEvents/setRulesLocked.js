function setRulesLocked(jsonData, bot) {

    var rulesLocked = jsonData[1]

    bot.get_room().game.set_rulesLocked(rulesLocked)

}

module.exports = setRulesLocked