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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'

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
    const v = "pCoGBhjs9s8EhFOHJFe8cqis"
    const chr = encodeURIComponent("[22,81,69]");
    const vh = "-958022297"
    const hl = "fr"
    const sa = "joinRoom"
    const reason = "q"
    const size = "invisible"
    const cb = "2ng0aiqri2s2"
    const bg = "!9vCg8PUKAAQeDgRLbQEHDwJW_h9CUMV9s59RB91OWQP8SrIgiue_Y33E2tY2Extcq_lYxmL6XIgTeXx1DECH2rKL6ozd1dP9iKguRVe4ULcnEUKEbr9YzMYImucMrwidEXfgTykCxjnuQ-01V0XL0uUOpGQuINs_m4eSRd3m3BL5FOcYIYX-s5AQKfddiu2TCeI5kEH1hOu3WwboFsC8hoSLKDBd7h5G1653Q6YcYcCM7FqVn3bhL1D8nJ3mcVvNdc_Rvxt6bb7U-8vT9-rW3Jc1Hk_aGDWs3eJ3mSoEEx9O2Dmoy3Lelf5t4Su8iowXURl_gc87O_c0WT2_wTrtSu1gPdBvLCKFstX4ckmYwRtxVJfP57Eb0QgSths77Erm6GNKgJhNvl5-8GG2vn9pvuhNBhQadPsSmPlerBXjDHtFrmD1NREh8-sxi8gT8gatFYmZ7BiPhuIsPE4S8uG-cqSBzEGrNQ9F30qQNgW_PrPWCSJ2a_66dhpMSU4XLgq7YrqPNYxNJq3ViPZCQ2clN-6Ss_d5eos1z9nIhJ9ttWYd_rsEj4ciWZlBQLXR4rPkSqu_WYM8vGehTHooXU4YQKBNcC8yHfyh6krQ8YESdJTdsrsOt9H4qg-kw9v665Oya-1YFISIjWMWvIltJWoqiUiTaOf5Pwvd7J9lprrC3cpXOv7YoEzx7vFX8PRRvSJjJ4ixsNsZV2U-1d1Yj3dhngPeL5bG_u2TMZcr6RjERReB6WJBEgwIGdYiTaqngZzbeBLz0SEtZELdrXMaapyIH-ujwqeLeVC1QWBmMoz271g2kW6dZ28wrZwAFi_qlFzQ_GbUFVHWO3gMkMqmu6O62fI*"

    const urlGET = "https://www.google.com/recaptcha/api2/anchor?ar=" + ar + "&k=" + k + "&co=" + co + "&hl=" + hl + "&v=" + v + "&size=" + size + "&cb=" + cb
    const urlPOST = "https://www.google.com/recaptcha/api2/reload?k=" + k

    // Récupération du token
    return axios.get(urlGET, {
        headers: {
            'Accept': 'text/h:tml,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
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
            'X-Client-Data': 'CJS2yQEIpbbJAQipncoBCIWHywEIlqHLAQiLq8wBCIWgzQEIsr3NARjWnc0B',  
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
            formData.append('sa', sa);
            formData.append('chr', chr);
            formData.append('vh', vh);
            formData.append('bg', bg);

            return axios.post(urlPOST, formData, {
                headers: {

                    'Accept': '*/*',
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
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
                    'X-Client-Data': 'CJS2yQEIpbbJAQipncoBCIWHywEIlqHLAQiLq8wBCIWgzQEIsr3NARjWnc0B',                  
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
}

module.exports = { getRooms, joinRoom, bypassAntiBotToken };
