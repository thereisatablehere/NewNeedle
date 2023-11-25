let c = document.querySelector("canvas");
let r = c.getContext("2d");

let sequences = ["GCATGCG", "GATTACA"];
console.log(sequences);

let tops = [];
let lefts = [];

/**
 * Find longest sequence and put at top so that the longer sequences will be horizontal and not vertical
 */
let index = 0;
let length = 0;
let maxLength = 0;

for(let sequence of sequences) {
    if(length > maxLength) {
        maxLength = length;
        index = sequences.indexOf(sequence);

        length = 0;
    }
}

tops.push(sequences[index]);
sequences.splice(index, 1);

// add remaining sequences
let topWasLast = false;

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

console.log("TOPS", tops);
console.log("LEFTS", lefts);