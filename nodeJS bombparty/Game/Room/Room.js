const Configuration = require('./Modules/Configuration.js');
const Game = require('./Modules/Game.js');
const Rules = require('./Modules/Rules.js');
const Player = require('../Player/Player.js')
const funct = require('../../Misc/Functions.js')

class Room {

    constructor(roomCode, gameId, roomName, language, playerCount, isPublic, chatMode) {

        //Global information   
        this.language = language;
        this.chatMode = chatMode;
        this.isPublic = isPublic;
        this.playerCount = playerCount;
        this.roomCode = roomCode;
        this.gameId = gameId;
        this.roomName = roomName;
        this.roomLink = null

        this.leaderPeerId = null;
        this.bonusAlphabet = null;
        this.lastPeerId = null;

        this.configuration = new Configuration() //Configuration Object
        this.game = new Game() //Ingame Object
        this.rules = new Rules() //Rules Object

        this.bot = null //Bot Object
        this.players = []; //List players objects
        this.chatMessages = [] //List ChatMessages objects

        this.maxChatMessage = 1000

        this.lastPlayerJoined = null
        this.lastPlayerLeft = null

    }

    /* GETTERS */
    get_roomCode() { return this.roomCode };
    get_gameId() { return this.gameId };
    get_roomName() { return this.roomName };
    get_language() { return this.language };
    get_playerCount() { return this.playerCount };
    get_isPublic() { return this.isPublic };
    get_chatMode() { return this.chatMode };
    get_bot() { return this.bot };
    get_leaderPeerId() { return this.leaderPeerId };
    get_bonusAlphabet() { return this.bonusAlphabet };
    get_players() { return this.players };
    get_lastPlayerJoined() { return this.lastPlayerJoined };
    get_lastPlayerLeft() { return this.lastPlayerLeft };
    get_maxChatMessage() { return this.maxChatMessage };
    get_chatMessages() { return this.chatMessages };
    get_roomLink() { return this.roomLink }



    /* SETTERS */
    set_roomCode(newRoomCode) { this.roomCode = newRoomCode };
    set_gameId(newGameId) { this.gameId = newGameId };
    set_roomName(newRoomName) { this.roomName = newRoomName };
    set_language(newLanguage) { this.language = newLanguage };
    set_playerCount(newPlayerCount) { this.playerCount = newPlayerCount };
    set_isPublic(newIsPublic) { this.isPublic = newIsPublic };
    set_chatMode(newChatMode) { this.chatMode = newChatMode };
    set_bot(newBot) { this.bot = newBot };
    set_leaderPeerId(newLeaderPeerId) { this.leaderPeerId = newLeaderPeerId };
    set_bonusAlphabet(newBonusAlphabet) { this.bonusAlphabet = newBonusAlphabet };
    set_players(newPlayers) { this.players = newPlayers };
    set_lastPlayerJoined(newLastPlayerJoined) { this.lastPlayerJoined = newLastPlayerJoined };
    set_lastPlayerLeft(newLastPlayerLeft) { this.lastPlayerLeft = newLastPlayerLeft };
    set_maxChatMessage(newMaxChatMessage) { this.maxChatMessage = newMaxChatMessage }
    set_chatMessages(newChatMessages) { this.chatMessages = newChatMessages };
    set_roomLink(newRoomLink) { this.roomLink = newRoomLink }
    


    /* FUNCTIONS */
    _toString() {
        console.log(
            "Global Information:" + "\n" +
            "roomCode: " + this.get_roomCode() + "\n" +
            "gameId: " + this.get_gameId() + "\n" +
            "roomName: " + this.get_roomName() + "\n" +
            "language: " + this.get_language() + "\n" +
            "playerCount: " + this.get_playerCount() + "\n" +
            "chatMode: " + this.get_chatMode() + "\n" +
            "isPublic: " + this.get_isPublic() + "\n" +
            "bonusAlphabet: " + this.get_bonusAlphabet() + "\n" +
            "leaderPeerId: " + this.get_leaderPeerId()
        )
    }

    /* Room functions */

    setup(jsonData) {
        this.set_leaderPeerId(jsonData[1].leaderPeerId)
        this.set_bonusAlphabet(jsonData[1].milestone.dictionaryManifest.bonusAlphabet)

        this.configuration.setup(jsonData)
        this.rules.setup(jsonData)
    }

    updateGlobalInformation(jsonData) {
        this.set_chatMode(jsonData[0].roomEntry.chatMode)
        this.set_language(jsonData[0].roomEntry.details)
        this.set_gameId(jsonData[0].roomEntry.gameId)
        this.set_isPublic(jsonData[0].roomEntry.isPublic)
        this.set_roomName(jsonData[0].roomEntry.name)
        this.set_playerCount(jsonData[0].roomEntry.playerCount)
    }

    getWordWithHighOccurrence(wordsArray) {
        var newWordsArray = funct.removeSameElements(wordsArray, this.game.get_usedWords())
        if (newWordsArray.length != 0) {
            let maxOccurrenceElement = newWordsArray.reduce(function (prev, current) {
                return (prev.occurrence > current.occurrence) ? prev : current
            });
            return(maxOccurrenceElement.word);
        }
    }

    getWordWithLowOccurrence(wordsArray) {
        var newWordsArray = funct.removeSameElements(wordsArray, this.game.get_usedWords())
        if (newWordsArray.length != 0) {
            let minOccurrence = Math.min.apply(Math, newWordsArray.map(function (o) { return o.occurrence; }));
            let minOccurrenceElement = newWordsArray.find(function (o) { return o.occurrence == minOccurrence });
            return (minOccurrenceElement.word);
        }
    }

    getDatabaseLanguage() {
        var table = null

        switch (this.language) {
            case 'French':
                table = "fr"
                break;
            case 'English':
                table = "en"
                break;
            case 'Spanish':
                table = "es"
                break
            case 'Brazilian Portuguese':
                table = "pt"
                break;
            case 'German':
                table = "de"
                break;
            case 'Italian':
                table = "it"
                break;

        }
        return table
    }

    /* Chat functions */

    appendMessageToChat(playerPeerId,nickname, message) {
        if (this.get_chatMessages().length == this.get_maxChatMessage()) {
            this.get_chatMessages().shift()
        }
        this.get_chatMessages().push({ playerPeerId, nickname, message })
    }

    searchMessage(messageContains, botNickname) {
        var listMessagesFound = []
        for (const chatMessage of this.get_chatMessages()) {
            if (chatMessage.message.get_message().includes(messageContains) && (!(chatMessage.message.get_message().includes("$searchMessage"))) && (!(chatMessage.message.get_message().includes("$rsm")))  && chatMessage.nickname != botNickname) {
                var stringMessage = (chatMessage.message.get_postedTime() + " " + chatMessage.nickname + ": " + chatMessage.message.get_message())
                listMessagesFound.push(stringMessage)
            }
        }
        return listMessagesFound
    }

    /* Players functions */

    setupPlayerList(jsonData) {
        for (const player of jsonData) {this.addPlayer(player)}    
    }

    getPlayerByPeerId(peerId) {
        for (const player of this.players) {
            if (player.get_peerId() == peerId) {return player}
        }  
        return false
    }

    getPlayerByPeerIdWithArray(array, peerId) {
        for (const player of array) {
            if (player.peerId == peerId) {return player}
        }
        return false
    }

    getPlayerByAuth(authUsername) {
        for (const player of this.players) {
            if (player.auth != null) {
                if (player.auth.username == authUsername) { return player }
            }
        }
        return false
    }

    getPlayerByNickname(nickname) {
        var playerFound = []
        for (const player of this.players) {
            if (player.get_nickname() == nickname) {playerFound.push(player)}
        }
        return playerFound
    }

    existPlayer(peerId) {
        for (const player of this.players) {
            if (player.peerId == peerId) { return true }
            else { return false }
        }
    }

    deletePlayer(peerId) {
        for (const player of this.players) {
            if (player.peerId == peerId) {
                var indexPlayerToDelete = this.players.indexOf(player)
                if (indexPlayerToDelete > -1) { //If found
                    this.players.splice(indexPlayerToDelete, 1)
                    return true
                } 
            }
        }
        return false
    }

    addPlayer(player) {
        var playerToAdd = new Player(player.peerId, player.nickname, null, player.language, null, player.roles, null) //create Player object
        if (player.picture != null) { playerToAdd.set_picture(player.picture) } //check if player has picture
        if (player.auth != null) { playerToAdd.set_auth(player.auth) } //check if player has auth (Discord/Twitch)
        this.players.push(playerToAdd) //Add player to list
    }

    makePlayerListFromData(jsonData) {
        var arrayPlayers = []
        for (const player of jsonData) {
            var playerToAdd = new Player(player.peerId, player.nickname, null, player.language, null, player.roles, null)
            if (player.picture != null) { playerToAdd.set_picture(player.picture) } 
            if (player.auth != null) { playerToAdd.set_auth(player.auth) }
            arrayPlayers.push(playerToAdd)
        }
        return arrayPlayers
    }

}

//Export the class
module.exports = Room;