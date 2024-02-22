# Mayaya - Bot JKLM.FUN

Mayaya is a bot created for the game JKLM.FUN, whose goal is to find a word containing a specific syllable as quickly as possible. This bot has been designed to help players improve their game by providing an artificial intelligence capable of playing directly with them.

## Features

- **Automatic gameplay** : Mayaya can play directly with other players, using a vast vocabulary of over 1 million words across multiple languages.
- **Player interaction** : Equipped with artificial intelligence, the bot recognizes players and progressively learns about them.
- **Automatic Learning** : Mayaya autonomously learns new words, enhancing its performance over time.
- **Statistics and Beginner Assistance** : The AI aids beginners by offering various gameplay statistics (e.g., words per minute, reaction time, accuracy, vocabulary type).
- **Customizable Commands** : Over thirty commands are available for customizing the bot's in-game behavior, providing extensive customization options.
- **Typing Competition Mode (Ranked)** : Mayaya includes a "typing competition mode" wherein a player's statistics are recorded for one minute, enabling players to create a player profile and compare themselves with others in the community.
- **Real-time Game State Update**: Mayaya is constantly updated on the game's state as it is connected to the game's websockets.
- **Debugging Option**: Debugging options are available to display server-client messages from both websockets and to manage commands effectively.

## Commands

### Bot
- **$autoJoin** : Allows the bot to join the game automatically.
- **$copyPlayer**: Allows the bot to copy the username and profile picture of a player present in the game. (Soon, it will also copy their gameplay style and vocabulary).
- **$enableAI**: Enable or disable the bot's AI.
- **$joinRoom**: Allows the bot to join a new room.
- **$playStyle**: Define how the bot will play.
- **$suicide**: Allows the bot to lose a life during the game.
- **$wordError**: Increase or decrease the bot's error percentage when typing a word.
- **$wordsPerMinute**: Increase or decrease the typing speed of the bot.

### Database
- **$occurrenceSyllable** : Retrieve the number of occurrences of a syllable present in the database.
- **$occurrenceWord** : Retrieve the number of occurrences of a word present in the database.
- **$totalSyl** : Obtain the total number of syllables of a language present in the database.
- **$totalWords** : Obtain the total number of words of a language present in the database.

### Player
- **$assistant** : Assists a player by providing them with the most optimal words for their missing bonus letters.
- **$bonusLetters** : Retrieve the missing bonus letters of a player.
- **$givePermission** : Allows to add or remove access rights to all available commands for a player.
- **$messages** : Retrieve the list of messages from a player present in the room.
- **$nationality** : Retrieve the browser language of a player present in the game.
- **$precision** : Retrieve the accuracy of a player.
- **$reactionTime** : Retrieve the average reaction time of a player.
- **$speed** : Provide the typing speed of a player.
- **$track** : Track a player and provide their statistics at the end of each turn (reaction time, typing speed and accuracy).

### Ranked
- **$deleteRecord** : Delete a record.
- **$detail** : Retrieve all information about a record.
- **$global** : Retrieve the scores of players.
- **$personal** : Retrieve the scores of a player."
- **$record** : Record a player's scores (WPM, reaction time, and accuracy) within a 1-minute timeframe.

### Room
- **$allPlayers** : Retrieve the list of all players in the room (including admins with an invisible account)
- **$disconnect** : Disconnect the bot from a room.
- **$kickPlayer** : Kick a player from the room.
- **$realTimeInformation** : Provide real-time information about the room to the bot.
- **$searchMessage** : Find a message posted within the last 1000 messages in the room.
- **$setLeader** : Allows the bot to make a player the leader of the room.
- **$setUserBanned** : Allows the bot to ban a player from the room.
- **$setUserModerator** : Allows the bot to make a player a moderator.
- **$unsetUserBanned** : Allows the bot to unban a player.
- **$unsetUserModerator** : Allows the bot to remove the moderator role from a player.
