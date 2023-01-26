const request = require('request');
const config = require('../PasteBin/configuration')



function pasteMessage(message) {

    return new Promise(function (resolve, reject) {


        const options = {
            url: 'https://api.paste.ee/v1/pastes',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': config.dev_key
            },
            json: {
                description: "BombParty messages",
                sections: [
                    {
                        name: 'BombParty messages',
                        contents: message
                    }
                ]
            }
        };

        request(options, (err, res, body) => {
            if (err) {
                reject(err.error);
            } else {
                resolve(body.link);
            }
        });
    })
}

module.exports = { pasteMessage }