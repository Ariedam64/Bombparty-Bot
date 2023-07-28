const Player = require('../Player/Player.js');
const funct = require('../../Misc/Functions')
const RoomSocket = require('../../Socket/Sockets/RoomSocket.js');
const Database = require('../../BD/dataBase')
const api = require('../API/jklmAPI.js')

class Bot extends Player {

    constructor(nickname = "Eyeye", picture = null, auth = null, language = "fr-FR") {

        super(); //Inherits class Player

        this.nickname = nickname;
        this.language = language;
        this.picture = picture;
        this.auth = auth;
        this.userToken = this.generateUserToken()
        this.recaptchaToken = null

        this.database = Database

        this.room = null;

        this.wsGame = null;
        this.wsRoom = null;

        this.creatorId = "128202956574162945"
        this.playerStaff = ["709512296036040817"]

        //Game state
        this.playStyle = "bot"
        this.isAutoJoin = false
        this.isPlaying = false
        this.isSuicide = false
        this.isRanked = false
        this.isTimerExpired = false
        this.timerRanked = null
        this.startRoundRanked = null
        this.rankedPlayer = null
        this.wpmTimer = 16300
        this.wpm = 130
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
    get_isRanked() { return this.isRanked }

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
    set_isRanked(newIsRanked) { this.isRanked = newIsRanked }

    /* FUNCTIONS */

    /* Global */
    generateUserToken() {
        var token = "";
        var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var charactersLength = characters.length;
        for (; token.length < 16; token += characters.charAt(Math.floor(Math.random() * charactersLength)));
        return token;
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
        this.recaptchaToken = await api.bypassAntiBotToken()

        this.wsRoom = new RoomSocket("RoomSocket", this, true, true, webSocketLink + '/socket.io/?EIO=4&transport=websocket')

            this.room = room;
            this.room.set_roomLink(webSocketLink)
            funct.waitFor(_ => this.get_wsRoom().get_ready() === true) //Wait until ws is ready to send
                .then(_ => {
                    //Make the data
                    var data = {
                        "language": this.get_language(),
                        "nickname": this.get_nickname(),
                        "roomCode": this.get_room().get_roomCode(),
                        "token": "03AAYGu2T4dv0bMmOE9v3msDLVD12zhpvpxu6kyZlXOsQc0uhupuvRXSeUxyaP0arD66-Y-G-o1aMukt9l-z6V42jVXYZwhJi9U3JDUullfyYShdTtD6-TPt2qe-76hI9rCgrW_ocFul8YrKqhcG94JFENy4nSCb1gMpg-hcc7xfgIjpLPn91kIKfZAVdGQWDQpsS2MTGPi448I8Zu6LoobvZQ0AbjiKOpvRXZfGBkrJMWl8XYVWDmU3sxmc7AAxf8WxrqUpjLen7h-bmnxXBOJbCSq8yyum4-lLi5wOLMMtJcWdbojf-Os2lys8G4dfcnIAcn8HF_WJhCAyLhYbAEI2dzpQ1obuPSqem6Aml5BkZCcbCltBdi_FLO4ZCkAj8tA3FlnbKDNSPC7I5PEV2ZlZr_nPKRKdmYMZfgLnVXYYBVkAAR0oyj3XxLXE9cVD8n4pk0QkuUsBFajroVHWPoRRp_ngLeQdpqDeipRL3b16VjjrBMHAzVXkwcFhOEfXbHPryCPQmZpWQfwzDN4JNGaG9ftzkpiUMmaw",
                        "userToken": this.get_userToken(),      
                    }
                    if (this.get_picture() != null) { data["picture"] = this.get_picture() }; //check if bot has pic
                    if (this.get_auth() != null) { data["auth"] = this.get_auth() }; //check if bot has auth (Discord/Twitch)

                    //Send data to connect   
                    this.get_wsRoom().emitCustom(0, "joinRoom", data)
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

    playWithPlayStyle(foundWordArray) {
        switch (this.playStyle) {
            case 'human':
                var word = this.get_room().getWordWithHighOccurrence(foundWordArray)
                if (word != null) {
                    this.simulateWord(word, this.get_wpm(), this.get_wordErrorPercentage())
                }
                break
            case 'bot':
                var word = foundWordArray[Math.floor(Math.random() * foundWordArray.length)]
                this.get_wsGame().emit("setWord", word.word, true);
                break
            case 'drunk':
                var word = this.get_room().getWordWithHighOccurrence(foundWordArray)
                if (word != null) {
                    for (let i = 0; i < Math.random() * (6 - 1) + 1; i++) {
                        const randomIndex = Math.floor(Math.random() * funct.chars.length); // on génère un index aléatoire
                        const randomChar = funct.chars[randomIndex]; // on récupère le caractère correspondant à cet index
                        const randomPosition = Math.floor(Math.random() * (word.length - 1)) + 1; // on génère une position aléatoire dans le mot (sauf la première position)
                        word = word.slice(0, randomPosition) + randomChar + word.slice(randomPosition); // on insère le caractère aléatoire à cette position
                    }
                    this.get_wsGame().emit("setWord", word, true);              
                }
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

    //Check ingamePlayer for ranked
    checkPlayersRanked() {

        if (this.get_room().game.totalPlayerInGame > 2) { // If there are more than 2 players, edit rules until he leaves
            this.sendGameMessage("Le mode classement se joue uniquement à 2 joueurs")
            this.get_wsGame().emit("setRulesLocked", false)
            if (this.startRoundRanked != null) { clearTimeout(this.startRoundRanked) }
        }
        else if (this.get_room().game.totalPlayerInGame == 2) { // If there are 2 players, start the game
            this.get_wsGame().emit("setRulesLocked", true)
            this.sendGameMessage("La partie commencera dans 5 secondes")
            this.startRoundRanked = setTimeout(function () {
                this.get_wsGame().emit("startRoundNow")
            }.bind(this), 5000);      
        }
        else {
            if (this.startRoundRanked != null) { clearTimeout(this.startRoundRanked) }
        }
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