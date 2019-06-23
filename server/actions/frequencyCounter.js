const readFile = require('./fileOperations').readFile;

function countTopWords (wordCountMap, noOfWords) {
    try {
        /** Get top n words */
        return Promise.resolve({ data: [...wordCountMap].slice(0, noOfWords) });
    } catch (error) {
        return Promise.reject(error);
    }
}

function convertIntoObject ({ data }) {
    let result = [];
    for (const array of data) {
        result.push({ word: array[0], frequency: array[1] });
    }
    return Promise.resolve({ data: result });
}

function frequencyCount (noOfWords) {
    console.log(`Fetching top ${noOfWords} words...`);
    return new Promise((resolve, reject) => {
        const wordCountMap = require('./fileOperations').wordCountMap;
        countTopWords(wordCountMap, noOfWords)
            .then(convertIntoObject)
            .then(resolve)
            .catch(reject);
    });
}

module.exports = {
    countTopWords,
    convertIntoObject,
    frequencyCount
};