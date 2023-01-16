function chatterRemoved(jsonData, bot) {

    var nicknamePlayerLeft = jsonData[1].nickname
    var players = bot.get_room().getPlayerByNickname(nicknamePlayerLeft)

    bot.get_room().set_lastPlayerLeft(nicknamePlayerLeft)

    for (const player of players) {
        bot.get_room().deletePlayer(player.get_peerId())
    }

    bot.get_room().set_lastPlayerLeft(null)
    
}

module.exports = chatterRemoved