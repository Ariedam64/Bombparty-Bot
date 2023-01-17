const addPlayer = require('../GameEvents/addPlayer');
const clearUsedWords = require('../GameEvents/clearUsedWords');
const correctWord = require('../GameEvents/Player/correctWord');
const failWord = require('../GameEvents/Player/failWord');
const happyBirthday = require('../GameEvents/happyBirthday');
const joinGame = require('../GameEvents/joinGame');
const livesLost = require('../GameEvents/Player/livesLost');
const nextTurn = require('../GameEvents/nextTurn');
const removePlayer = require('../GameEvents/removePlayer');
const setMilestone = require('../GameEvents/setMilestone');
const setPlayerWord = require('../GameEvents/Player/setPlayerWord');
const setRules = require('../GameEvents/setRules');
const setRulesLocked = require('../GameEvents/setRulesLocked');
const setStartTime = require('../GameEvents/setStartTime');
const setup = require('../GameEvents/setup');
const updatePlayer = require('../GameEvents/Player/updatePlayer');
const bonusAlphabetCompleted = require('../GameEvents/Player/bonusAlphabetCompleted');
const connectionEtablished = require('../GameEvents/Socket/connectionEtablished');

function processEvent(data, bot, DEBUG) {

    var event = ""

    if (data.toString().indexOf("[") != -1) {

        var jsonData = JSON.parse(data.toString().substring(data.toString().indexOf("[")))
        event = jsonData[0]

    }
    else {
        event = data.slice(0, data.toString().indexOf("{")) // wsConnected event
        if (event == "40") {
            event = "connectionEtablished"
            var jsonData = JSON.parse(data.toString().substring(data.toString().indexOf("{")))
        }
    }

    switch (event) {

        case 'joinGame':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            //addPlayer(jsonData, bot)
            break;

        case 'addPlayer':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            addPlayer(jsonData, bot)
            break;

        case 'bonusAlphabetCompleted':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            bonusAlphabetCompleted(jsonData, bot)
            break;

        case 'clearUsedWords':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            clearUsedWords(jsonData, bot)
            break;

        case 'connectionEtablished':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            connectionEtablished(jsonData, bot)
            break;

        case 'correctWord':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            correctWord(jsonData, bot)
            break;

        case 'failWord':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            failWord(jsonData, bot)
            break;

        case 'happyBirthday':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            happyBirthday(jsonData, bot)
            break;

        case 'joinGame':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            joinGame(jsonData, bot)
            break;

        case 'livesLost':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            livesLost(jsonData, bot)
            break;

        case 'nextTurn':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            nextTurn(jsonData, bot)
            break;

        case 'removePlayer':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            removePlayer(jsonData, bot)
            break;

        case 'setMilestone':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            setMilestone(jsonData, bot)        
            break;

        case 'setPlayerWord':
            if (DEBUG) { console.log("Rooom event: " + event + " OK") }
            setPlayerWord(jsonData, bot)
            break;

        case 'setRules':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            setRules(jsonData, bot)
            break;

        case 'setRulesLocked':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            setRulesLocked(jsonData, bot)
            break;

        case 'setStartTime':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            setStartTime(jsonData, bot)
            break;

        case 'setup':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            setup(jsonData, bot)
            break;

        case 'updatePlayer':
            if (DEBUG) { console.log("Game event: " + event + " OK") }
            updatePlayer(jsonData, bot)
            break;

        default:
            if (DEBUG) { console.log("Game event: " + event + " ERROR") }
            //CODE
            break;
    }
}

//Export the module
module.exports = { processEvent };