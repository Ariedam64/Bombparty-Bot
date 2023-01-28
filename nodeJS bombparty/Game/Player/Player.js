
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
        this.lives = null;
        this.wasWordValidated = null;
        this.word = null;

        this.isTrack = false;
        this.limitTrack = null;

        this.isReactionTime = false
        this.reactionsTimes = []
        this.maxReactionsTimes = 50;
        this.startReactionTime = 0.0
        this.endReactionTime = 0.0

        this.wpmWords = []
        this.wpmTimes = []
        this.maxWpmTimes = 50;
        this.startWpmTime = 0.0
        this.endWpmTime = 0.0

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

    get_bonusLetters() { return this.bonusLetters };
    get_lives() { return this.lives };
    get_wasWordValidated() { return this.wasWordValidated };
    get_word() { return this.word };

    get_limitTrack() { return this.limitTrack }
    get_isTrack() { return this.isTrack }
    get_reactionsTimes() { return this.reactionsTimes }
    get_maxReactionsTimes() { return this.maxReactionsTimes }
    get_isReactionTime() { return this.isReactionTime }

    get_wpmWords() { return this.wpmWords }
    get_wpmTimes() { return this.wpmTimes }
    get_maxWpmTimes() { return this.maxWpmTimes }
    get_startWpmTime() { return this.startWpmTime }
    get_endWpmTime() { return this.endWpmTime }

    get_maxMessage() { return this.maxMessage };

    /* SETTERS */
    set_peerId(newPeerId) { this.peerId = newPeerId };
    set_nickname(newNickname) { this.nickname = newNickname };
    set_auth(newAuth) { this.auth = newAuth };
    set_language(newLanguage) { this.language = newLanguage };
    set_picture(newPicture) { this.picture = newPicture };
    set_roles(newRoles) { this.roles = newRoles };
    set_messages(newMessages) { this.room = newMessages };

    set_bonusLetters(newBonusLetters) { this.bonusLetters = newBonusLetters };
    set_lives(newLives) { this.lives = newLives };
    set_wasWordValidated(newWasWordValidated) { this.wasWordValidated = newWasWordValidated };
    set_word(newWord) { this.word = newWord };

    set_limitTrack(newLimitTrack) { this.limitTrack = newLimitTrack }
    set_isTrack(newIsTrack) { this.isTrack = newIsTrack }
    set_reactionsTimes(newReactionstTimes) { this.reactionsTimes = newReactionstTimes }
    set_maxReactionsTimes(newMaxReactionsTimes) { this.maxReactionsTimes = newMaxReactionsTimes }
    set_isReactionTime(newIsReactionTime) { this.isReactionTime = newIsReactionTime }

    set_wpmWords(newWpmWords) { this.wpmWords = newWpmWords }
    set_wpmTimes(newWpmTimes) { this.wpmTimes = newWpmTimes }
    set_maxWpmTimes(newMaxWpmTimes) { this.maxWpmTimes = newMaxWpmTimes }
    set_startWpmTime(newStartWpmTime) { this.startWpmTime = newStartWpmTime }
    set_endWpmTime(newEndWpmTime) { this.endWpmTime = newEndWpmTime }

    set_maxMessage(newMaxMessage) { this.maxMessage = newMaxMessage };


    /* FUNCTIONS */
    _toString() {
        console.log(
            "peerId: " + this.get_peerId() + "\n" +
            "nickname: " + this.get_nickname() + "\n" +
            "auth: " + this.get_auth() + "\n" +
            "language: " + this.get_language() + "\n" +
            "picture: " + this.get_picture() + "\n" +
            "roles: " + this.get_roles() + "\n" +
            "messages: " + this.get_messages() + "\n" +
            "bonusLetters: " + this.get_bonusLetter() + "\n" +
            "lives: " + this.get_lives() + "\n" +
            "wasWordValidated: " + this.get_wasWordValidated() + "\n" +
            "word: " + this.get_word()
        )
    }

    updateGameInfo(jsonData) {
        this.set_lives(jsonData.lives)
        this.set_word(jsonData.word)
        this.set_wasWordValidated(jsonData.wasWordValidated)
        this.set_bonusLetters(jsonData.bonusLetters)
    }

    resetGameInfo() {
        this.set_lives(null)
        this.set_word(null)
        this.set_wasWordValidated(null)
        this.resetBonusLetters()
    }

    addBonusLetters(bonusLetters, bonusAlphabet) {
        for (const letter of bonusLetters) {
            if (bonusAlphabet.includes(letter) && (!(this.bonusLetters.includes(letter)))) {
                this.bonusLetters.push(letter)
            }
        }
    }

    resetBonusLetters() {
        this.bonusLetters = []
    }

    getNeededBonusLetters(bonusAlphabet) {
        var neededBonusLetters = ""
        for (const letter of bonusAlphabet) {
            if (!(this.bonusLetters.includes(letter))) {
                neededBonusLetters += letter
            }
        }
        return neededBonusLetters
    }

    appendMessage(message) {
        if (this.get_messages().length == this.get_maxMessage()) {
            this.get_messages().shift()
        }
        this.get_messages().push(message)
    }

    appendReactionTime(reactionTime) {
        if (this.get_reactionsTimes().length == this.get_maxReactionsTimes()) {
            this.get_reactionsTimes().shift()
        }
        this.get_reactionsTimes().push(reactionTime)
    }

    appendWpmTime(WpmTime) {
        if (this.get_wpmTimes().length == this.get_maxWpmTimes()) {
            this.get_wpmTimes().shift()
        }
        this.get_wpmTimes().push(WpmTime)
    }

    appendWpmWordLength(wordLength) {
        if (this.get_wpmWords().length == this.get_maxWpmTimes()) {
            this.get_wpmWords().shift()
        }
        this.get_wpmWords().push(wordLength)
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
}

//Export the class
module.exports = Player;
