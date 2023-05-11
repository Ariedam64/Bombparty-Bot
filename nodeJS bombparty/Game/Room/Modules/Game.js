class InGame {

    constructor(status = null, syllable = null, usedWordCount = null, peerId = null, lastRoundWinnerName = null, lastRoundWinnerPicture = null, rulesLocked = null, totalPlayerInGame = null) {

        //Ingame information
        this.status = status;
        this.syllable = syllable;
        this.usedWordCount = usedWordCount;
        this.lastRoundWinnerName = lastRoundWinnerName;
        this.lastRoundWinnerPicture = lastRoundWinnerPicture;
        this.rulesLocked = rulesLocked;
        this.totalPlayerInGame = totalPlayerInGame

        this.currentPlayerPeerIdTurn = null
        this.lastCorrectWord = null

        this.usedWords = new Set()
    }

    /* GETTERS */
    get_status() { return this.status }
    get_syllable() { return this.syllable }
    get_usedWordCount() { return this.usedWordCount }
    get_lastRoundWinnerName() { return this.lastRoundWinnerName }
    get_lastRoundWinnerPicture() { return this.lastRoundWinnerPicture }
    get_rulesLocked() { return this.rulesLocked }
    get_currentPlayerPeerIdTurn() { return this.currentPlayerPeerIdTurn }
    get_lastCorrectWord() { return this.lastCorrectWord }
    get_usedWords() { return this.usedWords }

    /* SETTERS */
    set_status(newStatus) { this.status = newStatus }
    set_syllable(newSyllable) { this.syllable = newSyllable }
    set_usedWordCount(newUsedWordCount) { this.usedWordCount = newUsedWordCount }
    set_lastRoundWinnerName(newLastRoundWinnerName) { this.lastRoundWinnerName = newLastRoundWinnerName }
    set_lastRoundWinnerPicture(newLastRoundWinnerPicture) { this.lastRoundWinnerPicture = newLastRoundWinnerPicture }
    set_rulesLocked(newRulesLocked) { this.rulesLocked = newRulesLocked }
    set_currentPlayerPeerIdTurn(newCurrentPlayerPeerIdTurn) { this.currentPlayerPeerIdTurn = newCurrentPlayerPeerIdTurn }
    set_lastCorrectWord(newLastCorrectWord) { this.lastCorrectWord = newLastCorrectWord }
    set_usedWords(newUsedWords) { this.usedWords = newUsedWords }

    /* FUNCTIONS */

    setup(jsonData) {
        this.set_status(jsonData[1].milestone.name)
        this.set_rulesLocked(jsonData[1].milestone.rulesLocked)
    }

    updateMilestoneSeating(jsonData) { 

        this.set_status(jsonData.name)
        if (jsonData.lastRound != null) {
            this.set_lastRoundWinnerName(jsonData.lastRound.winner.nickname)
            if (jsonData.lastRound.winner.picture != null) { this.set_lastRoundWinnerPicture(jsonData.lastRound.winner.picture) }
        }
        this.set_rulesLocked(jsonData.rulesLocked)
        this.set_syllable(null)
        this.set_usedWordCount(0)
        this.set_currentPlayerPeerIdTurn(null)
        this.set_lastCorrectWord(null)
    }

    updateMilestoneRound(jsonData) {
        this.set_status(jsonData.name)
        this.set_syllable(jsonData.syllable)
        this.set_usedWordCount(jsonData.usedWordCount)
    }

    resetUsedWordsList() {
        this.usedWords = new Set()
    }

    addUsedWord(word) {
        this.usedWords.add(word)
    }


}

//Export the class
module.exports = InGame;