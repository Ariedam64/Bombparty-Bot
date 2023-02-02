function getChatterProfiles(jsonData,bot) {

    //Check if the message is "getChatterProfiles"
    if (jsonData[0].roomEntry == null) {

        var playerArray = jsonData[0]

        //If the players list is empty add everyone
        if (bot.get_room().players.length == 0) {
            bot.get_room().setupPlayerList(playerArray)
        }
        else { //If there are less than 20 players in the room

            var newPlayersArray = bot.get_room().makePlayerListFromData(playerArray)

            if (bot.get_room().get_playerCount() < 20) {

                //get new players Array
                for (const player of newPlayersArray) {
                    if (player.nickname == bot.get_room().get_lastPlayerJoined()) {
                        bot.get_room().addPlayer(player)
                    }
                }
                bot.get_room().set_lastPlayerJoined(null)

            }

            //If there are more than 20 players in room, the event "chatterAdded" and "chatterRemoved" are not called, so there, we compare the players in chat and the players that we have in our bot.get_room().players array
            else {

                var peerId_newPlayersArray = []
                var peerId_actuelPlayersArray = []

                //Make peerId array

                for (const player of playerArray) {
                    peerId_newPlayersArray.push(player.peerId)
                }
           
                for (const player of bot.get_room().players) {
                    peerId_actuelPlayersArray.push(player.peerId)
                }

                //Check both arrays
                for (const id of peerId_newPlayersArray) {
                    if (!(peerId_actuelPlayersArray.includes(id))) {
                        bot.get_room().addPlayer(bot.get_room().getPlayerByPeerIdWithArray(newPlayersArray, id))
                    }                      
                }

                for (const id of peerId_actuelPlayersArray) {
                    if (!(peerId_newPlayersArray.includes(id))) {
                        bot.get_room().deletePlayer(id)
                    }
                        
                }
            }        
        }
    }

}

module.exports = getChatterProfiles