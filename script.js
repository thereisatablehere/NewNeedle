let sequences = ["GCATGCG", "GATTACA", "AT-AT", "AAT"];
// let sequences = ["GCATGCG", "GATTACA", "AT-AT"];

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
let content = [];
// plus 1 on each size for margin that goes 0, -1, -2, etc
let horizontalSize = maxLength + lefts.length + 1;
let verticalSize = maxLength + tops.length + 1;

for(let y = 0; y < verticalSize; y++) {
    let row = [];

    for(let x = 0; x < horizontalSize; x++) {
        row.push("");
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

// add top descending numbers legend
for(let x = 0; x <= tops[0].length; x++) {
    content[tops.length][lefts.length + x] = parseInt(x * -1);
}

// add left descending numbers legend
for(let y = 0; y <= lefts[0].length; y++) {
    content[tops.length + y][lefts.length] = parseInt(y * -1);
}

function Score() {
    this.diagonals = [];
    this.tops = [];
    this.lefts = [];
}

// add placeholder scores
// total scores based off of n(n-1) / 2
let scoreTopsCount = (tops.length * (tops.length - 1)) / 2;
let scoreLeftsCount = (lefts.length * (lefts.length - 1)) / 2;

let scoreDiagonalsCount = ((tops.length + lefts.length) *((tops.length + lefts.length) - 1)) / 2;
scoreDiagonalsCount -= scoreTopsCount + scoreLeftsCount;

xPos = 0;
yPos = 0;

for(let y = 0; y < lefts[0].length; y++) {
    let score = new Score();

    for(let j = 0; j < scoreDiagonalsCount; j++) {
        score.diagonals.push(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    }

    for(let j = 0; j < scoreTopsCount; j++) {
        score.tops.push(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    }

    for(let j = 0; j < scoreLeftsCount; j++) {
        score.lefts.push(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    }

    for(let x = 0; x < tops[0].length; x++) {
        content[tops.length + 1 + y][lefts.length + 1 + x] = score;
    }

}

// add content as divs
let ref = document.querySelector("table");

for(let y = 0; y < content.length; y++) {
    let row = document.createElement("tr");
    row.className = "row";

    for(let x = 0; x < content[y].length; x++) {
        let data = document.createElement("td");
        row.className = "cell";

        // contains scores
        if(typeof content[y][x] == "object") {
            let div = document.createElement("div");
            div.className = "scoreCell";

            // diagonals scores
            let element = document.createElement("p");
            element.innerHTML = "";
            for(let i = 0; i < content[y][x].diagonals.length; i++) {
                let hoverable = document.createElement("p");
                
                hoverable.className = "hoverable";
                hoverable.innerHTML = content[y][x].diagonals[i];
                if(i < content[y][x].diagonals.length - 1) {
                    hoverable.innerHTML += "|";
                }

                hoverable.onmouseover = function() {
                    document.getElementById("inspectingDiv").innerHTML = 
                    "<div>Diagional</div>" + 
                    "(L" + (x + i) + 
                    ", T" + (y + i) + ")";
                }

                element.appendChild(hoverable);
                
            }
            div.appendChild(element);

            // lefts scores
            element = document.createElement("p");
            element.innerHTML = "";
            for(let i = 0; i < content[y][x].lefts.length; i++) {
                let hoverable = document.createElement("p");
                
                hoverable.className = "hoverable";
                hoverable.innerHTML = content[y][x].lefts[i];
                if(i < content[y][x].lefts.length - 1) {
                    hoverable.innerHTML += "|";
                }

                hoverable.onmouseover = function() {
                    document.getElementById("inspectingDiv").innerHTML = 
                    "<div>Left</div>" + 
                    "(L" + (x + i) + 
                    ", L" + (y + i) + ")";
                }

                element.appendChild(hoverable);
                
            }
            div.appendChild(element);

            // tops scores
            element = document.createElement("p");
            element.innerHTML = "";
            for(let i = 0; i < content[y][x].tops.length; i++) {
                let hoverable = document.createElement("p");
                
                hoverable.className = "hoverable";
                hoverable.innerHTML = content[y][x].tops[i];
                if(i < content[y][x].tops.length - 1) {
                    hoverable.innerHTML += "|";
                }

                hoverable.onmouseover = function() {
                    document.getElementById("inspectingDiv").innerHTML = 
                    "<div>Top</div>" + 
                    "(T" + (x + i) + 
                    ", T" + (y + i) + ")";
                }

                element.appendChild(hoverable);
                
            }
            div.appendChild(element);

            data.appendChild(div);
        }
        // sequence character or descding numbers legend
        else if(content[y][x].length > 0 || content[y][x] <= 0) {
            data.innerHTML = content[y][x];

            // add classes for styling
            if(content[y][x].length > 0) {
                data.classList.add("sequence");
            }
            else {
                data.classList.add("descend");
            }
        }
        else {
            data.innerHTML = ".";
        }

        row.appendChild(data);
    }

    ref.appendChild(row);

}

console.log("CONTENT");
console.log(content);