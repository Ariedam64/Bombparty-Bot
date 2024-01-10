const Player = require('../Player/Player.js');
const funct = require('../../Misc/Functions')
const RoomSocket = require('../../Socket/Sockets/RoomSocket.js');
const Database = require('../../BD/dataBase')
const api = require('../API/jklmAPI.js')
const AI = require('../Bot/AI.js')

const pic = "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"

class Bot extends Player {

    constructor(nickname = "Mayaya", picture = pic, auth = null, language = "fr-FR") {

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
        this.playStyle = "human"
        this.isAutoJoin = true
        this.isPlaying = false
        this.isSuicide = false
        this.isRanked = false
        this.isTimerExpired = false
        this.timerRanked = null
        this.startRoundRanked = null
        this.rankedPlayer = null
        this.wpmTimer = 16300
        this.wpm = 120
        this.wordErrorPercentage = 0.08


        this.initAI(this.nickname)
        this.isAI = false
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
    get_isAi() {return this.isAI }

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
    set_isAi(newIsAI) { this.isAI = newIsAI }

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

        this.wsRoom = new RoomSocket("RoomSocket", this, false, false, webSocketLink + '/socket.io/?EIO=4&transport=websocket')

        this.room = room;
        this.room.set_roomLink(webSocketLink)
            funct.waitFor(_ => this.get_wsRoom().get_ready() === true) //Wait until ws is ready to send
            funct.waitFor(_ => this.get_wsRoom().get_ready() === true) //Wait until ws is ready to send
                .then(_ => {
                    //Make the data
                    
                    var data = {
                        "language": this.get_language(),
                        "nickname": this.get_nickname(),
                        "roomCode": this.get_room().get_roomCode(),
                        "token": "03AFcWeA5kRxJ8Mt7xPE6q0_W98ONUBvnA3184LilrO_xitBR2n6lGLGiRnRjyZskaYJtDb5NOspxoIxDLMTeL3mBULYg5P2dDWm_CHYAy4ib-3HNwFD-8K_tRCdslPJsLJWPIg6UoCUpHZe7VOileE2zpNSs8llHX_k_zAGCkKh-P13bEqe85hNSMZhQxuOEUudhfkCWi3gEZ58XSzfudsbSqCtNqwcv92BI6xOb2CutxINl-J9_F_HGdcN0xuXr-1qPz96mCcXQky0a-ytU5bHMGI5VbJ0SYFjddH6-olZPND-n0KJLRJ3ZIc8zDubwoi9_27kCkTF8J0POcy_vvlQ2c8xYBnrKEpZTU5Yyl8tV7J5CzAkfMb1PHWJaWbiF_TrbcHveP2EaQLud_XRSbiN38a94WsfkqcalBnZId8xh5GghEbEGkJSDEjlO5QNj_scvlhrlqP3A03AYA7vEp2MaAh9PlRmCL8IlvNEI7t2OC14DhwfR0Z356u78DnxwDVEQnTk7jmJlfae9s8uEbwsp5EmRCgc2R6Q",
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
                var word = this.get_room().getWordWithHighOccurrence(foundWordArray);
                if (word != null) {
                    const targetLength = 30;
                    while (word.length < targetLength) {
                        const randomIndex = Math.floor(Math.random() * funct.chars.length);
                        const randomChar = funct.chars[randomIndex];
                        const randomPosition = Math.floor(Math.random() * (word.length - 1)) + 1;
                        word = word.slice(0, randomPosition) + randomChar + word.slice(randomPosition);
                    }
                    word = word.slice(0, targetLength); // Truncate the word if it exceeds 30 characters
                    this.get_wsGame().emit("setWord", word, true);
                }
                break;
        }
    }

    // Simulate word
    async simulateWord(word, WPM, errorPercentage, index = 0) {
        if (word.length > 15) {
            WPM *= 0.8; // If word is long, shorten the WPM
        }

        const syllableOccurrence = await this.get_database().getSyllableOccurence("fr", this.get_room().game.get_syllable());
        const letterDelay = this.wpmTimer / WPM;
        const error = Math.random();

        // Wait when the round starts
        if (index === 0) {
            const min = -0.00018 * Math.pow(WPM, 3) + 0.0883358543417 * Math.pow(WPM, 2) - 15.2076554622 * WPM + 1843.42296919;
            const max = -0.00018 * Math.pow(WPM, 3) + 0.101378571429 * Math.pow(WPM, 2) - 19.9529285714 * WPM + 2089.57142857;
            const waitSec = Math.floor(Math.random() * ((syllableOccurrence < 20 ? (max * 0.7 - min * 0.5) : (max - min)) + 1) + (syllableOccurrence < 20 ? min * 0.5 : min));
            console.log("start wait " + waitSec + "ms")
            await funct.sleep(waitSec*0.8);
            console.log("stop wait")
        }

        if (error <= errorPercentage) {
            console.log("simulate incorrect")
            this.simulateIncorrectWord(word, 0, letterDelay);
        } else {
            console.log("simulate correct")
            this.simulateCorrectWord(word, 0, letterDelay);
        }
    }

    // Simulate correct word
    async simulateCorrectWord(word, index = 0, letterDelay) {
        while (index < word.length && this.isPlaying) {
            const previousLetter = word.slice(index - 1, index);
            const currentLetter = word.slice(index, index + 1);
            const wordSinceStart = word.slice(0, index + 1);

            if (index > -1) {
                const newLetterDelay = funct.getCloseLetter(currentLetter).includes(previousLetter) ?
                    Math.floor(Math.random() * (letterDelay * 1.5 - letterDelay + 1) + letterDelay) :
                    Math.floor(Math.random() * (letterDelay - letterDelay * 0.35 + 1) + letterDelay * 0.35);

                this.get_wsGame().emit("setWord", wordSinceStart, index === word.length - 1);
                index++;
                await funct.sleep(newLetterDelay);
            }
        }
    }

    // Simulate incorrect word
    async simulateIncorrectWord(word, index = 0, letterDelay) {
        if (index === 0) {
            const indexesToChange = Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => Math.floor(Math.random() * word.length));
            for (const changeIndex of indexesToChange) {
                const closeLetters = funct.getCloseLetter(word[changeIndex]);
                const randomIndex = Math.floor(Math.random() * closeLetters.length);
                const similarLetter = closeLetters[randomIndex];
                word = word.substr(0, changeIndex) + similarLetter + word.substr(changeIndex + 1);
            }
        }

        while (index < word.length && this.isPlaying) {
            const previousLetter = word.slice(index - 1, index);
            const currentLetter = word.slice(index, index + 1);
            const wordSinceStart = word.slice(0, index + 1);

            if (index > -1) {
                const newLetterDelay = funct.getCloseLetter(currentLetter).includes(previousLetter) ?
                    Math.floor(Math.random() * (letterDelay * 1.5 - letterDelay + 1) + letterDelay) :
                    Math.floor(Math.random() * (letterDelay - letterDelay * 0.35 + 1) + letterDelay * 0.35);

                this.get_wsGame().emit("setWord", wordSinceStart, index === word.length - 1);
                index++;
                await funct.sleep(newLetterDelay);
            }
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
            this.sendGameMessage("La partie commencera dans 3 secondes")
            this.startRoundRanked = setTimeout(function () {
                this.get_wsGame().emit("startRoundNow")
            }.bind(this), 3000);      
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

    async initRealTime() {
        AI.initRealTime()
    }

    async initAI() {
        AI.initDocument()
    }

    /* Player ask bot */
    async asking(player, message) {

        var response = await AI.getResponseData(player, message)
        this.sendGameMessage(response)
    }

}

//Export the class
module.exports = Bot;