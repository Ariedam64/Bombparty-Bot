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
        this.playerStaff = [this.creatorId]

        //Game state
        this.playStyle = "Human"
        this.isAutoJoin = false
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