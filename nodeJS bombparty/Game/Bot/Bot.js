const Player = require('../Player/Player.js');
const funct = require('../../Misc/Functions')
const RoomSocket = require('../../Socket/Sockets/RoomSocket.js');
const Database = require('../../BD/dataBase')
const api = require('../API/jklmAPI.js')

const image64 = "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"

class Bot extends Player {

    constructor(nickname = "Eyeye", picture = image64, auth = null, language = "fr-FR") {

        super(); //Inherits class Player

        this.nickname = nickname;
        this.language = language;
        this.picture = picture;
        this.auth = auth;
        this.userToken = this.generateUserToken()

        this.database = Database

        this.room = null;

        this.wsGame = null;
        this.wsRoom = null;

        this.creatorId = "128202956574162945"
        this.playerStaff = []

        //Game state
        this.playStyle = "Human"
        this.isAutoJoin = true
        this.isPlaying = false
        this.isSuicide = false
        this.wpmTimer = 16300
        this.wpm = 115
        this.wordErrorPercentage = 0.08
    }

    /* Getters */
    get_userToken() { return this.userToken };
    get_database() { return this.database };
    get_room() { return this.room };
    get_wsGame() { return this.wsGame };
    get_wsRoom() { return this.wsRoom };
    get_wpm() { return this.wpm };
    get_wordErrorPercentage() { return this.wordErrorPercentage }
    get_isSuicide() { return this.isSuicide }
    get_isPlaying() { return this.isPlaying }
    get_isAutoJoin() { return this.isAutoJoin }
    get_playStyle() { return this.playStyle }
    get_playerStaff() { return this.playerStaff }
    get_creatorId() { return this.creatorId }

    /* Setter */
    set_room(newRoom) { this.room = newRoom }
    set_database(newDatabase) { this.database = newDatabase }
    set_wsGame(newWsGame) { this.wsGame = newWsGame; this.wsGame.set_bot(this) }
    set_wsRoom(newWsRoom) { this.wsRoom = newWsRoom; }
    set_wpm(newWpm) { this.wpm = newWpm; }
    set_wordErrorPercentage(newWordErrorPercentage) { this.wordErrorPercentage = newWordErrorPercentage; }
    set_isSuicide(newIsSuicide) { this.isSuicide = newIsSuicide; }
    set_isPlaying(newIsPlaying) { this.isPlaying = newIsPlaying; }
    set_isAutoJoin(newIsAutoJoin) { this.isAutoJoin = newIsAutoJoin; }
    set_playStyle(newPlayeStyle) { this.playStyle = newPlayeStyle }
    set_playerStaff(newPlayerStaff) { this.playerStaff = newPlayerStaff }
    set_creatorId(newCreatorId) { this.creatorId = newCreatorId }

    /* FUNCTIONS */

    /* Global */
    generateUserToken() {
        var token = "";
        for (; token.length < 16; token += Math.random().toString(36).substr(2));
        return (token.substr(0, 16));
    }

    updateBotInfoAfterJoin(jsonData) {

        this.set_peerId(jsonData[0].selfPeerId)
        this.set_roles(jsonData[0].selfRoles)
    }

    _toString() {
        super._toString()
        console.log(
            "userToken: " + this.get_userToken()
        )
    }

    /* Socket */

    //Connect to room
    async connectToRoom(room) {

        var webSocketLink = await api.joinRoom(room.get_roomCode())

        if (webSocketLink != -1 && webSocketLink != 0) {

            this.wsRoom = new RoomSocket("RoomSocket", this, false, false, webSocketLink + '/socket.io/?EIO=4&transport=websocket')

            this.room = room;
            this.room.set_roomLink(webSocketLink)
            funct.waitFor(_ => this.get_wsRoom().get_ready() === true) //Wait until ws is ready to send
                .then(_ => {
                    //Make the data
                    var data = {
                        "roomCode": this.get_room().get_roomCode(),
                        "userToken": this.get_userToken(),
                        "nickname": this.get_nickname(),
                        "language": this.get_language(),
                    }
                    if (this.get_picture() != null) { data["picture"] = this.get_picture() }; //check if bot has pic
                    if (this.get_auth() != null) { data["auth"] = this.get_auth() }; //check if bot has auth (Discord/Twitch)

                    //Send data to connect   
                    this.get_wsRoom().emit0("joinRoom", data)
                });
        }
        else {
            console.log("Impossible de se connecter à la room " + room.get_roomCode())
        }


        
    }

    //Connect to game
    connectToGame() {
        funct.waitFor(_ => this.get_wsGame().get_ready() === true) //Wait until ws is ready to send and wsRoom is already connected
            .then(_ => {
                //Send data to connect
                this.get_wsGame().emit("joinGame", this.room.get_gameId(), this.get_room().get_roomCode(), this.get_userToken());
            });
    }

    disconnectToRoom() {
        this.get_wsGame().connection.close()
        this.get_wsRoom().connection.close()
    }

    /* Game */

    playWithPlayStyle(foundWordArray) {
        switch (this.playStyle.toLowerCase()) {
            case 'human':
                var word = this.get_room().getWordWithHighOccurrence(foundWordArray)
                if (word != null) {
                    this.simulateWord(word, this.get_wpm(), this.get_wordErrorPercentage())
                }
                break
            case 'bot':
                var word = foundWordArray[Math.floor(Math.random() * foundWordArray.length)]
                console.log(word.word)
                this.get_wsGame().emit("setWord", word.word, true);
                break
        }
    }


    //Simulate word
    async simulateWord(word, WPM, errorPercentage, index = 0) { // Simulate human word

        if (word.length > 15) { //If word is long, short a little bit the WPM
            WPM = WPM * 0.8
        }

        var syllableOccurrence = await this.get_database().getSyllableOccurence("fr", this.get_room().game.get_syllable())

        var letterDelay = (this.wpmTimer / WPM)
        var error = Math.random()

        if (index == 0) { //Wait when round start
            var min = -0.00018 * Math.pow(WPM, 3) + 0.0883358543417 * Math.pow(WPM, 2) - 15.2076554622 * WPM + 1843.42296919
            var max = -0.00018 * Math.pow(WPM, 3) + 0.101378571429 * Math.pow(WPM, 2) - 19.9529285714 * WPM + 2089.57142857
            if (syllableOccurrence < 20) {
                var waitSec = Math.floor(Math.random() * (max * 0.7 - min * 0.5 + 1) + min * 0.5)
            }
            else {
                var waitSec = Math.floor(Math.random() * (max - min + 1) + min)
            }
            await funct.sleep(Math.floor(waitSec));
        }

        if (error <= errorPercentage) {
            //Enter incorrect word
            if (Math.floor(Math.random()) > 0.5) { this.simulateIncorrectWord(word, WPM, index, letterDelay) }
            //Write incorrect word, but realised it, erase and write correct word
            else { this.simulateIncorrectWord(word, WPM, index, letterDelay) }
        }
        //Enter correct word
        else { this.simulateCorrectWord(word, WPM, index, letterDelay) }
    }

    //Simulate correcte word
    async simulateCorrectWord(word, WPM, index = 0, letterDelay) {

        var previousLetter = word.slice(index - 1, index)
        var currentLetter = word.slice(index, index + 1)
        var wordSinceStart = word.slice(0, index + 1)

        if (index > -1) {
            //If key is close to previous key speed up WPM
            if (funct.getCloseLetter(currentLetter).includes(previousLetter)) { var newLetterDelay = Math.floor(Math.random() * (letterDelay * 1.5 - letterDelay + 1) + letterDelay) }
            else { var newLetterDelay = Math.floor(Math.random() * (letterDelay - letterDelay * 0.35 + 1) + letterDelay * 0.35) }
        }

        this.get_wsGame().emit("setWord", wordSinceStart, index === word.length - 1);
        index++;
        if (index < word.length && this.isPlaying) {
            setTimeout(() => {
                this.simulateCorrectWord(word, WPM, index, letterDelay); //recursive function to emit the new letter
            }, newLetterDelay);
        }
    }

    //Simulate incorrecte word
    async simulateIncorrectWord(word, WPM, index = 0, letterDelay) { //Enter incorrect word

        var previousLetter = word.slice(index - 1, index)
        var currentLetter = word.slice(index, index + 1)
        var wordSinceStart = word.slice(0, index + 1)

        if (index == 0) {
            let indexesToChange = [];
            let maxIndexes = Math.floor(Math.random() * 2) + 1; // max letters change is 3
            for (let i = 0; i < maxIndexes; i++) {
                let randomIndex = Math.floor(Math.random() * word.length);
                indexesToChange.push(randomIndex);
            }
            for (let i = 0; i < indexesToChange.length; i++) {
                let index = indexesToChange[i];
                var closeLetters = funct.getCloseLetter(word[index])
                var randomIndex = Math.floor(Math.random() * closeLetters.length);
                var similarLetter = closeLetters[randomIndex];
                var newWord = word.substr(0, index) + similarLetter + word.substr(index + 1);
            }
            word = newWord
        }

        if (index > -1) {
            //If key is close to previous key speed up WPM
            if (funct.getCloseLetter(currentLetter).includes(previousLetter)) { var newLetterDelay = Math.floor(Math.random() * (letterDelay * 1.5 - letterDelay + 1) + letterDelay) }
            else { var newLetterDelay = Math.floor(Math.random() * (letterDelay - letterDelay * 0.35 + 1) + letterDelay * 0.35) }
        }

        this.get_wsGame().emit("setWord", wordSinceStart, index === word.length - 1);
        index++;
        if (index < word.length && this.isPlaying) {
            setTimeout(() => {
                this.simulateIncorrectWord(word, WPM, index, letterDelay); //recursive function to emit the new letter
            }, newLetterDelay);
        }
    }

    async simulateIncorrectWord2(word, WPM, index = 0) { //Write incorrect word but erase it and enter correct word
        console.log("simulateIncorrectWord2")
    }

    //Copy image player
    async copyImagePlayer(player) {
        this.auth = null
        if (player.picture != null || player.picture != "") { this.picture = player.picture } else { this.picture = null }
        this.nickname = player.nickname
        await this.get_wsGame().connection.close()
        await this.get_wsRoom().connection.close()
        this.wsRoom = new RoomSocket("RoomSocket", false, false, this.get_room().get_roomLink() + '/socket.io/?EIO=4&transport=websocket')
        this.wsRoom.set_bot(this)
        this.connectToRoom(this.get_room())

    }

    /* Chat */
    sendGameMessage(message) {

        if (this.get_wsRoom() != null) {
            this.get_wsRoom().emit("chat", message)
        }
    }
}

//Export the class
module.exports = Bot;