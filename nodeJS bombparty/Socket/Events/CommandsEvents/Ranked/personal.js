const pasteBin = require('../../../../Misc/PasteBin/api')
const funct = require('../../../../Misc/Functions')

async function personal(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet de récupérer les scores d'un joueur. Elle prend paramètre une catégorie (wpm/reactionTime[rt]/precision[p]/avgWordsLength[avg]), un ordre (asc/desc) et un entier pour définir la limite. Si vous souhaitez simplement visualiser vos scores récents, mettez '$rp all' en paramètre")
        bot.sendGameMessage('Utilisation: $personal wpm dsc 5 on OU $rp all')
    }
    else if (chatterPlayer.auth == null) {
        bot.sendGameMessage('Vous devez être connecté pour effectuer cette commande')
    }
    else if (arguments.split(" ").length > 3) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$personal" ou "$rp" pour mieux comprendre son utilisation')
    }
    else if (arguments.split(" ").length == 1 && arguments == "all") {
        let resultRequest = await bot.get_database().showRecord(chatterPlayer, null, null, null)
        try {
            var pastLink = await pasteBin.pasteMessage(funct.tableauEnTexte(resultRequest))
            bot.sendGameMessage("Voici tes scores récents: " + pastLink)
        }
        catch {
            bot.sendGameMessage("Tu n'as aucun score enregistré")
        }  
    }
    else {
        let categorie = null
        let order = null
        let limit = null
        try {
            for (const oldArgument of arguments.split(" ")) {
                argument = oldArgument.toLowerCase()
                if (argument == "wpm" || argument == "reactiontime" || argument == "precision" || argument == "rt" || argument == "p" || argument == "avgwordslength" || argument == "avg") {
                    if (argument == "rt") { categorie = "reactionTime" }
                    else if (argument == "p") { categorie = "precision" }
                    else if (argument == "avg") { categorie = "averagewordslength" }
                    else if (argument == "avgwordslength") { categorie = "averagewordslength" }
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
                let ordre = "décroissant"
                let select = "date"
                if (categorie == null) { categorie = "recordDate" }
                if (order == null) { order = "DESC" }
                if (limit == null) { limit = 10000 }
                if (order.toUpperCase() == "DESC") { ordre = "décroissant" } else { ordre = "croissant" }
                if (categorie == "wpm") { select = "vitesse d'écriture moyenne" }
                if (categorie == "reactionTime") { select = "vitesse de réaction moyen" }
                if (categorie == "precision") { select = "précision moyenne" }
                if (categorie == "averagewordslength") { select = "longueur moyenne des mots" }
                let bodyMessage = await bot.get_database().showRecord(chatterPlayer, categorie, order, limit)
                var pastLink = await pasteBin.pasteMessage(funct.tableauEnTexte(bodyMessage))
                bot.sendGameMessage("Voici " + limit + " de tes scores triés par " + select + " par ordre " + ordre + ": " + pastLink)
            }
        }
        catch {
            bot.sendGameMessage("Tu n'as aucun score enregistré")
        }      
    }
}

module.exports = personal