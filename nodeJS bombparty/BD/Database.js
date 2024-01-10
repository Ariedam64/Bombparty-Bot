const pgConfig = require('./Connection/configuration.js')
const { Client } = require('pg')
const moment = require('moment');
const funct = require("../Misc/Functions.js")

class Database {

    constructor(DEBUG=false) {

        this.client = new Client({
            database: pgConfig.database,
            host: pgConfig.host,
            port: pgConfig.port,
            user: pgConfig.user,
            password: pgConfig.password
        })

        this.DEBUG = DEBUG
        this.client.connect()
    }

    /* WORDS */

    addNewWord(table, word) {
        this.client.query(`INSERT INTO words.${table}(word) VALUES('${word}') 
                           ON CONFLICT (word) DO UPDATE SET occurrence = words.${table}.occurrence + 1`, (err, res) => {
            if (err) {
                if (this.DEBUG) {console.log(`Erreur lors de l'insertion du mot "${word}" dans la table "${table}"`)}
                return -1
            }
            else {
                if (this.DEBUG) {console.log(`Le mot "${word}" a été inséré dans la table "${table}"`)}
                return 1
            }
        })
    }

    deleteWord(table, word) { // -1: error, 1: success
        this.client.query(`DELETE FROM words.${table} WHERE word = ('${word}');`, (err, res) => {
            if (err) {
                if (this.DEBUG) {console.log(`Erreur lors de la suppression du mot ${word} dans la table ${table}`)}
                return -1
            }
            else {
                if (this.DEBUG) {console.log(`Le mot "${word}" dans la table "${table}" a été supprimé`)}
                return 1
            }
        })
    }

    async getWordOccurence(table, word) {
        try {
            const res = await this.client.query(`SELECT occurrence FROM words.${table} WHERE word = ('${word}');`);
            const occurrence = res.rows[0].occurrence;
            if (this.DEBUG) { console.log(`Le mot "${word}" dans la table "${table}" a "${occurrence}" occurence(s)`); }
            return occurrence;
        } catch (err) {
            if (this.DEBUG) { console.log(`Impossible de récupérer le nombre d'occurence du mot "${word}" dans la table "${table}"`); }
            return -1;
        }
    }

    async getTotalWords(table) {
        try {
            const res = await this.client.query(`SELECT COUNT(*) FROM words.${table};`);
            const totalMots = res.rows[0].count;
            if (this.DEBUG) { console.log(`La table "${table}" contient "${totalMots}" mot(s)`); }
            return totalMots;
        } catch (err) {
            if (this.DEBUG) { console.log(`Impossible de récupérer le nombre total de mot présent dans la table "${table}"`); }
            return -1;
        }
    }
 
    async getWordContainSyllables(table, syllable) {
        try {
            const res = await this.client.query(`SELECT word, occurrence FROM words.${table} WHERE word LIKE '%${syllable}%' ORDER BY word ASC;`);
            const words = res.rows;
            if (this.DEBUG) { console.log(`Requête succès`); }
            return words;
        } catch (err) {
            if (this.DEBUG) { console.log(`Erreur requête`); }
            return -1;
        }
    }

    /* SYLLABLES */

    addNewSyllable(table, syllable) {
        this.client.query(`INSERT INTO syllables.${table}(syllable) VALUES('${syllable}') 
                           ON CONFLICT (syllable) DO UPDATE SET occurrence = syllables.${table}.occurrence + 1`, (err, res) => {
            if (err) {
                if (this.DEBUG) { console.log(`Erreur lors de l'insertion de la syllabe "${syllable}" dans la table "${table}"`) }
                return -1
            }
            else {
                if (this.DEBUG) { console.log(`La syllabe "${syllable}" a été inséré dans la table "${table}"`) }
                return 1
            }
        })
    }

    deleteSyllable(table, syllable) { // -1: error, 1: success
        this.client.query(`DELETE FROM syllables.${table} WHERE syllable = ('${syllable}');`, (err, res) => {
            if (err) {
                if (this.DEBUG) { console.log(`Erreur lors de la suppression de la syllabe "${syllable}" dans la table "${table}"`) }
                return -1
            }
            else {
                if (this.DEBUG) { console.log(`La syllabe "${syllable}" dans la table "${table}" a été supprimé`) }
                return 1
            }
        })
    }

    async getSyllableOccurence(table, syllable) { // -1: error
        try {
            const res = await this.client.query(`SELECT occurrence FROM syllables.${table} WHERE syllable = ('${syllable}');`)
            var occurrence = res.rows[0].occurrence
            if (this.DEBUG) { console.log(`La syllabe "${syllable}" dans la table "${table}" a ${occurrence} occurence(s)`) }
            return occurrence
        }
        catch (err) {
            if (this.DEBUG) { console.log(`Impossible de récupérer le nombre d'occurence de la syllabe "${syllable}" dans la table "${table}"`) }
            return -1
        }
    }

    async getTotalSyllables(table) {
        try {
            const res = await this.client.query(`SELECT COUNT(*) FROM syllables.${table}`)
            var totalSyllables = res.rows[0].count
            if (this.DEBUG) { console.log(`La table "${table}" contient "${totalSyllables}" syllabe(s)`) }
            return totalSyllables
        } catch (err) {
            if (this.DEBUG) { console.log(`Impossible de récupérer le nombre total de mot présent dans la table "${table}"`) }
            return -1
        }
    }

    async getBestWordWithBonusLetters(table, syllable, oldLetters, wordsAlreadyPut) {
        try {

            let letters = ""

            for (const letter in oldLetters) {
                if (oldLetters.hasOwnProperty(letter)) {
                    if (oldLetters[letter] > 0) {
                        const myLetter = letter;
                        const count = oldLetters[letter];
                        letters += myLetter.repeat(count);
                    }   
                }
            }

            if (letters.length > 8) {
                letters = funct.sortString(table, letters)
                letters = letters.slice(0,8)
            } 


            let query = ''
            if (letters.length > 1) {
                query = `SELECT word,
                                COUNT(DISTINCT letter) as matched_letters,
                                occurrence
                        FROM words.${table}, unnest(regexp_split_to_array(regexp_replace(word,'[^${letters}]','','g'),'')) as letters(letter)
                        WHERE word ~* '(${syllable})' `

            } else {
                query = `SELECT word,
                                COUNT(DISTINCT letter) as matched_letters,
                                occurrence
                        FROM words.${table}, LATERAL (SELECT unnest(regexp_matches(word,'[${letters}]')) as letter) as letters
                        WHERE word ~* '(${syllable})' `

            }

            for (const word of wordsAlreadyPut) {
                query += `AND word != '` + word + `' `
            }

            query += `GROUP BY word, occurrence
                        ORDER BY matched_letters DESC,LENGTH(word), occurrence DESC
                        LIMIT 5`

            const res = await this.client.query(query)
            if (res == null) {
                return 0
            }
            else {
                return res.rows
            }    
        }
        catch (err) {
            return -1
        }
    }

    /* PLAYERS */

    async addRecord(player) {

        const averageWordLength = funct.averageWordLength(player.rankedWords).toFixed(2)
        const currentDate = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')

        this.client.query(`
        WITH ins_player AS(
        INSERT INTO players.player (connectionId, nickname)
            SELECT '${player.auth.id}', '${player.nickname}'
            WHERE NOT EXISTS(
                    SELECT 1 FROM players.player WHERE connectionId = '${player.auth.id}'
                )
            RETURNING connectionId
        )
        INSERT INTO players.records(player_connectionid, totalWords, wpm, reactionTime, precision, averageWordsLength, words,wpms, reactiontimes, precisions, syllables, recordDate)
        SELECT
        COALESCE((SELECT connectionId FROM ins_player), '${player.auth.id}'),
            ${player.totalCorrectWord},
            ${player.getWpmAverage()},
            ${player.getReactionTimeAverage()},
            ${player.getPrecisionAverage()},
            ${averageWordLength},
            '${player.rankedWords}',
            '${player.wpms}',
            '${player.reactionsTimes}',
            '${player.errorsPercentage}',
            '${player.rankedSyllables}',
            '${currentDate}'`, (err, res) => {
            if (err) {
                if (this.DEBUG) { console.log(`Erreur lors de l'insertion du nouveau record de "${player.nickname}"`) }
                return -1
            }
            else {
                if (this.DEBUG) { console.log(`Insertion du nouveau record de "${player.nickname} réalisé avec succès`) }
                return 1
            }
        })
    }

    async showRecord(player, categorie, order, limit) {
        if (categorie == null) { categorie = "recordDate" }
        if (order == null) { order = "DESC" }
        if (limit == null) { limit = 10000 }
        let query = `
        SELECT r.recordDate AS "Date", r.recordid AS "id", r.totalwords AS "Nombre total de mots", r.wpm AS "Vitesse d'écriture moyenne", r.reactionTime AS "Temps de réaction moyen", r.precision AS "Précision moyenne", r.averagewordslength AS "Moyenne longueur des mots"
        FROM players.records r
        JOIN players.player p ON r."player_connectionid" = p.connectionId
        WHERE p.connectionId = '${player.auth.id}'
        ORDER BY TO_DATE(r.${categorie}, 'DD/MM/YYYY') ${order}
        LIMIT ${limit};`

        try {
            const res = await this.client.query(query)
            if (res == null) { return 0 }
            else { return res.rows }
        }
        catch (err) { return -1 }
    }

    async showGlobalRecord(categorie, order, max) {
        if (categorie == null) { categorie = "recordDate" }
        if (order == null) { order = "DESC" }
        let query = `
        SELECT r.recordid AS "id", r.recordDate AS "Date", p.nickname AS "Pseudo", r.totalwords AS "Nombre total de mots", r.wpm  AS "Vitesse d'écriture moyenne", r.reactionTime AS "Temps de réaction moyen", r.precision AS "Précision moyenne", r.averagewordslength AS "Moyenne longueur des mots"
        FROM players.player p
        JOIN players.records r ON r."player_connectionid" = p.connectionId
        JOIN (
          SELECT "player_connectionid", ${max}(${categorie}) AS max_${categorie}
          FROM players.records
          GROUP BY "player_connectionid"
        ) m ON r."player_connectionid" = m."player_connectionid" AND r.${categorie} = m.max_${categorie}
        ORDER BY r.${categorie} ${order};`

        try {
            const res = await this.client.query(query)
            if (res == null) {return 0}
            else {return res.rows}
        }
        catch (err) {return -1}
    }

    async showAllGlobalRecord() {
        let query = `
        SELECT r.recordDate AS "Date", r.recordid AS "id", p.nickname AS "Pseudo", r.totalwords AS "Nombre total de mots", r.wpm  AS "Vitesse d'écriture moyenne", r.reactionTime AS "Temps de réaction moyen", r.precision AS "Précision moyenne", r.averagewordslength AS "Moyenne longueur des mots"
        FROM players.records r
        JOIN players.player p ON r."player_connectionid" = p.connectionId
        ORDER BY TO_DATE(r.recordDate, 'DD/MM/YYYY') DESC;`

        try {
            const res = await this.client.query(query)
            if (res == null) { return 0 }
            else { return res.rows }
        }
        catch (err) { return -1 }
    }

    async getLastRecordId() {
        let query = `
        SELECT MAX(recordid)
        FROM players.records;`
        try {
            const res = await this.client.query(query)
            if (res == null) { return 0 }
            else { return res.rows[0].max }
        }
        catch (err) { return -1 }
    }

    async deleteRecord(recordId) {
        let query = `
        DELETE FROM players.records WHERE recordid = ${recordId};`
        try {
            const res = await this.client.query(query)
            if (res == null) {return 0}
            else {return 1}
        }
        catch (err) { return -1 }
    }

    async showDetailRecord(id) {
        let query = `
        SELECT DISTINCT r.recordid, r.recordDate, p.nickname,r.totalwords, r.wpm, r.reactionTime, r.precision, r.averagewordslength ,r.words , r.syllables, r.wpms, r.reactionTimes, r.precisions
        FROM players.records r
        JOIN players.player p ON r."player_connectionid" = p.connectionId
        WHERE r.recordid = ${id};`

        try {
            const res = await this.client.query(query)
            if (res == null) { return 0 }
            else { return res.rows }
        }
        catch (err) { return -1 }
    }
    close() {
        this.client.end()
    }

}

const dataBase = new Database(false)


module.exports = dataBase;