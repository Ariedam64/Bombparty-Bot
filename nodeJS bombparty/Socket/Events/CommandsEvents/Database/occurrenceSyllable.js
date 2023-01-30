async function occurrenceSyllable(chatterPlayer, arguments, bot) {

    if (arguments == "" || arguments == null) {
        bot.sendGameMessage('Cette commande permet de récupérer le nombre d\'occurrences d\'une syllabe présente dans la base de données. La commande prend en paramètres une langue et la syllabe entre guillemets')
        bot.sendGameMessage('Langues diponsibles: fr, en, es, de, it, pt')
        bot.sendGameMessage('Utilisation: $occurrenceSyllable fr "er" OU $dos fr "er"')
    }
    else if (arguments.split(" ").length > 2) {
        bot.sendGameMessage('Vous avez fourni trop de paramètres. Utilisez la commande "$occurrenceSyllable" ou "$dos" pour mieux comprendre son utilisation')
    }
    else if (arguments.split(" ").length < 2) {
        bot.sendGameMessage('Vous n\'avez pas fourni assez de paramètres. Utilisez la commande "$occurrenceSyllable" ou "$dos" pour mieux comprendre son utilisation')
    }
    else if (arguments.split(' ')[0] != "fr" && arguments.split(' ')[0] != "en" && arguments.split(' ')[0] != "es" && arguments.split(' ')[0] != "pt" && arguments.split(' ')[0] != "de" && arguments.split(' ')[0] != "it") {
        bot.sendGameMessage('La langue fourni est introuvable. Voici les langues disponibles: fr, en, es, de, it et pt')
    }
    else if (!(arguments.includes('"')) || arguments.split('"').length - 1 < 2) {
        bot.sendGameMessage('Vous avez fourni une syllabe sans guillemet. Utilisez la commande "$occurrenceSyllable" ou "$dos" pour mieux comprendre son utilisation')
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

module.exports = occurrenceSyllable