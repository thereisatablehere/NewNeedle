const DEBUG = false;

let pathColor = "#EC407A";

// declared in global scope because both align and addInputsToArray function use it
let sequences = [];

let backtrack = false;

let match = 2;
let mismatch = -1;
let gap = -2;

let yAlignmentSequence = "";
let xAlignmentSequence = "";
let arrowCells = [];
let arrowDirs = [];

// set up content grid
let content = [];

// set up pointer matrix
let pointer = [];
let pRow = [];

function backtracking(tops, lefts, match, mismatch, gap) {
    //Populate grid
    for (let y = 2; y < lefts[0].length + 2; y++){
        for (let x = 2; x < tops[0].length + 2; x++){
            let diagScore = content[y-1][x-1];
            if (content[0][x] == content[y][0]) {
                diagScore += match;
            } else {
                diagScore += mismatch;
            }
            let leftScore = content[y][x-1] + gap;
            let upScore = content[y-1][x] + gap;
            let curScore = Math.max(diagScore, leftScore, upScore);
            content[y][x] = curScore;
        }
    }

    //Get alignment using backtracking
    let yIdx = lefts[0].length + 1;
    let xIdx = tops[0].length + 1;

    while (yIdx >= 2 || xIdx >= 2) {
        if (yIdx >= 2 && xIdx >= 2 && (content[yIdx - 1][xIdx - 1] == content[yIdx][xIdx] - match || content[yIdx - 1][xIdx - 1] == content[yIdx][xIdx] - mismatch)) {
            yAlignmentSequence = content[yIdx][0] + yAlignmentSequence;
            xAlignmentSequence = content[0][xIdx] + xAlignmentSequence;
            yIdx--;
            xIdx--;

            arrowDirs.push("diagonal");
        } else if (yIdx >= 2 && xIdx > 1 && content[yIdx - 1][xIdx] == content[yIdx][xIdx] - gap) {
            yAlignmentSequence = content[yIdx][0] + yAlignmentSequence;
            xAlignmentSequence = "-" + xAlignmentSequence;
            yIdx--;

            arrowDirs.push("top");
        } else {
            yAlignmentSequence = "-" + yAlignmentSequence;
            xAlignmentSequence = content[0][xIdx] + xAlignmentSequence;
            xIdx--;

            arrowDirs.push("left");
        }

        /**
         * found cell that has an arrow going into, 
         * so need to backtrack to cell arrow is from 
         * to place arrow at
         */
        switch(arrowDirs[arrowDirs.length - 1]) {
            case "diagonal":
                arrowCells.push([xIdx + 1, yIdx + 1]);
                break;
            case "left":
                arrowCells.push([xIdx + 1, yIdx]);
                break;
            case "top":
                arrowCells.push([xIdx, yIdx + 1]);
                break;
        }
    }
}

function pointerMatrix(tops, lefts, match, mismatch, gap) {
    pointer[0] = Array(tops[0].length + 1).fill(4);
    for (let i = 1; i < lefts[0].length + 1; i++){
        pRow = Array(tops[0].length + 1).fill(0);
        pRow[0] = 3;
        pointer[i] = pRow;
    }
    

    //console.log(pointer);
    
    //Populate grid
    for (let y = 1; y < lefts[0].length + 1; y++){
        for (let x = 1; x < tops[0].length + 1; x++){
            let diagScore = content[y][x];
            if (content[0][x + 1] == content[y + 1][0]) {
                diagScore += match;
            } else {
                diagScore += mismatch;
            }
            let leftScore = content[y+1][x] + gap;
            let upScore = content[y][x+1] + gap;
            let curScore = Math.max(diagScore, leftScore, upScore);
            content[y+1][x+1] = curScore;
            
            //console.log(y + ", " + x + ", " + pointer[y][x]);
            //Fill pointer matrix
            if (curScore == diagScore) {
                pointer[y][x] += 2;
            }
            //Use higher weights for adding gaps
            if (curScore == upScore) {
                pointer[y][x] += 3;
            }
            if (curScore == leftScore) {
                pointer[y][x] += 4;
            }
            //console.log(y + ", " + x + ", " + pointer[y][x]);
        }
    }

    console.log(pointer);

    //Get alignment through pointer matrix
    let yIdx = tops[0].length;
    let xIdx = lefts[0].length;

    let count = 0;
    while (yIdx > 0 || xIdx > 0) {
        let val = pointer[yIdx][xIdx];
        if (count >= 50) {
            console.log("break");
            break;
        }
        if (val == 2 || val == 5 || val == 6 || val == 9) {
            yAlignmentSequence = content[yIdx + 1][0] + yAlignmentSequence;
            xAlignmentSequence = content[0][xIdx + 1] + xAlignmentSequence;
            yIdx--;
            xIdx--;

            arrowDirs.push("diagonal");
        }
        else if (val == 3 || val == 7) {
            yAlignmentSequence = content[yIdx + 1][0] + yAlignmentSequence;
            xAlignmentSequence = "-" + xAlignmentSequence;
            yIdx--;

            arrowDirs.push("top");
        }
        else if (val == 4) {
            yAlignmentSequence = "-" + yAlignmentSequence;
            xAlignmentSequence = content[0][xIdx + 1] + xAlignmentSequence;
            xIdx--;

            arrowDirs.push("left");
        }
        console.log(yIdx + ", " + xIdx);
        count++;

        /**
         * Found cell that has an arrow going into, 
         * so need to backtrack to cell arrow is from 
         * to place arrow at.
         * Have to offset differently than backtracking, because 
         * cells are different for some reason.
         */
        switch(arrowDirs[arrowDirs.length - 1]) {
            case "diagonal":
                arrowCells.push([xIdx + 2, yIdx + 2]);
                break;
            case "left":
                arrowCells.push([xIdx + 2, yIdx + 1]);
                break;
            case "top":
                arrowCells.push([xIdx + 1, yIdx + 2]);
                break;
        }
    }
    console.log(count);
}

function align() {
    content = [];
    pointer = [];
    pRow = [];

    let tops = [];
    let lefts = [];
    
    let index = -1;
    let maxLength = -1;

    yAlignmentSequence = "";
    xAlignmentSequence = "";    

    // find longest sequence
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

    // add gap(s) at end if length less than longest sequene
    for(let sequence of sequences) {
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
        content[tops.length][lefts.length + x] = parseInt(x * gap);
    }

    // add left descending numbers legend
    for(let y = 0; y <= lefts[0].length; y++) {
        content[tops.length + y][lefts.length] = parseInt(y * gap);
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

    if(backtrack) {
        backtracking(tops, lefts, match, mismatch, gap);
    }
    else {
        pointerMatrix(tops, lefts, match, mismatch, gap);
    }

    // console.log(yAlignmentSequence);
    // console.log(xAlignmentSequence);

    // add content as divs
    let ref = document.querySelector("table");

    console.log(arrowCells);
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
                        hoverable.innerHTML += ",";
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
                        hoverable.innerHTML += ",";
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
                        hoverable.innerHTML += ",";
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
            else {
                data.innerHTML = content[y][x];
                
                let compare = [x, y];
                // let leftOrTopEdge = (x == 2 || y == 2);

                for(let check = 0; check < arrowCells.length; check++) {
                    if((compare[0] == arrowCells[check][0]) && (compare[1] == arrowCells[check][1])/* && !(leftOrTopEdge)*/) {
                        data.style.color = pathColor;
                        data.style.fontWeight = "bold";

                        let temp = data.innerHTML;

                        let arrowElem = document.createElement("p");
                        arrowElem.style.position = "absolute";
                        arrowElem.style.color = pathColor;

                        // arrowElem.innerHTML = "+";
                        switch(arrowDirs[check]) {
                            case "diagonal":
                                arrowElem.innerHTML = "&#x21d6;";

                                arrowElem.style.marginTop = "-10px";
                                arrowElem.style.marginLeft = "-10px";
                                break;
                            case "left":
                                arrowElem.innerHTML = "&#x21d0;";

                                // margin does not work
                                arrowElem.style.paddingTop = "18px";
                                arrowElem.style.marginLeft = "-14px";
                                break;
                            case "top":
                                arrowElem.innerHTML = "&#x21d1;";

                                // margin does not work
                                arrowElem.style.paddingTop = "5px"
                                arrowElem.style.marginLeft = "4px";
                                break;
                        }

                        // special case for bottom-right to move to same position as every other arrow (for some reason starts farther below)
                        if(check == arrowCells.length - 1) {
                            arrowElem.style.marginTop = "-20px";
                        }

                        data.innerHTML = "";
                        data.appendChild(arrowElem);
                        data.innerHTML += temp;

                        arrowCells.splice(check, 1);
                        arrowDirs.splice(check, 1);
                        break;
                    }
                }
                
                // sequence character
                if(content[y][x].length > 0) {
                    data.classList.add("sequence");
                }
                // descending numbers
                else if(x == lefts.length || y == tops.length) {
                    data.classList.add("descend");
                }
            }

            row.appendChild(data);
        }

        ref.appendChild(row);

    }

    // add aligned sequences to html
    document.getElementById("output").style.display = "block";

    ref = document.getElementById("output");

    element = document.createElement("p");
    element.innerHTML = yAlignmentSequence;
    ref.appendChild(element);

    element = document.createElement("p");
    element.innerHTML = xAlignmentSequence;
    ref.appendChild(element);

    console.log("CONTENT");
    console.log(content);
}

// make sure that no score inputs are empty or just -
function validateScoreInputs() {
    let childs = document.getElementById("inputsScores").children;
    for(let i = 0; i < childs.length; i++) {
        if(childs[i].value.length == 0) {
            childs[i].value = 0;
        }
        if(childs[i].value.length == 1) {
            if(childs[i].value == "-") {
                childs[i].value = 0;
            }
        }
    }
}

function addInputsToArray(backtracking) {
    // get sequences from inputs
    let inputs = document.getElementById("inputsSequences").children;
    let noEmptySequences = true;
    sequences = [];

    for(let i = 0; i < inputs.length; i++) {
        sequences.push(inputs[i].value);

        if(inputs[i].value.length < 1) {
            noEmptySequences = false;
            break;
        }
    }
    
    if(noEmptySequences) {
        if(!(DEBUG)) {
            validateScoreInputs();
        }
        // reset stuff
        document.querySelector("table").innerHTML = "";
        document.getElementById("output").innerHTML = "<p style='color: #4FC3F7;'><strong>Aligned Sequences</strong></p>";

        // get scores from inputs
        if(!(DEBUG)) {
            let childs = document.getElementById("inputsScores").children;
            match = parseInt(childs[0].value);
            mismatch = parseInt(childs[1].value);
            gap = parseInt(childs[2].value);
        }

        backtrack = backtracking;
        align();
    }
}

if(DEBUG) {
    sequences = ["GCATGCG", "GATTACA"];
    // sequences = ["ACTGATTCA", "ACGCATCA"];
    // sequences = ["TCCTA", "TCATA"];
    // sequences = ["GCATGCG", "GATTACA", "AT-AT"];
    // sequences = ["GCATGCG", "GATTACA", "AT-AT", "AAT"];
    // sequences = ["GCATGCG", "GATTACA", "AT-AT", "AAT"];
    match = 2;
    mismatch = -3;
    gap = -2;
    backtrack = true;
    align();
}