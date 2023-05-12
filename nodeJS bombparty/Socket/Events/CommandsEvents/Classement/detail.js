const pasteBin = require('../../../../Misc/PasteBin/api')
const funct = require('../../../../Misc/Functions')

async function detail(chatterPlayer, arguments, bot) {

    if (arguments == null || arguments == "") {
        bot.sendGameMessage("Cette commande permet de récupérer toutes les informations d'un record. Elle prend paramètre une catégorie un entier qui est l'identifiant du record")
        bot.sendGameMessage('Utilisation: $detail 56 ou $cd 56')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$detail" ou "$cd" pour mieux comprendre son utilisation')
    }
    else if (!(funct.isInt(arguments))) {
        bot.sendGameMessage('Le paramètre renseigné n\'est pas un entier. Utilisez la commande "$detail" ou "$cd" pour mieux comprendre son utilisation')
    }
    else {
        let resultRequest = null
            resultRequest = await bot.get_database().showDetailRecord(arguments)
            if (resultRequest != null) {
                const recordid = resultRequest[0].recordid;
                const recorddate = resultRequest[0].recorddate;
                const nickname = resultRequest[0].nickname;
                const totalwords = resultRequest[0].totalwords;
                const wpm = resultRequest[0].wpm;
                const reactiontime = resultRequest[0].reactiontime;
                const precision = resultRequest[0].precision;
                const averagewordslength = resultRequest[0].averagewordslength;
                const words = resultRequest[0].words.split(",");
                const syllables = resultRequest[0].syllables.split(",") 
                const wpms = resultRequest[0].wpms.split(",");
                const reactiontimes = resultRequest[0].reactiontimes.split(",");
                const precisions = resultRequest[0].precisions.split(",");
                newPrecision = funct.transformArray(precisions)
                const data = [];
                for (let i = 0; i < totalwords; i++) {
                    data.push({
                        'Tour': i + 1,
                        'Mot': words[i],
                        'Syllabe': syllables[i],
                        "Vitesse d'écriture": parseInt(wpms[i]) + " mots/min",
                        'Temps de réaction': parseFloat(reactiontimes[i]) + " ms", 
                        'Précision': ((parseFloat(newPrecision[i])) * 100).toFixed(2) + '%'
                    });
                }
                let message = "Record id: " + recordid + "\nJoueur: " + nickname + "\nDate: " + recorddate + "\n\n"
                message += "Nombre total de mots: " + totalwords + "\nLongueur moyenne des mots: " + averagewordslength + "\nVitesse d'écriture moyenne: " + wpm + " mots/minute\nTemps de réaction moyen: " + reactiontime + " ms\nPrécision moyenne: " + precision + "%\n\n"
                message += funct.tableauEnTexte(data)
                var pastLink = await pasteBin.pasteMessage(message)
                bot.sendGameMessage("Voici les détails du record " + arguments + ": " + pastLink)
            } 
    
    }
}

module.exports = detail