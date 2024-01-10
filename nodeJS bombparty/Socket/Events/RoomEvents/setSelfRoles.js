function setSelfRoles(jsonData, bot) {

    var newRoles = jsonData[1]

    bot.set_roles(newRoles)

}

module.exports = setSelfRoles