async function startGame(bot) {
    bot.sendGameMessage("Début du mode de jeu: Mayaya à dit")
    bot.sendGameMessage("Règles: Chaque joueur doit suivre instruction seulement si elle commence par 'Mayaya à dit'. Si le joueur ne suit pas l'instruction ou suit une instruction incorrecte, il est éliminé.")
} 

async function says(instruction) {

}

module.exports = { startGame, says };