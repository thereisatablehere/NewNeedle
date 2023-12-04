let parent = document.getElementById("inputsSequences");

let addClickable = true;
let addRef = document.getElementById("addButton");
let anim = {
    frame: 0, 
    // set during reset function (always called before animation)
    frames: 10, 
    // set during reset function (always called before animation)
    offsetChange: -1, 
    currentOffset: 0, 
    reset: function(adding) {
        this.offsetChange = addRef.clientHeight / this.frames;
        this.currentOffset = 0;
        this.frame = 0;
    }, 
    animate: function(adding) {
        addClickable = false;
        removeClickable = false;
        this.reset(adding);
        animation(adding);
    }
}

let removeClickable = false;
let removeRef = document.getElementById("removeButton");

function removeSequence() {
    if(removeClickable) {
        anim.animate(false);
    }
}

function animation(adding) {
    // if removing, remove element at start of animation: 
    if(!(adding) && anim.frame == 0) {
        if(parent.children.length > 2) {
            parent.removeChild(parent.lastElementChild);
        }
        // don't play animation if not removing anything because only 2 sequence inputs
        else {
            anim.frame = anim.frames;
        }
    }
    // normal animation
    if(anim.frame < anim.frames) {
        ++anim.frame;
        anim.currentOffset += anim.offsetChange;

        negative = adding ? 1 : -1;

        addRef.style.transform = "translateY(" + (anim.currentOffset * negative) + "px)";
        removeRef.style.transform = "translateY(" + (anim.currentOffset * negative) + "px)";

        if(!(adding) && (anim.frame == 4)) {
            anim.frame = anim.frames;
        }

        window.setTimeout(()=>{animation(adding)}, 1000/60);
    }
    // animation finished
    else {
        if(adding) {
            let element = document.createElement("input");
            parent.appendChild(element);    
            // add input validation function to input
            element.addEventListener("input", function(){
                validateInputSequence(element, true)
            });
        }

        removeRef.style.transform = "none";
        addRef.style.transform = "none";

        addClickable = true;
        removeClickable = true;
    }
}

function addSequence() {
    if(addClickable) {
        anim.animate(true);
    }
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