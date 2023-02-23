const axios = require('axios');
const config = require('../PasteBin/configuration');

async function pasteMessage(message) {
    try {
        const options = {
            url: 'https://api.paste.ee/v1/pastes',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': config.dev_key
            },
            data: {
                description: "BombParty messages",
                sections: [
                    {
                        name: 'BombParty messages',
                        contents: message
                    }
                ]
            }
        };

        const response = await axios(options);
        return response.data.link;
    } catch (error) {
        throw error;
    }
}

module.exports = { pasteMessage };