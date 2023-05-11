const searchMessage = require("../CommandsEvents/Room/searchMessage");
const bonusLetters = require("../CommandsEvents/Player/bonusLetters");
const totalSyllables = require("../CommandsEvents/Database/totalSyl");
const totalWords = require("../CommandsEvents/Database/totalWords");
const suicide = require("../CommandsEvents/Bot/suicide");
const wordError = require("../CommandsEvents/Bot/wordError");
const autoJoin = require("../CommandsEvents/Bot/autoJoin");
const nationality = require("../CommandsEvents/Player/nationality");
const copyPlayer = require("../CommandsEvents/Bot/copyPlayer");
const help = require("../CommandsEvents/help");
const occurrenceSyllable = require("../CommandsEvents/Database/occurrenceSyllable");
const occurrenceWord = require("../CommandsEvents/Database/occurrenceWord");
const wordsPerMinute = require("../CommandsEvents/Bot/wordsPerMinute");
const reactionTime = require("../CommandsEvents/Player/reactionTime");
const playStyle = require("../CommandsEvents/Bot/playStyle");
const messages = require("../CommandsEvents/Player/messages");
const speed = require("../CommandsEvents/Player/speed");
const track = require("../CommandsEvents/Player/track");
const assistant = require("../CommandsEvents/Player/assistant");
const givePermission = require("../CommandsEvents/Player/givePermission");
const joinRoom = require("../CommandsEvents/Bot/joinRoom");
const generateToken = require("../CommandsEvents/Bot/generateToken.js");
const precision = require("../CommandsEvents/Player/precision");
const allPlayers = require("../CommandsEvents/Room/allPlayers");
const disconnect = require("../CommandsEvents/Room//disconnect");
const ranked = require("../CommandsEvents/Bot/ranked");

function processEvent(chatterPlayer, data, bot, DEBUG) {

    event = data.substring(1).split(' ')[0]
    arguments = data.split(' ')
    arguments.shift()
    arguments = arguments.join(" ")

    switch (event) {

        /* 
         * r: Room
         * g: Game
         * p: Player
         * b: Bot
         * d: Database
         * 
         */

        /* ROOM */

        //-- SEARCH MESSAGE
        case 'searchMessage':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            searchMessage(chatterPlayer, arguments, bot)
            break;

        case 'rsm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            searchMessage(chatterPlayer, arguments, bot)
            break;

        //-- ALL PLAYERS
        case 'allPlayers':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            allPlayers(chatterPlayer, arguments, bot)
            break;

        case 'rap':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            allPlayers(chatterPlayer, arguments, bot)
            break;

        //-- DISCONNECT
        case 'disconnect':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            disc(chatterPlayer, arguments, bot)
            break;

        case 'rd':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            disconnect(chatterPlayer, arguments, bot)
            break;

        /* PLAYER */

        //-- Bonus letters
        case 'bonusLetters':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            bonusLetters(chatterPlayer, arguments, bot)
            break;

        case 'pbl':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            bonusLetters(chatterPlayer, arguments, bot)
            break;

        //-- Messages
        case 'messages':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            messages(chatterPlayer, arguments, bot)
            break;

        case 'pm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            messages(chatterPlayer, arguments, bot)
            break;

        //-- Speed
        case 'speed':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            speed(chatterPlayer, arguments, bot)
            break;

        case 'ps':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            speed(chatterPlayer, arguments, bot)
            break;

        //-- Nationnality
        case 'natinnality':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            nationality(chatterPlayer, arguments, bot)
            break;

        case 'pn':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            nationality(chatterPlayer, arguments, bot)
            break;

        //-- Permission
        case 'givePermission':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            givePermission(chatterPlayer, arguments, bot)
            break;

        case 'pgp':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            givePermission(chatterPlayer, arguments, bot)
            break;

        //-- Reaction time
        case 'reactionTime':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            reactionTime(chatterPlayer, arguments, bot)
            break;

        case 'prt':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            reactionTime(chatterPlayer, arguments, bot)
            break;

        //-- Precision
        case 'precision':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            precision(chatterPlayer, arguments, bot)
            break;

        case 'pp':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            precision(chatterPlayer, arguments, bot)
            break;

        //-- Tracker
        case 'track':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            track(chatterPlayer, arguments, bot)
            break;

        case 'pt':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            track(chatterPlayer, arguments, bot)
            break;

        //-- Assistant
        case 'assistant':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            assistant(chatterPlayer, arguments, bot)
            break;

        case 'pa':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            assistant(chatterPlayer, arguments, bot)
            break;

        /* DATABASE */

        //-- Total syllables
        case 'totalSyllables':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalSyllables(chatterPlayer, arguments, bot)
            break;

        case 'dts':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalSyllables(chatterPlayer, arguments, bot)
            break;

        //-- Total words
        case 'totalWords':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalWords(chatterPlayer, arguments, bot)
            break;

        case 'dtw':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalWords(chatterPlayer, arguments, bot)
            break;

        //-- Occurrence syllable
        case 'occurrenceSyllable':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceSyllable(chatterPlayer, arguments, bot)
            break;

        case 'dos':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceSyllable(chatterPlayer, arguments, bot)
            break;

        //-- Occurrence word
        case 'occurrenceWord':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceWord(chatterPlayer, arguments, bot)
            break;

        case 'dow':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceWord(chatterPlayer, arguments, bot)
            break;

        /* BOT */

        //-- Word error
        case 'wordError':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordError(chatterPlayer, arguments, bot)
            break;

        case 'bwe':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordError(chatterPlayer, arguments, bot)
            break;

        //-- joinRoom
        case 'joinRoom':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            joinRoom(chatterPlayer, arguments, bot)
            break;

        case 'bjr':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            joinRoom(chatterPlayer, arguments, bot)
            break;

        //-- AutoJoin
        case 'autoJoin':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            autoJoin(chatterPlayer, arguments, bot)
            break;

        case 'baj':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            autoJoin(chatterPlayer, arguments, bot)
            break;

        //-- GENERATE TOKEN
        case 'generateToken':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            generateToken(chatterPlayer, arguments, bot)
            break;

        case 'bgt':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            generateToken(chatterPlayer, arguments, bot)
            break;

        //-- PlayStyle
        case 'playStyle':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playStyle(chatterPlayer, arguments, bot)
            break;

        case 'bps':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playStyle(chatterPlayer, arguments, bot)
            break;

        //-- Copy profile
        case 'copyProfile':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            copyPlayer(chatterPlayer, arguments, bot)
            break;

        case 'bcp':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            copyPlayer(chatterPlayer, arguments, bot)
            break;

        //-- Ranked
        case 'ranked':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            ranked(chatterPlayer, arguments, bot)
            break;

        case 'br':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            ranked(chatterPlayer, arguments, bot)
            break;

        //-- Suicide
        case 'suicide':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            suicide(chatterPlayer, arguments, bot)
            break;

        case 'bs':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            suicide(chatterPlayer, arguments, bot)
            break;

        //-- Words per minute
        case 'wordsPerMinute':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordsPerMinute(chatterPlayer, arguments, bot)
            break;

        case 'bwpm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordsPerMinute(chatterPlayer, arguments, bot)
            break;

        /* HELP */
        case 'help':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            help(chatterPlayer, arguments, bot)
            break;

        default:
            if (DEBUG) { console.log("Command event: " + event + " ERROR") }
            bot.sendGameMessage('La commande: "' + event + '" n\'existe pas. Faites "$help" pour voir la liste des commandes disponibles')
            break;
    }
}

//Export the module
module.exports = { processEvent };