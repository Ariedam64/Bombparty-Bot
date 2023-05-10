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

    return axios.post('https://jklm.fun/api/joinRoom', data)
        .then(response => {  
            if (response.data.errorCode == 'noSuchRoom') {
                return 0
            }
            else {
                return response.data["url"].replace("https", "wss")
            } 
        })
        .catch(error => {
            return -1;
        });
}

async function bypassAntiBotToken() {

    const ar = "1"
    const k = "6LdzYGslAAAAACxOZaQA5J0CxlfdJQUdWvJYoAFM"
    const co = "aHR0cHM6Ly9qa2xtLmZ1bjo0NDM."
    const v = "4q6CtudrwcI-LSEYlfoEbDXg"
    const chr = encodeURIComponent("[46,56,5]");
    const vh = "-1215003485"
    const hl = "fr"
    const size = "invisible"
    const cb = "cam9z03irula"
    const bg = "!vbugu74KAAQeHKSgbQEHDwHU-jiEy005uwD4yuExftSt995P2-zvcwfo1Fot8L3AyAven5uCgKEVmGp8yZhU62QqF2qS-ELY7MWrHN-3H9_mQ7tdX-ZU6n6Wo72PzRXpPf2tAQEe1aBYMN2trLWtStjfmVSBv5KyxnGhGYilxKxYs4tB7jcAahv0iIgxNGZPlLMEnyCbGtYg0-ScDCBM6l7cf5mQ_irk4qKVZWczemajKdxtOHrgkAEOr4wevt9vpWRx0TI16ZDvc1l9QQVqAtEwBb5HE00pmAvR2CNmYIY86I3Dbjli4e5vdz2uWS8AEg-iL6NhKoefXP2jY-ee8Ix68DToywWK2PmrDHWezN_8TS_tf_eEpMznBNRO05nGPwJL57sgMC2p6jC2Ghg5KLyJqHYiDn4Ju88lRV4Ivju_gSrvmWyvMS5GX4iQ3kvu0sIcOwFSqhDC0H2iS9gpHQyZVF3z1p3OZeFgJm7bOt7eTkIysFv9AVKvHYbnhfofUcdBnydLZnbk5dBfx_JzsNcFcgZuce-AFimEU-hzoRv1Il0C_vKYoy3AOVjeNOBNEzGwch1dgl99lpFrq2AKSWJCmgQFKweq3dZvYAMBltnszc0GgCsEJBIMJpvO0Nf5zX-DjO8qnAC4RGoqAMT2Z__tg3R6mJXHG5bWZIhnh6YQrsgOUYUDk941O--Jp7RbvzvAywDtOf-zFUofCzTwk64WmRk24-KR2wrJXQxMs4Ujo0ZVA5yhnK7tweSrB4eUZLmdjRKhb4_HZkl_GQSL1GlxPTFWtU8_McRRlGondt_31JdDfq127Gd97Et0Ax2MuJh8fSYDaDcmW0jALJfRHppEMz9CtjznLlaOI2KrXebXmHkXDwH9GaMAKESI7kyGhg*"

    const urlGET = "https://www.google.com/recaptcha/api2/anchor?ar=" + ar + "&k=" + k + "&co=" + co + "&hl=" + hl + "&v=" + v + "&size=" + size + "&cb=" + cb
    const urlPOST = "https://www.google.com/recaptcha/api2/reload?k=" + k

    // Récupération du token
    return axios.get(urlGET, {
        headers: {
            'refer': 'https://jklm.fun/',
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'cookie':'__Secure-3PAPISID=Yi23kzOaz4J8az_6/AgjjGtZWwf48Hb9de; __Secure-3PSID=Vwjsf-MbDt43SOu9pVWcUaeVYkND3CReKySKbTZ_1y-1cbJGOr7IN2dgrZTZdBUBrFx21A.; NID=511=A3v72_UL5ATo0LDUHEyYdz2idRMBxyX_AzvFFRYGqsnTNVEQe-NrXnQke154QVLuWWnqptMH19gOWyiJtfdDC9LF-76qGeLlVqlfr7X6tnb0gJ4SlN0Tr66TY4yiQ93NvqTS3DivAVhiCI21PNFawBRr0XshB4HLJNnsXliur6BUW6CMgvr1l4d0clzINb1xlxnqrz4gRh25-staMOZFh7283PFuoV8s0Gci8BBdgBURpRNEduKHvLJrlV--lYbf70DMwh0DAvtKoAPA-fKgydTPAP6t4rNuFlpltTtAXyoWxCVwHyePFakIrhVZWR8qUs0TtYAFgB0ZpcRw_FcmxANMcraB9MScEEdCVE7J8VowYFOeeMc; __Secure-3PSIDCC=AP8dLtxvjyamf8ety7qRjLbc8C0Vl6hwya20z-wii1DiolCnM0GeTgVjYTqsr7aALDZL_YCQgg'
        }
        })
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            token = $('input').attr('value');

            // Envoi des données
            const formData = new FormData();
            formData.append('v', v);
            formData.append('reason', 'q');
            formData.append('c', token);
            formData.append('k', k);
            formData.append('co', co);
            formData.append('chr', chr);
            formData.append('vh', vh);
            formData.append('bg', bg);

            return axios.post(urlPOST, formData, {
                headers: {
                    'cookie': '__Secure-3PAPISID=Yi23kzOaz4J8az_6/AgjjGtZWwf48Hb9de; __Secure-3PSID=Vwjsf-MbDt43SOu9pVWcUaeVYkND3CReKySKbTZ_1y-1cbJGOr7IN2dgrZTZdBUBrFx21A.; NID=511=A3v72_UL5ATo0LDUHEyYdz2idRMBxyX_AzvFFRYGqsnTNVEQe-NrXnQke154QVLuWWnqptMH19gOWyiJtfdDC9LF-76qGeLlVqlfr7X6tnb0gJ4SlN0Tr66TY4yiQ93NvqTS3DivAVhiCI21PNFawBRr0XshB4HLJNnsXliur6BUW6CMgvr1l4d0clzINb1xlxnqrz4gRh25-staMOZFh7283PFuoV8s0Gci8BBdgBURpRNEduKHvLJrlV--lYbf70DMwh0DAvtKoAPA-fKgydTPAP6t4rNuFlpltTtAXyoWxCVwHyePFakIrhVZWR8qUs0TtYAFgB0ZpcRw_FcmxANMcraB9MScEEdCVE7J8VowYFOeeMc; __Secure-3PSIDCC=AP8dLtx3FI2OgltIz9s0mmKpjHtYOTEkT1C0diAzae8ynJHuuv0sVoxMFL-3-iAGXOiGGGmgTg',
                    'Content-Type': 'application/x-protobuffer',
                    'refer': urlGET,
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
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
