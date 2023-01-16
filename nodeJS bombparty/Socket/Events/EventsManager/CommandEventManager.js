const searchMessage = require("../CommandsEvents/Room/searchMessage");
const playerBL = require("../CommandsEvents/Player/playerBL");
const totalSyllables = require("../CommandsEvents/Database/totalSyl");
const totalWords = require("../CommandsEvents/Database/totalWords");
const occurSyl = require("../CommandsEvents/Database/occurSyl");
const occurWord = require("../CommandsEvents/Database/occurWord");
const wpm = require("../CommandsEvents/Game/wpm");
const query = require("../CommandsEvents/Database/query");
const suicide = require("../CommandsEvents/Game/suicide");
const wordError = require("../CommandsEvents/Game/wordError");
const autoJoin = require("../CommandsEvents/Game/autoJoin");
const playerNat = require("../CommandsEvents/Player/playerNat");
const playerCpPic = require("../CommandsEvents/Player/playerCpPic");

function processEvent(data, bot, DEBUG) {

    event = data.substring(1).split(' ')[0]
    arguments = data.split(' ')
    arguments.shift()
    arguments = arguments.join(" ")

    switch (event) {

        case 'searchMessage':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            searchMessage(arguments, bot)
            break;

        case 'pbl':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playerBL(arguments, bot)
            break;

        case 'pnat':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playerNat(arguments, bot)
            break;

        case 'pcp':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            playerCpPic(arguments, bot)
            break;

        case 'totalSyllabes':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalSyllables(arguments, bot)
            break;

        case 'totalWords':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            totalWords(arguments, bot)
            break;

        case 'occurSyl':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurSyl(arguments, bot)
            break;

        case 'occurWord':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            occurWord(arguments, bot)
            break;

        case 'autoJoin':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            autoJoin(arguments, bot)
            break;


        case 'wpm':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wpm(arguments, bot)
            break;

        case 'query':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            query(arguments, bot)
            break;

        case 'suicide':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            suicide(arguments, bot)
            break;
            wordError

        case 'wordError':
            if (DEBUG) { console.log("Command event: " + event + " OK") }
            wordError(arguments, bot)
            break;

        default:
            if (DEBUG) { console.log("Command event: " + event + " ERROR") }
            bot.sendGameMessage('La commande: "' + event + '" n\'existe pas')
            break;
    }
}

//Export the module
module.exports = { processEvent };