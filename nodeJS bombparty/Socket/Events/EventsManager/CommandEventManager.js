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
const track = require("../CommandsEvents/Player/tracker");
const reactionTime = require("../CommandsEvents/Player/reactionTime");
const playStyle = require("../CommandsEvents/Bot/playStyle");
const messages = require("../CommandsEvents/Player/messages");

function processEvent(data, bot, DEBUG) {

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
            searchMessage(arguments, bot)
            break;

        case 'rsm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            searchMessage(arguments, bot)
            break;

        /* PLAYER */

        //-- Bonus letters
        case 'bonusLetters':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            bonusLetters(arguments, bot)
            break;

        case 'pbl':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            bonusLetters(arguments, bot)
            break;

        //-- Messages
        case 'messages':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            messages(arguments, bot)
            break;

        case 'pm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            messages(arguments, bot)
            break;

        //-- Nationnality
        case 'natinnality':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            nationality(arguments, bot)
            break;

        case 'pn':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            nationality(arguments, bot)
            break;

        //-- Reaction time
        case 'reactionTime':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            reactionTime(arguments, bot)
            break;

        case 'prt':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            reactionTime(arguments, bot)
            break;

        //-- Track
        case 'track':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            track(arguments, bot)
            break;

        case 'pt':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            track(arguments, bot)
            break;

        /* DATABASE */

        //-- Total syllables
        case 'totalSyllables':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalSyllables(arguments, bot)
            break;

        case 'dts':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalSyllables(arguments, bot)
            break;

        //-- Total words
        case 'totalWords':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalWords(arguments, bot)
            break;

        case 'dtw':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalWords(arguments, bot)
            break;

        //-- Occurrence syllable
        case 'occurrenceSyllable':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceSyllable(arguments, bot)
            break;

        case 'dos':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceSyllable(arguments, bot)
            break;

        //-- Occurrence word
        case 'occurrenceWord':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceWord(arguments, bot)
            break;

        case 'dow':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurrenceWord(arguments, bot)
            break;

        /* BOT */

        //-- Word error
        case 'wordError':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordError(arguments, bot)
            break;

        case 'bwe':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordError(arguments, bot)
            break;

        //-- AutoJoin
        case 'autoJoin':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            autoJoin(arguments, bot)
            break;

        case 'baj':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            autoJoin(arguments, bot)
            break;

        //-- PlayStyle
        case 'playStyle':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playStyle(arguments, bot)
            break;

        case 'bps':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playStyle(arguments, bot)
            break;

        //-- Copy profile
        case 'copyProfile':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            copyPlayer(arguments, bot)
            break;

        case 'bcp':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            copyPlayer(arguments, bot)
            break;

        //-- Suicide
        case 'suicide':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            suicide(arguments, bot)
            break;

        case 'bs':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            suicide(arguments, bot)
            break;

        //-- Words per minute
        case 'wordsPerMinute':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordsPerMinute(arguments, bot)
            break;

        case 'bwpm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordsPerMinute(arguments, bot)
            break;

        /* HELP */
        case 'help':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            help(arguments, bot)
            break;

        default:
            if (DEBUG) { console.log("Command event: " + event + " ERROR") }
            bot.sendGameMessage('La commande: "' + event + '" n\'existe pas. Faites "$help" pour voir la liste des commandes disponibles')
            break;
    }
}

//Export the module
module.exports = { processEvent };