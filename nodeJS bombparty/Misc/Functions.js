
//Wait until the condition is true
function waitFor(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 500);
    }
    return new Promise(poll);
}

function binarySearch(arr, x) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        if (arr[middle] === x) {
            return middle;
        } else if (arr[middle] < x) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1;
}

function removeSameElements(arr1, set2) {
    return arr1.filter(function (element) {
        return !set2.has(element.word);
    });
}

function getLetterIndex(keyboard, letter) {
    for (let i = 0; i < keyboard.length; i++) {
        for (let j = 0; j < keyboard[i].length; j++) {
            if (keyboard[i][j] === letter) {
                return [i, j];
            }
        }
    }
}

function getCloseLetter(letter) {

    const keyboard = [
        ["&", "é", '"', "'", "(", "-", "è", "_", "ç", "à"],
        ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
        ["w", "x", "c", "v", "b", "n"]
    ];

    let letterIndex = getLetterIndex(keyboard, letter);
    let similarLetters = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let row = letterIndex[0] + i;
            let col = letterIndex[1] + j;
            if (row < 0 || row >= keyboard.length) continue;
            if (col < 0 || col >= keyboard[row].length) continue;
            similarLetters.push(keyboard[row][col]);
        }
    }
    return similarLetters;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function averageWordLength(words) {
    let totalLength = 0;
    for (let i = 0; i < words.length; i++) {
        totalLength += words[i].length;
    }
    return totalLength / words.length;
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

function sortString(table, string) {
    switch (table) {
        case 'fr':
            var order = "eiasrntolucmpdghbfvqj";
            break
        case 'es':
            var order = "eiasrntolucmpdghbfvqj";
            break
        case 'en':
            var order = "eiasrntolucmpdghbfvqj";
            break
            var order = "eiasrntolucmpdghbfvqj";
        case 'de':
            break
        case 'pt':
            var order = "eiasrntolucmpdghbfvqj";
            break
        case 'it':
            var order = "eiasrntolucmpdghbfvqj";
            break
    }
    
    return string.split('')
        .sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .join('');
}

function tableauEnTexte(data) {
    if (data.length < 1) {
        return "";
    }

    const headers = Object.keys(data[0]);

    const lengths = {};
    headers.forEach((header) => {
        lengths[header] = Math.max(
            ...data.map((row) => {
                return String(row[header]).length;
            }),
            header.length
        );
    });

    const separator = headers
        .map((header) => "-".repeat(lengths[header]))
        .join("-+-");

    const headerRow = headers
        .map((header) => header.padEnd(lengths[header]))
        .join(" | ");
    const dataRows = data
        .map((row) => {
            return headers
                .map((header) => String(row[header]).padEnd(lengths[header]))
                .join(" | ");
        })
        .join("\n");

    return `${headerRow}\n${separator}\n${dataRows}`;
}

const chars = ["Ꭺ","Ᏼ","Ꮯ", "Ꭰ", "Ꭼ", "Ꮐ", "Ꮋ","Ꮶ","Ꮮ", "Ꮇ", "Ჿ", "Ꮲ", "Ꮪ", "Ꭲ", "Ꮩ", "Ꮃ","Ꮓ" ];


module.exports = { waitFor, binarySearch, removeSameElements, getLetterIndex, sleep, isInt, getCloseLetter, sortString, chars, averageWordLength, tableauEnTexte }