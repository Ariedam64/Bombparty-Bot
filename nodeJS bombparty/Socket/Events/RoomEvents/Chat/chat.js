const Message = require("../../../../Game/Chat/Message")
const CommandEventManager = require("../../EventsManager/CommandEventManager.js")

function chat(jsonData, bot) {

    var chatMessage = jsonData[2]

    if (chatMessage != null) {

        var chatterPeerId = jsonData[1].peerId
        var chatterNickname = jsonData[1].nickname

        var timePosted = new Date()
        var timePostedHours = timePosted.getHours()
        var timePostedMinutes = timePosted.getMinutes()
        timePostedHours = ("0" + timePostedHours).slice(-2).toString(); //Show hours with 2 digits (ex: "05" and not "5")
        timePostedMinutes = ("0" + timePostedMinutes).slice(-2).toString(); //Show minutes with 2 digits (ex: "02" and not "2")

        var player = bot.get_room().getPlayerByPeerId(chatterPeerId)
        

        /* Appends message to player and chat */
        if (player != false) {

            player.appendMessage(new Message(timePostedHours + ":" + timePostedMinutes, chatMessage))
            bot.get_room().appendMessageToChat(chatterPeerId, chatterNickname, new Message(timePostedHours + ":" + timePostedMinutes, chatMessage))
        }   

        /* Check if message is a command*/
        var commandSymbol = "$"

        if (chatMessage.charAt(0) == commandSymbol) {
            CommandEventManager.processEvent(chatMessage, bot, true)
        }

    }
}

module.exports = chat