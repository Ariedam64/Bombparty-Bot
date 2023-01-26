async function totalWords(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Cette commande permet d\'obtenir le nombre total de mots d\'une langue présent dans la base de données. La commande prend en paramètres une langue')
        bot.sendGameMessage('Langues diponsibles: fr, en, es, de, it, pt')
        bot.sendGameMessage('Utilisation: $totalWord fr')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$totalWord" pour mieux comprendre son utilisation')
    }
    else if (arguments != "fr" && arguments != "en" && arguments != "es" && arguments != "pt" && arguments != "de" && arguments != "it") {
        bot.sendGameMessage('La langue fourni est introuvable. Voici les langues disponibles: fr, en, es, de, it et pt')
    }
    else {
        var totalWords = await bot.get_database().getTotalWords(arguments)
        if (totalWords != -1) {
            bot.sendGameMessage("La langue " + arguments + " contient " + totalWords + " mots différents dans la base de données")
        }
        else {
            bot.sendGameMessage("Impossible d'éffectuer la requête vers la base de données")
        }
    }
}

module.exports = totalWords