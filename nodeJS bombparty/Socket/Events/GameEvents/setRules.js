function setRules(jsonData, bot) {

    data = jsonData[1]

    if ("customBonusAlphabet" in data) {
        bot.get_room().set_bonusAlphabet(data.customBonusAlphabet) //Update new customAlphabet
    }
}

module.exports = setRules