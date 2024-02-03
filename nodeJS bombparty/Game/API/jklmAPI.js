const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const regex = /\[\"rresp\",\"(.*?)\",null,120/;

async function getRooms() {
    return axios.get('https://jklm.fun/api/rooms')
        .then(response => {
            var arrayRooms = []
            for (const [key, rooms] of Object.entries(response.data)) {
                for (const [key, room] of Object.entries(rooms)) {
                    arrayRooms.push(room)
                }
            }
            return arrayRooms
        })
        .catch(error => {
            return -1;
        });
}

async function joinRoom(room) {

    const data = { roomCode: room };

    return axios.post('https://jklm.fun/api/joinRoom', data, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

        }
        })
        .then(response => {  
            if (response.data.errorCode == 'noSuchRoom') {
                return 0
            }
            else {
                return response.data["url"].replace("https", "wss")
            } 
        })
        .catch(error => {
            console.log(error)
            return -1;
        });
}

async function bypassAntiBotToken() {


    
   
    const ar = "1"
    const k = "6LdzYGslAAAAACxOZaQA5J0CxlfdJQUdWvJYoAFM"
    const co = "aHR0cHM6Ly9qa2xtLmZ1bjo0NDM."
    const v = "Ya-Cd6PbRI5ktAHEhm9JuKEu"
    const vh = "-14784349052"
    const hl = "fr"
    const reason = "q"
    const size = "invisible"
    const cb = "z2sorkb6kn2o"
    const bg = "!yc-gz8oKAAQeAvdebQEHDwGYTNF9LK-KWjciQPL4zN25FhPrWHrq4raXKAQyDQLfZdnQms-A0s5RYoW0oXf2yphvDAr4vN0O8ZP6ynYL0InZZKN6QTklSvJIYemu4ixmOC-wg0xMJZDuAl9M71tgPbWAi4fyYNIyNl7SsAma_p9_LRBXL2kpwZJMPKPv7Tmf2EDwsN5mhfAl9Eoxc2a3hJpCHdcuUN3Nd6RPSdXphaNEbjotJlmhni5kXcwn1oMlfV8T8X4xeATJQQEO4Q76n4Eselkr-9FUvfu1CpM8H7Ai_R5Dbp9jWglJzOfs1jeZ1bmmZr6MWEDa_qvjo9IWe5932_s2o48wpxrFIwVRriGv1zigk1KNJtbfkesZ1awaJVa2-X6kCXO57tr5eVjxXYKruG0SCxgvo2vHNz2BtruLdcqbPH9XEtGu3kGwMClrfksQD4WbCeMIzajtZ02DUtDB3EEsm77GFOGArczYx423rFFWAKFq2S4zXeHuDAmEVT1hwjRtMMiZ3Fp47NA2ke-Z96CBOMvU8_b9BpQru94xvjEemvlTm6BVnADW4-QzPvF2ArapuqFpmwbvPist9q5bEboMtcH2W-o1mOBgwdwLf7Szj2rCKYBnVJhK13DM-pLWG4IK5WqbPTUzdPN_wQyFMs_1d_JllXiU_-RvjzRBS3Y0CEIvDKySSSndYnLh_6A5em-BFMg4gaRTgVwTvF1Lyv72Ff_BXwuYyKgXNX3Xl8_rBGUDogYv5RHGvduiXb_lJL-qtdf-sfp0OhRYCDYPGdbpi7Q2vrgvbTGjCrvqxQvnF76kcbKoQfzdCu03TuCmZ81zO8BfVTXgubjhyZvi6A*"

    const urlGET = "https://www.google.com/recaptcha/api2/anchor?ar=" + ar + "&k=" + k + "&co=" + co + "&hl=" + hl + "&v=" + v + "&size=" + size + "&cb=" + cb
    const urlPOST = "https://www.google.com/recaptcha/api2/reload?k=" + k

    // Récupération du token
    return axios.get(urlGET, {
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'fr-FR,fr;q=0.3,en-US;q=0.2,en;q=0.1',
            'Cookie': '__Secure-3PAPISID=0dISd_Nn1o39xA_A/A03TEn0lLngS_Xtk_; __Secure-3PSID=ZAjsf6DHeNrHJHzR1T7dgMSmJJID0LsLbSfm87WVu1TvwRYr2l1qSKyP-dVsOxpa7gPIuQ.; NID=511=VQTgFXHbGkXSNUTsKGwf7mrlUqFF0BGpR3yga6oxVP2ikbM0bQRZReOeh6mjepKErVPbzDbQ0ns2y9w1Jbw2lhJOzjOce9f2_MX_pSV3FBkzmd3PDOgqGd3R_74tXyZekYRCHkVTc9RO3pC3J0h3aBf64UcapvbQxMijDC0mlSNYysJbWs5yCJGxpfeBvblHuhvjHg8HAJjaVUG6gutQOVRPrfN8eGCqFRApdWX2br9DmzU5S6Q8DzzTRQPCRcHgViMMrYhC8RaM-pS-qgK0cJxX3By7ZSAc85h0prc6t-lTl60E4p1r0aip7cV88lt0FxjZCzWDQCETqH62lk-8cDE415b9HvevO4X_KvOefq0WCkJDJlAKtucGG9rWXcrQ46CLMpxVNMnkLLbA7j8opZAxyGSNoVzjiozUMA2QCeFOAUF1lb2FQqlfYR5x3Ow-iKVu_3KC9ri8u4LnLgRv_-UD64o-8GuNN_kQSxA4LI76KhfAvamy5kr3MbJLJcvw1pD7Sk5timyuOuK5TnR_HJxv4ZwF1lZuWA; __Secure-3PSIDTS=sidts-CjEBPu3jIXirUqgVJYqkc24avYzsZka_FCfl0DtvFDSCALMubWgPwULpYvju49ceaPS0EAA; __Secure-3PSIDCC=APoG2W9Y9PqTPIXSCLU0TXM-55W51HwBHa4heWyb-fvRNAPVxCGW7SbAqMR0FzomcNLGPFV0kTw',
            'Referer': 'https://jklm.fun/',
            'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'Sec-Ch-Ua-Mobile':'?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'iframe',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        }
        })
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            token = $('input').attr('value');

            // Envoi des données
            const formData = new FormData();
            formData.append('v', v);
            formData.append('reason', reason);
            formData.append('c', token);
            formData.append('k', k);
            formData.append('co', co);
            formData.append('vh', vh);
            formData.append('bg', bg);

            return axios.post(urlPOST, formData, {
                headers: {

                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Content-Type': 'application/x-protobuffer',
                    'Cookie': '__Secure-3PAPISID=0dISd_Nn1o39xA_A/A03TEn0lLngS_Xtk_; __Secure-3PSID=ZAjsf6DHeNrHJHzR1T7dgMSmJJID0LsLbSfm87WVu1TvwRYr2l1qSKyP-dVsOxpa7gPIuQ.; NID=511=VQTgFXHbGkXSNUTsKGwf7mrlUqFF0BGpR3yga6oxVP2ikbM0bQRZReOeh6mjepKErVPbzDbQ0ns2y9w1Jbw2lhJOzjOce9f2_MX_pSV3FBkzmd3PDOgqGd3R_74tXyZekYRCHkVTc9RO3pC3J0h3aBf64UcapvbQxMijDC0mlSNYysJbWs5yCJGxpfeBvblHuhvjHg8HAJjaVUG6gutQOVRPrfN8eGCqFRApdWX2br9DmzU5S6Q8DzzTRQPCRcHgViMMrYhC8RaM-pS-qgK0cJxX3By7ZSAc85h0prc6t-lTl60E4p1r0aip7cV88lt0FxjZCzWDQCETqH62lk-8cDE415b9HvevO4X_KvOefq0WCkJDJlAKtucGG9rWXcrQ46CLMpxVNMnkLLbA7j8opZAxyGSNoVzjiozUMA2QCeFOAUF1lb2FQqlfYR5x3Ow-iKVu_3KC9ri8u4LnLgRv_-UD64o-8GuNN_kQSxA4LI76KhfAvamy5kr3MbJLJcvw1pD7Sk5timyuOuK5TnR_HJxv4ZwF1lZuWA; __Secure-3PSIDTS=sidts-CjEBPu3jIXirUqgVJYqkc24avYzsZka_FCfl0DtvFDSCALMubWgPwULpYvju49ceaPS0EAA; __Secure-3PSIDCC=APoG2W9Y9PqTPIXSCLU0TXM-55W51HwBHa4heWyb-fvRNAPVxCGW7SbAqMR0FzomcNLGPFV0kTw',
                    'Origin': 'https://www.google.com',              
                    'Referer': urlGET,
                    'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'Sec-Ch-Ua-Mobile':'?0',
                    'Sec-Ch-Ua-Platform': '"Windows"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',                
                }           
            });
        })
        .then(response => {
            const result = regex.exec(response.data);
            const recaptcha = result[1];
            return recaptcha
        })
        .catch(error => {
            return -1
        });
    
    
    /*


    ac.setAPIKey('ae2d88cbfdcdcbad3baa6a3a13643f7e');
    ac.setSoftId(0);

    try {
        const gresponse = await ac.solveRecaptchaV3(
            'https://jklm.fun/',
            '6LdzYGslAAAAACxOZaQA5J0CxlfdJQUdWvJYoAFM',
            0.7, // minimum score required: 0.3, 0.7 or 0.9
            'joinRoom'
        );
        console.log('g-response: ' + gresponse);
        return gresponse;
    } catch (error) {
        console.error('Error:', error);
        return -1;
    }*/
        
}

module.exports = { getRooms, joinRoom, bypassAntiBotToken };
