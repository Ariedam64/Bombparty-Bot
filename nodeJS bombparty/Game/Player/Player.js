
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

        this.maxMessage = 50;
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

    addBonusLetters(bonusLetters, bonusAlphabet) {
        for (const letter of bonusLetters) {
            if (bonusAlphabet.includes(letter) && (!(this.bonusLetters.includes(letter)))) {
                this.bonusLetters.push(letter)
            }
        }
    }

    resetBonusLetters() {
        this.set_bonusLetters([])
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
}

//Export the class
module.exports = Player;
