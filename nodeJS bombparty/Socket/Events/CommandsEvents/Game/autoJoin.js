function autoJoin(arguments, bot) {

    bot.set_isAutoJoin(!bot.get_isAutoJoin())

    if (bot.get_isAutoJoin()) {
        bot.get_wsGame().emit("joinRound")
    }
    else {
        bot.get_wsGame().emit("leaveRound")
    }
}

module.exports = autoJoin