const Player = require("../../../../Game/Player/Player")

function chatterAdded(jsonData, bot) {

    var nicknamePlayerJoined = jsonData[1].nickname
    bot.get_room().set_lastPlayerJoined(nicknamePlayerJoined)

    bot.get_wsRoom().emit1("getChatterProfiles")


}

module.exports = chatterAdded