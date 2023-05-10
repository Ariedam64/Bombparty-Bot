function setPlayerCount(jsonData, bot) {

    var playerCount = jsonData[1]

    bot.get_room().set_playerCount(playerCount)
    bot.get_wsRoom().emitCustom(1, "getChatterProfiles")
    
}

module.exports = setPlayerCount