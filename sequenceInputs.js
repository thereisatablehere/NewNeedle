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
        validateInputSequence(element)
    });
}

const acceptedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-";
function test(){console.log("test");}
/**
 * This function basically validates input sequences to ensure only 
 * letters and dashes are allowed, and converts all letters to uppercase.
 * This function is performed after each time an input is changed.
 * 
 * @param input html input element
 */
function validateInputSequence(input) {
    let sequence = input.value;

    if(sequence.length > 0) {
        let valid = false;

        // have to do try catch because when checking plus sign, there is a reg ex error
        try {
            let check = acceptedChars.search((sequence[sequence.length - 1]).toUpperCase());
            
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