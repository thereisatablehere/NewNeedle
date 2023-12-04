let parent = document.getElementById("inputs");

function removeSequence() {
    if(parent.children.length > 2) {
        parent.removeChild(parent.lastElementChild);
    }
}

function addSequence() {
    let element = document.createElement("input");
    parent.appendChild(element);    
    // add input validation function to input
    element.addEventListener("input", function(){
        validateInputSequence(element, true)
    });
}

const acceptedCharsSequence = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-";
const acceptedCharsScore = "-0123456789";
/**
 * This function validates input sequences to ensure only 
 * accepted input characters are allowed.
 * This function is performed after each time an input is changed.
 */
function validateInputSequence(input, isSequence) {
    let sequence = input.value;

    if(sequence.length > 0) {
        let valid = false;

        // have to do try catch because when checking plus sign, there is a reg ex error
        try {
            let check = "";
            if(isSequence) {
                check = acceptedCharsSequence.search((sequence[sequence.length - 1]).toUpperCase());
            }
            else {
                check = acceptedCharsScore.search((sequence[sequence.length - 1]).toUpperCase());
            }
            
            if(check > -1) {
                valid = true;
            }
        }
        catch(e) {
            // not necessary, but having empty catch seems weird
            valid = false;
        }

        // inputed sequence up until, but not including, last character
        let first = sequence.slice(0, sequence.length - 1);

        if(valid) {
            let adjustedChar = (sequence[sequence.length - 1]).toUpperCase();

            input.value = first + adjustedChar;
        }
        else {
            input.value = first;
        }
    }
}