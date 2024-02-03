const mayayasays = require('../Room/GameMods/MayayaSays.js')

async function gamemode(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet définir un mode de jeu. Elle prend paramètre un mode de jeu")
        bot.sendGameMessage('Mode de jeu diponsibles: [1]Mayaya à dit - [0]Stop')
        bot.sendGameMessage('Utilisation: $gamemode 1 ou $rg 1')
    }
    else if (arguments.split(" ").length == 1 && chatterPlayer.auth == null || chatterPlayer.auth.id != bot.get_creatorId() && arguments.split(" ").length == 1) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$gamemode" ou "$rg" pour mieux comprendre son utilisation')
    }
    else {

        switch (arguments.toLowerCase()) {
            case "0":
                if (bot.get_isGamemode()) {
                    gamemodeOff(bot)
                    bot.sendGameMessage("Le mode de jeu en cours a été interrompu")
                }
                else { bot.sendGameMessage("Aucun mode de jeu n'est actuellement en cours")}
                break;
            case "1":
                if (bot.get_isGamemode()) {bot.sendGameMessage("Un mode de jeu est déjà en cours")}
                else {
                    gamemodeOn(bot, arguments)
                    mayayasays.startGame(bot)
                }
                break;
            default:
                bot.sendGameMessage('Le mode de jeu "' + arguments + '" est introuvable')
                break;
        }
    }
}

function gamemodeOn(bot, arguments) {
    bot.set_isGamemode(true)
    bot.set_isAutoJoin(false)
    bot.set_gamemode(arguments)
}

function gamemodeOff(bot) {
    bot.set_isGamemode(false)
    bot.set_gamemode(null)
}

module.exports = gamemode