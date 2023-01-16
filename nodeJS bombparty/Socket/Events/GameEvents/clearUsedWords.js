function clearUsedWords(jsonData, bot) {

    bot.get_room().game.resetUsedWordsList()

}

module.exports = clearUsedWords