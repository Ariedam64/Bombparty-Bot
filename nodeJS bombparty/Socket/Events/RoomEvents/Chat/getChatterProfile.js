function getChatterProfile(jsonData,bot) {

    if (jsonData[0] != null) {

        var nickname = jsonData[0].nickname
        var peerId = jsonData[0].peerId

        if (jsonData[0].hasOwnProperty('roles')) {
            if (jsonData[0].roles == "staff") {
                bot.get_room().staffPlayers.push(jsonData[0].auth.username) 
            }
        }
        bot.get_room().allPlayers.push(peerId + ": " + nickname)
        console.log(jsonData)
    }
}

module.exports = getChatterProfile