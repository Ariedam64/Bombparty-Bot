const Message = require("../../../../Game/Chat/Message")
const CommandEventManager = require("../../EventsManager/CommandEventManager.js")
const funct = require("../../../../Misc/Functions.js")
const path = require('path');
const AI = require("../../../../Game/Bot/AI.js")


async function chat(jsonData, bot) {

    var chatMessage = jsonData[2]
    if (chatMessage != null) {

        var chatterPeerId = jsonData[1].peerId
        var chatterNickname = jsonData[1].nickname

        var timePosted = new Date()
        var timePostedHours = timePosted.getHours()
        var timePostedMinutes = timePosted.getMinutes()
        timePostedHours = ("0" + timePostedHours).slice(-2).toString(); //Show hours with 2 digits (ex: "05" and not "5")
        timePostedMinutes = ("0" + timePostedMinutes).slice(-2).toString(); //Show minutes with 2 digits (ex: "02" and not "2")

        var chatterPlayer = bot.get_room().getPlayerByPeerId(chatterPeerId)

        /* AI */
        var nicknameBot = chatMessage.toLowerCase().includes(bot.get_nickname().toLowerCase().toLowerCase())

        if (nicknameBot && chatterPeerId != bot.get_peerId() && chatterNickname != "ℤbot") {
            const projetPath = __dirname.split(path.sep);
            const dataPath = path.join(...projetPath.slice(0, -4), "realTime");

            if (bot.get_room().isRealTimeInformation) {
                await funct.sauvegarderObjetDansFichier(bot.get_room(), dataPath + '\\variables.txt');
                const msg = await AI.initRealTime(chatterNickname, chatMessage)
                bot.sendGameMessage(msg)
            }
            else {
                bot.asking(chatterNickname, chatMessage)
            }        
        }

        /* APPENDS MESSAGE TO PLAYER */
        if (chatterPlayer != false && chatterNickname != "ℤbot") {            
            if (chatterPlayer != false) {
                chatterPlayer.appendMessage(new Message(timePostedHours + ":" + timePostedMinutes, chatMessage))
                bot.get_room().appendMessageToChat(chatterPeerId, chatterNickname, new Message(timePostedHours + ":" + timePostedMinutes, chatMessage))
            }
        }

        /* COMMAND MANAGER */
        var commandSymbol = "$"

        if (chatMessage.charAt(0) == commandSymbol) {
           CommandEventManager.processEvent(chatterPlayer, chatMessage, bot, false)
        }

    }
}

module.exports = chat