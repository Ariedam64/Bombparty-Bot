function connectionEtablished(jsonData, bot) {

    bot.get_wsRoom().set_ready(true) //Ready To send joinRoom request
}

module.exports = connectionEtablished