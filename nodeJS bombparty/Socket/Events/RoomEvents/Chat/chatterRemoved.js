function chatterRemoved(jsonData, bot) {

    var nicknamePlayerLeft = jsonData[1].nickname
    var players = bot.get_room().getPlayerByNickname(nicknamePlayerLeft)

    for (const player of players) {
        if (player.get_isOnline() == null) {
            bot.get_room().deletePlayer(player.get_peerId())
        }   
    }
    bot.get_room().set_lastPlayerLeft(null)  
}

module.exports = chatterRemoved