const https = require('https');

function readFile(filename) {
    return new Promise((resolve, reject) => {
        try {
            /** Read file from server */
            https.get(filename, (response) => {
                let body = '';
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => {

                    /** On complete response */
                    const data = body.toString();

                    /** Replace new lines and extra spaces by single space and then convert string into array of words by spliting at space */
                    let dataArray = data.replace(/\n/g, ' ').replace(/  +/g, ' ').split(' ');

                    /** Convert array into a Map with word and wordCount */
                    const mostFrequent = dataArray => {
                        const result = new Map();
                        for (const word of dataArray) {
                            result.set(word, (result.get(word) || 0) + 1);
                        }
                        return result;
                    };
                    let wordCountMap = mostFrequent(dataArray);

                    /** Sort map by count */
                    wordCountMap = [...wordCountMap].sort((a, b) => { return b[1] - a[1]; });
                    resolve(wordCountMap);
                });
            });
        } catch (error) {
            console.log('Error fetching file', error);
            reject(error);
        }
    });
}
module.exports = {
    readFile
};