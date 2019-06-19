const readFile = require('./fileOperations').readFile;

function countTopWords (data, noOfWords) {
    console.log(noOfWords);
    try {
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
        console.log([...wordCountMap].slice(0, noOfWords));
        
        /** Get top n words */
        return Promise.resolve({ data: [...wordCountMap].slice(0, noOfWords) });
    } catch (error) {
        console.log(error);
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
    console.log('Here in service', noOfWords);
    return new Promise((resolve, reject) => {
        readFile('test.txt')
            .then(({ data }) => countTopWords(data, noOfWords))
            .then(convertIntoObject)
            .then(resolve)
            .catch(reject);
    });
    // res.send({ success: true, data: [{ word: 'the', frequency: 100 }, { word: 'was', frequency: 95 } ]});
}

module.exports = {
    frequencyCount
};