﻿
function help(chatterPlayer, arguments, bot) {

    if (chatterPlayer.auth == null || !bot.get_playerStaff().includes(chatterPlayer.auth.id) && chatterPlayer.auth.id != bot.get_creatorId()) {

        bot.sendGameMessage('𝗥𝗼𝗼𝗺 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝗌𝖾𝖺𝗋𝖼𝗁𝖬𝖾𝗌𝗌𝖺𝗀𝖾(𝗋𝗌𝗆)')
        bot.sendGameMessage('𝗣𝗹𝗮𝘆𝗲𝗿 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝖻𝗈𝗇𝗎𝗌𝖫𝖾𝗍𝗍𝖾𝗋(𝗉𝖻𝗅) — 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌(𝗉𝗆) — 𝗇𝖺𝗍𝗂𝗈𝗇𝖺𝗅𝗂𝗍𝗒(𝗉𝗇) — 𝗉𝗋𝖾𝖼𝗂𝗌𝗂𝗈𝗇(𝗉𝗉) — 𝗌𝗉𝖾𝖾𝖽(𝗉𝗌) — 𝗋𝖾𝖺𝖼𝗍𝗂𝗈𝗇𝖳𝗂𝗆𝖾(𝗉𝗋𝗍)')
        bot.sendGameMessage('𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝗇𝖼𝖾𝖲𝗒𝗅𝗅𝖺𝖻𝗅𝖾(𝖽𝗈𝗌) — 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝗇𝖼𝖾𝖶𝗈𝗋𝖽(𝖽𝗈𝗐) — 𝗍𝗈𝗍𝖺𝗅𝖲𝗒𝗅𝗅𝖺𝖻𝗅𝖾𝗌(𝖽𝗍𝗌) — 𝗍𝗈𝗍𝖺𝗅𝖶𝗈𝗋𝖽𝗌(𝖽𝗍𝗐)')

    }
    else {
        bot.sendGameMessage('𝗥𝗼𝗼𝗺 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝗌𝖾𝖺𝗋𝖼𝗁𝖬𝖾𝗌𝗌𝖺𝗀𝖾(𝗋𝗌𝗆)')
        bot.sendGameMessage('𝗕𝗼𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝖺𝗎𝗍𝗈𝖩𝗈𝗂𝗇(𝖻𝖺𝗃) — 𝖼𝗈𝗉𝗒𝖯𝗋𝗈𝖿𝗂𝗅𝖾(b𝖼𝗉) — 𝗃𝗈𝗂𝗇𝖱𝗈𝗈𝗆(𝖻𝗃𝗋) — 𝗌𝗎𝗂𝖼𝗂𝖽𝖾(𝖻𝗌) — 𝗐𝗈𝗋𝖽𝖤𝗋𝗋𝗈𝗋(𝖻𝗐𝖾) — 𝗐𝗈𝗋𝖽𝖯𝖾𝗋𝖬𝗂𝗇𝗎𝗍𝖾(𝖻𝗐𝗉𝗆)')
        bot.sendGameMessage('𝗣𝗹𝗮𝘆𝗲𝗿 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝖺𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝗍(𝗉𝖺) — 𝖻𝗈𝗇𝗎𝗌𝖫𝖾𝗍𝗍𝖾𝗋(𝗉𝖻𝗅) — 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌(𝗉𝗆) — 𝗇𝖺𝗍𝗂𝗈𝗇𝖺𝗅𝗂𝗍𝗒(𝗉𝗇) — 𝗉𝗋𝖾𝖼𝗂𝗌𝗂𝗈𝗇(𝗉𝗉) — 𝗋𝖾𝖺𝖼𝗍𝗂𝗈𝗇𝖳𝗂𝗆𝖾(𝗉𝗋𝗍) — 𝗌𝗉𝖾𝖾𝖽(𝗉𝗌) — 𝗍𝗋𝖺𝖼𝗄𝖾𝗋(𝗉𝗍)')
        bot.sendGameMessage('𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀: 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝗇𝖼𝖾𝖲𝗒𝗅𝗅𝖺𝖻𝗅𝖾(𝖽𝗈𝗌) — 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝗇𝖼𝖾𝖶𝗈𝗋𝖽(𝖽𝗈𝗐) — 𝗍𝗈𝗍𝖺𝗅𝖲𝗒𝗅𝗅𝖺𝖻𝗅𝖾𝗌(𝖽𝗍𝗌) — 𝗍𝗈𝗍𝖺𝗅𝖶𝗈𝗋𝖽𝗌(𝖽𝗍𝗐)')
    }
}

module.exports = help