# Mayaya - Bot JKLM.FUN

Mayaya est un bot créé pour le jeu JKLM.FUN, dont le but est de trouver un mot contenant une syllabe spécifique le plus rapidement possible. Ce bot a été conçu pour aider les joueurs à améliorer leur jeu en fournissant une intelligence artificielle capable de jouer directement avec eux.

## Fonctionnalités

- **Jeu automatique** : Mayaya peut jouer directement avec d'autres joueurs, en utilisant un vaste vocabulaire de plus d'un million de mots dans plusieurs langues.
- **Interaction avec les joueurs** : Équipé d'une intelligence artificielle, le bot reconnaît les joueurs et apprend progressivement à les connaître.
- **Apprentissage automatique** : Mayaya apprend de nouveaux mots de manière autonome, améliorant ainsi ses performances au fil du temps.
- **Statistiques et aide aux débutants** : L'IA aide les débutants en offrant diverses statistiques de jeu (par exemple, mots par minute, temps de réaction, précision, type de vocabulaire).
- **Commandes personnalisables** : Plus de trente commandes sont disponibles pour personnaliser le comportement du bot en jeu, offrant de nombreuses options de personnalisation.
- **Mode de compétition de frappe (classé)** : Mayaya inclut un "mode de compétition de frappe" où les statistiques d'un joueur sont enregistrées pendant une minute, permettant aux joueurs de créer un profil et de se comparer aux autres membres de la communauté.
- **Mise à jour en temps réel de l'état du jeu** : Mayaya est constamment mis à jour sur l'état du jeu car il est connecté aux websockets du jeu.
- **Option de débogage** : Des options de débogage sont disponibles pour afficher les messages serveur-client des deux websockets et pour gérer efficacement les commandes.

## Installation

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/yourusername/mayaya-bot.git
    cd mayaya-bot
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Configurez les fichiers de configuration :
    

## Commands

### Bot
- **$autoJoin** : Permet au bot de rejoindre automatiquement le jeu.
- **$copyPlayer**:  Permet au bot de copier le nom d'utilisateur et la photo de profil d'un joueur présent dans le jeu. (Bientôt, il copiera également leur style de jeu et leur vocabulaire).
- **$enableAI**: Activer ou désactiver l'IA du bot..
- **$joinRoom**: Permet au bot de rejoindre une nouvelle salle.
- **$playStyle**: Définir comment le bot va jouer.
- **$suicide**: Permet au bot de perdre une vie pendant le jeu.
- **$wordError**: Augmenter ou diminuer le pourcentage d'erreurs du bot lors de la saisie d'un mot.
- **$wordsPerMinute**: Augmenter ou diminuer la vitesse de frappe du bot.

### Database
- **$occurrenceSyllable** : Récupérer le nombre d'occurrences d'une syllabe présente dans la base de données.
- **$occurrenceWord** : Récupérer le nombre d'occurrences d'un mot présent dans la base de données.
- **$totalSyl** : Obtenir le nombre total de syllabes d'une langue présente dans la base de données.
- **$totalWords** : Obtenir le nombre total de mots d'une langue présente dans la base de données.

### Player
- **$assistant** : Assiste un joueur en lui fournissant les mots les plus optimaux pour ses lettres bonus manquantes.
- **$bonusLetters** : Récupérer les lettres bonus manquantes d'un joueur.
- **$givePermission** : Permet d'ajouter ou de retirer les droits d'accès à toutes les commandes disponibles pour un joueur.
- **$messages** : Récupérer la liste des messages d'un joueur présent dans la salle.
- **$nationality** : Récupérer la langue du navigateur d'un joueur présent dans le jeu.
- **$precision** : Récupérer la précision d'un joueur.
- **$reactionTime** : Récupérer le temps de réaction moyen d'un joueur.
- **$speed** : Fournir la vitesse de frappe d'un joueur.
- **$track** : Suivre un joueur et fournir ses statistiques à la fin de chaque tour (temps de réaction, vitesse de frappe et précision).

### Ranked
- **$deleteRecord** : Supprimer un enregistrement.
- **$detail** : Récupérer toutes les informations sur un enregistrement.
- **$global** : Récupérer les scores des joueurs.
- **$personal** : Récupérer les scores d'un joueur.
- **$record** : Enregistrer les scores d'un joueur (Mots par minute, temps de réaction et précision) sur une période d'une minute.

### Room
- **$allPlayers** : Récupérer la liste de tous les joueurs dans la salle (y compris les administrateurs avec un compte invisible).
- **$disconnect** : Déconnecter le bot d'une salle.
- **$kickPlayer** : Expulser un joueur de la salle.
- **$realTimeInformation** : Fournir des informations en temps réel sur la salle au bot.
- **$searchMessage** : Trouver un message posté dans les 1000 derniers messages de la salle.
- **$setLeader** : Permet au bot de nommer un joueur comme leader de la salle.
- **$setUserBanned** : Permet au bot de bannir un joueur de la salle.
- **$setUserModerator** : Permet au bot de nommer un joueur comme modérateur.
- **$unsetUserBanned** : Permet au bot de débannir un joueur.
- **$unsetUserModerator** : Permet au bot de retirer le rôle de modérateur d'un joueu

https://www.youtube.com/watch?v=Hmv1EZ5iSfk

***Veuillez noter que je ne fournis pas les bases de données pour les statistiques de joueurs existants et le vocabulaire.***
