function chatterAdded(jsonData, bot) {

    var nicknamePlayerJoined = jsonData[1].nickname
    bot.get_room().set_lastPlayerJoined(nicknamePlayerJoined)

    bot.get_wsRoom().emitCustom(1, "getChatterProfiles")
}

module.exports = chatterAdded