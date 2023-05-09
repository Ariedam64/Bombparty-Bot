function setDictionaryManifest(jsonData, bot) {

    bonusAlphabet = jsonData[1].bonusAlphabet
    language = jsonData[1].name
    promptDifficulties = jsonData[1].promptDifficulties

    bot.get_room().language = language

}

module.exports = setDictionaryManifest