import { INCHES_IN_FT, DINO_JSON } from '../constants';

/**
 * @description fetch dino json then return data
 * @return {promise} response object
 */
const fetchJSONData = () => {
    return fetch(DINO_JSON)
        .then((response) => {
            // return if problem
            if (response.status !== 200) {
                throw new Error("Looks like there was a problem. Status Code: " +
                    response.status);
            }
            return response.json();
        })
        .catch((err) => {
            throw new Error(err);
        });
};

/**
 * @description helper to convert ft and inches to inches only
 * @return {int} height in inches
 */
const convertToInches = (ft, inches) => {
    return (ft*INCHES_IN_FT) + inches;
};

/**
 * @description shuffle the passed array
 */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export {
    fetchJSONData, convertToInches, shuffleArray
};

// Comment: Could load JSON with good old XML, but fetch is much cleaner
//
// let data = {};
// let loadJSON = (callback) => {
//     let xobj = new XMLHttpRequest();
//     xobj.overrideMimeType('application/json');
//     xobj.open('GET', 'dino.json', true);
//     xobj.onreadystatechange = () => {
//         if (xobj.readyState === 4 && xobj.status === 200) {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             data = callback(xobj.responseText);
//             generateGridItems();
//         }
//     };
//     xobj.send(null);
// }
// loadJSON((data) => {
//     return JSON.parse(data)['Dinos'];
//
// });
