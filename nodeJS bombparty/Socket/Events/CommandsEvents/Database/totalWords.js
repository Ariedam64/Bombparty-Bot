async function totalWords(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage("Erreur: Aucune langue renseigné (ex: $totalWords fr)")
    }
    else {

        if (arguments != "fr" && arguments != "es" && arguments != "en" && arguments != "de" && arguments != "pt") {
            bot.sendGameMessage("Langue introuvable. Voici les langues disponibles: fr, en, es, de et pt")
        }
        else {
            var totalWords = await bot.get_database().getTotalWords(arguments)
            if (totalWords != -1) {
                bot.sendGameMessage(totalWords + " mots différents")
            }
            else {
                bot.sendGameMessage("Erreur bdd")
            }
        }
    }
}

module.exports = totalWords