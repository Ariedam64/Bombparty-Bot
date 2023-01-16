async function totalSyl(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage("Erreur: Aucune langue renseigné (ex: $totalSyllables fr)")
    }
    else {

        if (arguments != "fr" && arguments != "es" && arguments != "en" && arguments != "de" && arguments != "pt") {
            bot.sendGameMessage("Langue introuvable. Voici les langues disponibles: fr, en, es, de et pt")
        }
        else {
            var totalSyllables = await bot.get_database().getTotalSyllables(arguments)
            if (totalSyllables != -1) {
                bot.sendGameMessage(totalSyllables + " syllables différentes")
            }
            else {
                bot.sendGameMessage("Erreur bdd")
            }
            
        }
    }
}

module.exports = totalSyl