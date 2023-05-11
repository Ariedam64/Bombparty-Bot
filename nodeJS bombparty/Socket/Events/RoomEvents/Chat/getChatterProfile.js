function getChatterProfile(jsonData,bot) {

    if (jsonData[0] != null) {

        var nickname = jsonData[0].nickname
        var peerId = jsonData[0].peerId

        bot.get_room().allPlayers.push(peerId + ": " + nickname)
    }
}

module.exports = getChatterProfile