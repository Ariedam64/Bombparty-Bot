const jklmAPI = require("../../../../Game/API/jklmAPI.js")

async function joinRoom(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments == null || arguments == "") {
        bot.sendGameMessage('Cette commande permet au bot de rejoindre une nouvelle room. La commande prend en paramètre un code de room')
        bot.sendGameMessage('Utilisation: $joinRoom PTUV OU $bjr PTUV')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$joinRoom" ou "$bjr" pour mieux comprendre son utilisation')
    }
    else if (arguments.length != 4) {
        bot.sendGameMessage('Le paramètre renseigné doit être un code composé de quatre lettres. Utilisez la commande "$autoJoin" ou "$baj" pour mieux comprendre son utilisation')
    }
    else {
        var apiReponse = await jklmAPI.joinRoom(arguments.toUpperCase())
        if (apiReponse != -1 && apiReponse != 0) {
            const Bot = require("../../../../Game/Bot/Bot.js")
            const Room = require("../../../../Game/Room/Room.js")
            new Bot().connectToRoom(new Room(arguments.toUpperCase()))
            bot.sendGameMessage('Le bot a rejoint la room ' + arguments.toUpperCase())
        }
        else {
            bot.sendGameMessage('Impossible de rejoindre la room ' + arguments.toUpperCase())
        }       
    }
}

module.exports = joinRoom