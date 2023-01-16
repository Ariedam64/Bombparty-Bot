async function occurSyl(arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Erreur: Aucun paramètre renseigné (ex: $occurSyllabe fr "er")')
    }
    else if (!(arguments.includes('"')) || arguments.split('"').length - 1 < 2)
        bot.sendGameMessage('Erreur: La syllabe n\'est pas entre guillemet (ex: $occurSyllabe fr "er")')
    else if (arguments.split(' ')[0] != "fr" && arguments.split(' ')[0] != "en" && arguments.split(' ')[0] != "es" && arguments.split(' ')[0] != "pt" && arguments.split(' ')[0] != "de") {
        bot.sendGameMessage('Erreur: Langue introuvable. Voici les langues disponibles: fr, en, es, de et pt')
    }
    else {
        var syllable = arguments.substring(1).slice(3, -1)
        var lang = arguments.split(' ')[0]
        var occurSyllabe = await bot.get_database().getSyllableOccurence(lang, syllable)
        if (occurSyllabe != -1) {
            bot.sendGameMessage(occurSyllabe + " occurrence(s) pour la syllabe \"" + syllable + "\" dans la base de données " + lang)
        }
        else {
            bot.sendGameMessage("Le mot n'existe \"" + syllable + "\" pas dans la base de données " + lang)
        }
    }
}


module.exports = occurSyl