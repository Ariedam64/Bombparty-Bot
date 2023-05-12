﻿const pasteBin = require('../../../../Misc/PasteBin/api')
const funct = require('../../../../Misc/Functions')

async function personal(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet de récupérer les scores des joueurs. Cette commande prend en paramètre une catégorie (wpm, reactionTime et precision), un ordre (asc ou desc) et un entier pour définir la limite voulue. Si vous souhaitez simplement visualiser les scores récents, mettez '$rg all' en paramètre")
        bot.sendGameMessage('Utilisation: $global wpm dsc 5 on OU $rg all')
    }
    else if (chatterPlayer.auth == null) {
        bot.sendGameMessage('Vous devez être connecté pour effectuer cette commande')
    }
    else if (arguments.split(" ").length > 3) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$global" ou "$rg" pour mieux comprendre son utilisation')
    }
    else if (arguments.split(" ").length == 1 && arguments == "all") {
        let resultRequest = await bot.get_database().showRecord(chatterPlayer, null, null, null)
        try {
            var pastLink = await pasteBin.pasteMessage(funct.tableauEnTexte(resultRequest))
            bot.sendGameMessage("Voici les scores récents: " + pastLink)
        }
        catch {
            bot.sendGameMessage("Aucun score récent enregistré")
        }  
    }
    else {
        let categorie = null
        let order = null
        let limit = null
        try {
            for (const argument of arguments.split(" ")) {
                if (argument == "wpm" || argument == "reactionTime" || argument == "precision" || argument == "rt" || argument == "p") {
                    if (argument == "rt") { categorie = "reactionTime" }
                    else if (argument == "p") { categorie = "precision" }
                    else { categorie = argument }
                }
                if (argument == "asc" || argument == "desc") {
                    order = argument.toUpperCase()
                }
                if (Number.isInteger(Number.parseInt(argument))) {
                    limit = Number.parseInt(argument)
                }
            }
            if (categorie == null && order == null && limit == null) {
                bot.sendGameMessage("Les paramètres fournis sont incorrects")
            }
            else {
                let ordre = "meilleur"
                let select = "date"
                if (categorie == null) { categorie = "recordDate" }
                if (order == null) { order = "DESC" }
                if (limit == null) { limit = 10000 }
                if (order.toUpperCase() == "DESC") { ordre = "meilleur" } else { ordre = "pire" }
                if (categorie == "wpm") { select = "vitesse d'écriture moyenne" }
                if (categorie == "reactionTime") { select = "vitesse de réaction moyen" }
                if (categorie == "precision") { select = "précision moyenne" }
                let headerMessage = "Requête: Joueur " + chatterPlayer.nickname + ", Select:" + categorie + ", OrderBy:" + order + ", Limit:" + limit + "\n\n"
                let bodyMessage = await bot.get_database().showRecord(chatterPlayer, categorie, order, limit)
                var pastLink = await pasteBin.pasteMessage(headerMessage + funct.tableauEnTexte(bodyMessage))
                bot.sendGameMessage("Voici " + limit + " de tes " + ordre + " scores triés par " + select + ": " + pastLink)
            }
        }
        catch {
            bot.sendGameMessage("Tu n'as aucun score enregistré")
        }      
    }
}

module.exports = personal