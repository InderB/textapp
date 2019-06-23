const FrequencyCounterService = require('../server/actions/frequencyCounter');

describe('FrequencyCounter', () => {
    const wordCount = 3;
    let wordMap = new Map();
    wordMap.set('A', 20);
    wordMap.set('B', 18);
    wordMap.set('C', 16);
    wordMap.set('D', 14);

    const resultMap = [...wordMap].slice(0, wordCount);

    const result = [
        { word: 'A', frequency: 20 },
        { word: 'B', frequency: 18 },
        { word: 'C', frequency: 16 },
    ];

    it('Frequency service count top words function', () => {
        FrequencyCounterService.countTopWords(wordMap, wordCount)
            .then(data => {
                expect(data.data.length).toBe(wordCount);
                expect(data.data).toEqual(resultMap);
            })
            .catch(error => expect(error).toThrowMatching(error));
    });

    it('Frequency service convert into object function', () => {
        FrequencyCounterService.convertIntoObject({ data: resultMap })
            .then(data => {
                expect(data.data.length).toBe(wordCount);
                expect(data.data).toEqual(result);
            })
            .catch(error => expect(error).toThrowMatching(error));
    });
});