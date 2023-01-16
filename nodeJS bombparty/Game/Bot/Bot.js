const Player = require('../Player/Player.js');
const funct = require('../../Misc/Functions')
const RoomSocket = require('../../Socket/Sockets/RoomSocket.js');
const Database = require('../../BD/dataBase')
const jschardet = require('jschardet');
const iconv = require('iconv-lite');
const StringDecoder = require('string_decoder').StringDecoder;

class Bot extends Player{

    constructor(nickname = "Bot", picture = null, auth = null, language = "fr-FR") {

        super(); //Inherits class Player

        this.nickname = nickname;
        this.language = language;
        this.picture = picture;
        this.auth = auth;
        this.userToken = this.generateUserToken()

        this.database = Database
        this.room = null;
        this.wsGame = null;

        this.wsRoom = new RoomSocket("RoomSocket", false, false);
        this.wsRoom.set_bot(this)

        //Game state
        this.isAutoJoin = false
        this.isPlaying = false
        this.isSuicide = false
        this.wpm = 110
        this.wordErrorPercentage = 0.05
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
    connectToRoom(room) {
        this.room = room;
        funct.waitFor(_ => this.get_wsRoom().get_ready() === true) //Wait until ws is ready to send
            .then(_ => {
                //Make the data
                var data = {
                    "nickname": this.get_nickname(),
                    "language": this.get_language(),
                    "roomCode": this.get_room().get_roomCode(),
                    "userToken": this.get_userToken()
                }
                if (this.get_picture() != null) { data["picture"] = this.get_picture() }; //check if bot has pic
                if (this.get_auth() != null) { data["auth"] = this.get_auth() }; //check if bot has auth (Discord/Twitch)

                //Send data to connect
                this.get_wsRoom().emit0("joinRoom", data);
            });
    }

    //Connect to game
    connectToGame() {
        funct.waitFor(_ => this.get_wsGame().get_ready() === true) //Wait until ws is ready to send and wsRoom is already connected
            .then(_ => {
                //Send data to connect
                this.get_wsGame().emit("joinGame", this.room.get_gameId(), this.get_room().get_roomCode(), this.get_userToken());
            });
    }

    /* Game */

    async simulateWord(word, WPM, errorPercentage, index = 0) { // Simulate human word

        if (word.length > 15) { //If word is long, short a little bit the WPM
            WPM = WPM * 0.7
        }

        var letterDelay = (12000 / WPM)
        var error = Math.random()
        if (index == 0) { //Wait when round start
            var waitSec = Math.floor(Math.random() * (Math.floor(1200) - Math.ceil(400)) + Math.ceil(400))
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

    async simulateCorrectWord(word, WPM, index = 0, letterDelay) {      

        var previousLetter = word.slice(index-1, index )
        var currentLetter = word.slice(index, index + 1)
        var wordSinceStart = word.slice(0, index + 1)
        
        if (index > 1) {
            //If key is close to previous key speed up WPM
            if (funct.getCloseLetter(currentLetter).includes(previousLetter)) { letterDelay = (12000 / (WPM * 1.4)); }
        }

        this.get_wsGame().emit("setWord", wordSinceStart, index === word.length - 1);
        index++;
        if (index < word.length && this.get_isPlaying()) {
            setTimeout(() => {
                this.simulateCorrectWord(word, WPM, index, letterDelay); //recursive function to emit the new letter
            }, letterDelay);
        }
    }

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

        if (index > 1) {
            //If key is close to previous key speed up WPM
            if (funct.getCloseLetter(currentLetter).includes(previousLetter)) { letterDelay = (12000 / (WPM * 1.4)); }
        }

        this.get_wsGame().emit("setWord", wordSinceStart, index === word.length - 1);
        index++;
        if (index < word.length && this.get_isPlaying()) {
            setTimeout(() => {
                this.simulateIncorrectWord(word, WPM, index, letterDelay); //recursive function to emit the new letter
            }, letterDelay);
        }       
    }

    async simulateIncorrectWord2(word, WPM, index = 0) { //Write incorrect word but erase it and enter correct word
        console.log("simulateIncorrectWord2")
    }

    async copyImagePlayer(player) {
        this.auth = null
        if (player.picture != null || player.picture != "") { this.picture = player.picture } else { this.picture = null }
        this.nickname = player.nickname
        await this.get_wsGame().connection.close()
        await this.get_wsRoom().connection.close()
        this.wsRoom = new RoomSocket("RoomSocket", false, false)
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