const performance = require('performance-now');
const funct = require('../../Misc/Functions')

class Player {

    constructor(peerId = null, nickname = null, auth = null, language = null, picture = null, roles = null) {

        //General information
        this.peerId = peerId;
        this.nickname = nickname;
        this.picture = picture;
        this.language = language;
        this.auth = auth;
        this.roles = roles;

        //Game information
        this.messages = [] //List Messages Objects
        this.bonusLetters = [];
        this.isOnline = null
        this.lives = null;
        this.wasWordValidated = null;
        this.word = "";

        this.isTracked = false;
        this.isAssisted = false

        this.isReactionTime = false
        this.reactionsTimes = []
        this.maxReactionsTimes = 50;
        this.startReactionTime = 0.0
        this.endReactionTime = 0.0

        this.wpmWords = []
        this.wpmTimes = []
        this.wpms = []
        this.maxWpmTimes = 50;
        this.startWpmTime = 0.0
        this.endWpmTime = 0.0

        this.isErased = false
        this.numberOfErrorTyped = 0
        this.errorsPercentage = []

        this.lastWpmAverage = null
        this.lastReactionTimeAverage = null
        this.lastErrorPercentage = null

        this.totalCorrectWord = 0

        this.rankedWords = []
        this.rankedSyllables = []

        this.maxMessage = 250;

    }

    /* GETTERS */
    get_peerId() { return this.peerId };
    get_nickname() { return this.nickname };
    get_auth() { return this.auth };
    get_language() { return this.language };
    get_picture() { return this.picture };
    get_roles() { return this.roles };
    get_messages() { return this.messages };

    get_isOnline() { return this.isOnline }
    get_bonusLetters() { return this.bonusLetters };
    get_lives() { return this.lives };
    get_wasWordValidated() { return this.wasWordValidated };
    get_word() { return this.word };

    get_isTracked() { return this.isTracked }
    get_isAssisted() { return this.isAssisted }
    get_reactionsTimes() { return this.reactionsTimes }
    get_maxReactionsTimes() { return this.maxReactionsTimes }
    get_isReactionTime() { return this.isReactionTime }

    get_wpmWords() { return this.wpmWords }
    get_wpmTimes() { return this.wpmTimes }
    get_maxWpmTimes() { return this.maxWpmTimes }
    get_startWpmTime() { return this.startWpmTime }
    get_endWpmTime() { return this.endWpmTime }

    get_isErased() { return this.isErased }
    get_numberOfErrorTyped() { this.numberOfErrorTyped }
    get_errorsPercentage() { this.errorsPercentage }

    get_lastWpmAverage() { return this.lastWpmAverage }
    get_lastReactionTimeAverage() { return this.lastReactionTimeAverage }
    get_lastErrorPercentage() { return this.lastErrorPercentage }

    get_maxMessage() { return this.maxMessage };

    /* SETTERS */
    set_peerId(newPeerId) { this.peerId = newPeerId };
    set_nickname(newNickname) { this.nickname = newNickname };
    set_auth(newAuth) { this.auth = newAuth };
    set_language(newLanguage) { this.language = newLanguage };
    set_picture(newPicture) { this.picture = newPicture };
    set_roles(newRoles) { this.roles = newRoles };
    set_messages(newMessages) { this.room = newMessages };

    set_isOnline(newIsOnline) { this.isOnline = newIsOnline }
    set_bonusLetters(newBonusLetters) { this.bonusLetters = newBonusLetters };
    set_lives(newLives) { this.lives = newLives };
    set_wasWordValidated(newWasWordValidated) { this.wasWordValidated = newWasWordValidated };
    set_word(newWord) { this.word = newWord };

    set_isTracked(newIsTrack) { this.isTracked = newIsTrack }
    set_isAssisted(newisAssisted) { this.isAssisted = newisAssisted }
    set_reactionsTimes(newReactionstTimes) { this.reactionsTimes = newReactionstTimes }
    set_maxReactionsTimes(newMaxReactionsTimes) { this.maxReactionsTimes = newMaxReactionsTimes }
    set_isReactionTime(newIsReactionTime) { this.isReactionTime = newIsReactionTime }

    set_wpmWords(newWpmWords) { this.wpmWords = newWpmWords }
    set_wpmTimes(newWpmTimes) { this.wpmTimes = newWpmTimes }
    set_maxWpmTimes(newMaxWpmTimes) { this.maxWpmTimes = newMaxWpmTimes }
    set_startWpmTime(newStartWpmTime) { this.startWpmTime = newStartWpmTime }
    set_endWpmTime(newEndWpmTime) { this.endWpmTime = newEndWpmTime }

    set_isErased(newIsErased) { this.isErased = newIsErased }
    set_numberOfErrorTyped(newNumberOfErrorTyped) { this.numberOfErrorTyped = newNumberOfErrorTyped }
    set_errorsPercentage(newErrorsPercentage) { this.errorsPercentage = newErrorsPercentage }

    set_lastWpmAverage(newLastWpmAverage) { this.lastWpmAverage = newLastWpmAverage }
    set_lastReactionTimeAverage(newLastReactionTimeAverage) { this.lastReactionTimeAverage = newLastReactionTimeAverage }
    set_lastErrorPercentage(newLastErrorPercentage) { this.lastErrorPercentage = newLastErrorPercentage }

    set_maxMessage(newMaxMessage) { this.maxMessage = newMaxMessage };


    /* FUNCTIONS */
    updateGeneralInfo(jsonData) {
        this.set_auth(jsonData[2].auth)
        this.set_language(jsonData[2].language)
        this.set_nickname(jsonData[2].nickname)
        this.set_peerId(jsonData[2].peerId)
        this.set_roles(jsonData[2].roles)
        this.set_isOnline(jsonData[3])
    }


    updateGameInfo(jsonData) {
        this.set_lives(jsonData.lives)
        this.set_word(jsonData.word)
        this.set_wasWordValidated(jsonData.wasWordValidated)
        this.set_bonusLetters(jsonData.bonusLetters)
        this.reactionsTimes = []
        this.wpmTimes = []
        this.wpmWords = []
        this.wpms = []
        this.rankedSyllables = []
        this.rankedWords = []
        this.isReactionTime = true
        this.startReactionTime = performance();
        this.set_isErased(false)
        this.numberOfErrorTyped = 0
        this.set_word("")
        this.errorsPercentage = []
    }

    resetGameInfo() {
        this.set_lives(null)
        this.set_word("")
        this.set_wasWordValidated(null)
        this.set_isOnline(null)
        this.bonusLetters = []
        this.totalCorrectWord = 0
    }

    getNeededBonusLetters() {
        let bonusLetters = ""
        Object.entries(this.get_bonusLetters()).forEach(([key, value]) => {
            if (value > 0) {
                let newValue = funct.integerToExponent(value)
                bonusLetters += `${key.toUpperCase()}${newValue}, ` 
            }    
        });
        return bonusLetters.slice(0, -2)
    }

    appendMessage(message) {
        if (this.get_messages().length == this.get_maxMessage()) {
            this.get_messages().shift()
        }
        this.get_messages().push(message)
    }

    getDiffReactionTime() {
        if (this.get_reactionsTimes().length > 1) {

            var diffReactionTime = this.getLastReactionTime() - this.reactionsTimes[this.get_reactionsTimes().length - 2]
            diffReactionTime = parseFloat(diffReactionTime)
            return diffReactionTime.toFixed(2)
        }
        else {
            return 0
        }
    }

    getDiffPrecision() {
        if (this.errorsPercentage.length > 1) {

            var diffPrecision = this.getLastPrecision()/100 - this.errorsPercentage[this.errorsPercentage.length - 2]
            diffPrecision = parseFloat(diffPrecision)*100
            return diffPrecision.toFixed(2)
        }
        else {
            return 0
        }
    }

    getDiffWpm() {
        if (this.get_wpmTimes().length > 1) {

            let totalTimeWpm = parseFloat(this.wpmTimes[this.get_wpmTimes().length - 2])
            let totalWords = parseInt(this.wpmWords[this.wpmWords.length - 2])
            var wpm1 = parseInt((totalWords * 60000) / totalTimeWpm)
            var wpm2 = parseInt(this.getLastWpm())

            var diffWpm = wpm2 - wpm1

            return diffWpm
        }
        else {
            return 0
        }
    }

    getLastReactionTime() { 
        let lastRt = parseFloat(this.reactionsTimes[this.reactionsTimes.length - 1])
        return lastRt.toFixed(2)
    }

    getLastPrecision() {
        let lastPrecision = parseFloat(this.errorsPercentage[this.errorsPercentage.length - 1])*100
        return lastPrecision.toFixed(2)
    }

    getLastWpm() {
        let totalTimeWpm = parseFloat(this.wpmTimes[this.get_wpmTimes().length - 1])
        let totalWords = parseInt(this.wpmWords[this.wpmWords.length - 1])

        var average = parseInt((totalWords * 60000) / totalTimeWpm)
        return average
    }

    getReactionTimeAverage() {
        let reactionsTimes = parseFloat(0.0)

        for (const reactionTime of this.get_reactionsTimes()) {
            reactionsTimes = parseFloat(reactionsTimes) + parseFloat(reactionTime)
        }
        var average = reactionsTimes / this.get_reactionsTimes().length
        return average.toFixed(2)
    }

    getWpmAverage() {
        let totalTimeWpm = parseFloat(0.0)
        let totalWords = 0

        for (const wpmTime of this.get_wpmTimes()) {        
            totalTimeWpm = parseFloat(totalTimeWpm) + parseFloat(wpmTime)
        }

        for (const wordLength of this.wpmWords) {
            totalWords += wordLength
        }

        var average = (totalWords * 60000) / totalTimeWpm

        return average.toFixed(0)
    }

    getPrecisionAverage() {
        let totalPrecision = parseFloat(0.0)

        for (const errorPercentage of this.errorsPercentage) {
            totalPrecision = parseFloat(totalPrecision) + parseFloat(errorPercentage)
        }

        var average = (totalPrecision / this.errorsPercentage.length) * 100

        return average.toFixed(2)

    }

}

//Export the class
module.exports = Player;
