async function totalSyl(chatterPlayer, arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Cette commande permet d\'obtenir le nombre total de syllabes d\'une langue présent dans la base de données. La commande prend en paramètres une langue')
        bot.sendGameMessage('Langues diponsibles: fr, en, es, de, it, pt')
        bot.sendGameMessage('Utilisation: $totalSyllable fr OU $dts fr')
    }
    else if (arguments.split(" ").length > 1) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$totalSyllable" ou "$dts" pour mieux comprendre son utilisation')
    }
    else if (arguments != "fr" && arguments != "en" && arguments != "es" && arguments != "pt" && arguments != "de" && arguments != "it") {
        bot.sendGameMessage('La langue fourni est introuvable. Voici les langues disponibles: fr, en, es, de, it et pt')
    }
    else {
        var totalSyllables = await bot.get_database().getTotalSyllables(arguments)
        if (totalSyllables != -1) {
            bot.sendGameMessage("La langue " + arguments + " contient " + totalSyllables + " syllables différentes dans la base de données")
        }
        else {
            bot.sendGameMessage("Impossible d'éffectuer la requête vers la base de données")
        }

    }
}

module.exports = totalSyl