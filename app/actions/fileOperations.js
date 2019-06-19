const https = require('https');

function readFile(filename) {
    return new Promise((resolve, reject) => {
        try {
            https.get(`https://terriblytinytales.com/${filename}`, (response) => {
                let body = '';
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => resolve({ data: body.toString() }));
            });
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    readFile
};