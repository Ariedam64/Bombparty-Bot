const pasteBin = require('../../../../Misc/PasteBin/api')
const funct = require('../../../../Misc/Functions')

async function global(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet de récupérer les scores des joueurs. Elle prend paramètre une catégorie (words[w] - wpm - reactionTime[rt] - precision[p] - avgWordsLength[avg]) et un ordre (asc/desc). Si vous souhaitez simplement visualiser les scores récents, mettez '$cg all' en paramètre")
        bot.sendGameMessage('Utilisation: $global wpm dsc on OU $rg all')
    }
    else if (arguments.split(" ").length > 2) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$global" ou "$rg" pour mieux comprendre son utilisation')
    }
    else if (arguments.split(" ").length == 1 && arguments.toLowerCase() == "all") {
        let resultRequest = await bot.get_database().showAllGlobalRecord()
        try {
            var pastLink = await pasteBin.pasteMessage(funct.tableauEnTexte(resultRequest))
            bot.sendGameMessage("Voici les scores récents: " + pastLink)
        }
        catch {bot.sendGameMessage("Aucun score récent enregistré")}  
    }
    else {
        let categorie = null
        let order = null
        let max = null
        try {
            for (const oldArgument of arguments.split(" ")) {
                argument = oldArgument.toLowerCase()
                if (argument == "words" || argument == "w" || argument == "wpm" || argument == "reactiontime" || argument == "precision" || argument == "rt" || argument == "p" || argument == "avgwordslength" || argument == "avg") {
                        if (argument == "rt") { categorie = "reactiontime" }
                        else if (argument == "p") { categorie = "precision" }
                        else if (argument == "w" || argument == "words") { categorie = "totalwords" }
                        else if (argument == "avg") { categorie = "averagewordslength" }
                        else if (argument == "avgWordsLength") { categorie = "averagewordslength" }
                        else { categorie = argument }
                    }
                    if (argument == "asc" || argument == "desc") {
                        if (argument == "asc") { max = "MIN" }
                        else { max = "MAX" }
                        order = argument.toUpperCase()
                    }
                }
            if (categorie == null || order == null) {
                    bot.sendGameMessage("Les paramètres fournis sont incorrects")
            }
            else {
                let ordre = null
                let select = null
                if (categorie == null) { categorie = "recordDate" }
                if (order == null) { order = "DESC" }
                if (max == null) { max = "MAX" }
                if (order.toUpperCase() == "DESC") { ordre = "décroissant" } else { ordre = "croissant" }
                if (categorie == "wpm") { select = "vitesse d'écriture moyenne" }
                if (categorie == "totalwords") { select = "nombre total de mots" }
                if (categorie == "reactionTime") { select = "vitesse de réaction moyen" }
                if (categorie == "precision") { select = "précision moyenne" }
                if (categorie == "averagewordslength") { select = "longueur moyenne des mots" }
                let bodyMessage = await bot.get_database().showGlobalRecord(categorie, order, max)
                var pastLink = await pasteBin.pasteMessage(funct.tableauEnTexte(bodyMessage))
                bot.sendGameMessage("Voici les scores des joueurs triés par " + select + " par ordre " + ordre + ": " + pastLink)
            }
        }
        catch {
            bot.sendGameMessage("Aucun score récent enregistré")
        }    
    }
}

module.exports = global