let sequencesCount = 2;
let parent = document.getElementById("inputs");

function getSequencesCount() {
    sequencesCount = parent.children.length;
}

function removeSequence() {
    if(sequencesCount > 2) {
        console.log("removing");
    }
}

function addSequence() {
    let element = document.createElement("input");
    parent.appendChild(element);    
}
