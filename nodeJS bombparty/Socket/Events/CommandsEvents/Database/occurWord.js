async function occurWord(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Erreur: Aucun paramètre renseigné (ex: $occurWord fr "manger")')
    }
    else if (!(arguments.includes('"')) || arguments.split('"').length - 1 < 2)
        bot.sendGameMessage('Erreur: Le mot n\'est pas entre guillemet (ex: $occurWord fr "manger")')
    else if (arguments.split(' ')[0] != "fr" && arguments.split(' ')[0] != "en" && arguments.split(' ')[0] != "es" && arguments.split(' ')[0] != "pt" && arguments.split(' ')[0] != "de") {
        bot.sendGameMessage('Erreur: Langue introuvable. Voici les langues disponibles: fr, en, es, de et pt')
    }
    else {
        var word = arguments.substring(1).slice(3, -1)
        var lang = arguments.split(' ')[0]
        var occurWord = await bot.get_database().getWordOccurence(lang, word)
        if (occurWord != -1) {
            bot.sendGameMessage(occurWord + " occurrence(s) pour le mot \"" + word + "\" dans la base de données " + lang)
        }
        else {
            bot.sendGameMessage("Le mot n'existe \"" + word +"\" pas dans la base de données " + lang)
        }
    }
}

module.exports = occurWord