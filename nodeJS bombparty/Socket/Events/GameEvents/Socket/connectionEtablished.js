function connectionEtablished(jsonData,bot) {

    bot.get_wsGame().set_ready(true) //Ready To send joinRoom request
    bot.connectToGame()

}

module.exports = connectionEtablished