const pasteBin = require('../../../../Misc/PasteBin/api')

async function allPlayers(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {
        bot.sendGameMessage('Vous ne disposez pas des droits requis pour exécuter cette commande')
    }

    else if (arguments == "" || arguments == null) {
        bot.sendGameMessage("Cette commande permet de récupérer la liste de tous les joueurs de la room (y compris les admins ayant un compte ninja). La commande prend en paramètre 'load' qui va permettre de charger la liste de joueur ou 'show' qui va l'afficher")
        bot.sendGameMessage('Utilisation: $allPlayers load Ayaya OU $rap show')
        
    }
    else if (arguments == "load") {
        bot.get_room().allPlayers = []
        bot.get_room().staffPlayers = []
        for (let i = 0; i < 500; i++) {
            bot.get_wsRoom().emitCustom(4 + i, "getChatterProfile", i)
        }
        bot.sendGameMessage("La liste de joueur a été charger, utilisez la commande '$allPlayers show' pour l'afficher")
    }
    else if (arguments == "show") {
        if (bot.get_room().allPlayers.length != 0) {
            var messageToPaste = "Room: [" + bot.get_room().get_roomCode() + "]\n\n"
            for (const player of bot.get_room().allPlayers) {
                messageToPaste += player + "\n"
            }
            var pastLink = await pasteBin.pasteMessage(messageToPaste)
            bot.sendGameMessage("Liste des joueurs de la room: " + pastLink)
        }
        else {
            bot.sendGameMessage("La liste des joueurs n'a pas été charger. Utilisez la commande '$allPlayers' ou '$rap' pour mieux comprendre son utilisation")
        }    
    }

    else if (arguments == "staff") {
        if (bot.get_room().staffPlayers.length == 0) {
            bot.sendGameMessage("Aucun membre du staff n'est présent dans la room")
        }
        else {
            var message = "Des membres du staff sont présents dans la room: "
            for (let i = 0; i < bot.get_room().staffPlayers.length; i++) {
                if (i === bot.get_room().staffPlayers.length - 1) {
                    message += bot.get_room().staffPlayers[i]
                }
                else {
                    message += bot.get_room().staffPlayers[i] + ", "
                }
            }
            bot.sendGameMessage(message)
        }
        
        
    }
    else {
        bot.sendGameMessage("Les paramètres fournis sont incorrects. Utilisez la commande '$allPlayers' ou '$rap' pour mieux comprendre son utilisation")
    }
}

module.exports = allPlayers