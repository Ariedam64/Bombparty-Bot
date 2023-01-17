function setPlayerWord(jsonData, bot) {

    var playerPeerId = jsonData[1]
    var word = jsonData[2]

    if (bot.get_room().getPlayerByPeerId(playerPeerId) != false) {
        bot.get_room().getPlayerByPeerId(playerPeerId).set_word(word)
    }
    
    

}

module.exports = setPlayerWord