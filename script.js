let sequences = ["GCATGCG", "GATTACA", "AT-AT", "AAT"];

let tops = [];
let lefts = [];

/**
 * Find longest sequence and put at top so that the longer sequences will be horizontal and not vertical
 */
let index = -1;
let maxLength = -1;

for(let sequence of sequences) {
    if(sequence.length > maxLength) {
        maxLength = sequence.length;
        index = sequences.indexOf(sequence);

        length = 0;
    }
}

tops.push(sequences[index]);
sequences.splice(index, 1);

// add remaining sequences
let topWasLast = true;

for(let sequence of sequences) {
    // add gap(s) at end if length less than longest sequene
    let formattedSequence = sequence;

    if(sequence.length < maxLength) {
        let difference = maxLength - sequence.length;

        for(let i = 0; i < difference; i++) {
            formattedSequence += "-";
        }
    }

    if(topWasLast) {
        lefts.push(formattedSequence);
    }
    else {
        tops.push(formattedSequence);
    }

    topWasLast = !(topWasLast);
}

console.log("TOPS");
console.log(tops);
console.log("LEFTS");
console.log(lefts);

// set up content grid
let ref = document.getElementById("mainContainer");

let content = [];
// plus 1 on each size for margin that goes 0, -1, -2, etc
let horizontalSize = maxLength + lefts.length + 1;
let verticalSize = maxLength + tops.length + 1;

for(let y = 0; y < verticalSize; y++) {
    let row = [];

    for(let x = 0; x < horizontalSize; x++) {
        row.push(1);
    }

    content.push(row);
}

// add tops
let xStart = lefts.length + 1;
let yPos = 0;

for(let top = 0; top < tops.length; top++) {
    for(let i = 0; i < tops[top].length; i++) {
        content[yPos][xStart + i] = tops[top][i];
    }

    ++yPos;
}

// add lefts
let yStart = tops.length + 1;
let xPos = 0;

for(let left = 0; left < lefts.length; left++) {
    for(let i = 0; i < lefts[left].length; i++) {
        content[yStart + i][xPos] = lefts[lefts.length - 1 - left][i];
    }

    ++xPos;
}

console.log(content);