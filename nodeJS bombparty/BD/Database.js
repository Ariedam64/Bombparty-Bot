const pgConfig = require('./Connection/configuration.js')
const { Client } = require('pg')
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

    async getBestWordWithBonusLetters(table, syllable, letters, wordsAlreadyPut) {
        try {

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


    close() {
        this.client.end()
    }

}

const dataBase = new Database(false)


module.exports = dataBase;