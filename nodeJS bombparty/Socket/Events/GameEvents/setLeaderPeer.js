function setLeaderPeer(jsonData, bot) {

    newLeaderPeerId = jsonData[1]
    player = bot.get_room().getPlayerByPeerId(newLeaderPeerId)

    if (player != null) {
        bot.get_room().getPlayerByPeerId(newLeaderPeerId).set_roles(["leader"])
        if (newLeaderPeerId == bot.peerId) {bot.set_roles(["leader"])}
    }
    
}

module.exports = setLeaderPeer