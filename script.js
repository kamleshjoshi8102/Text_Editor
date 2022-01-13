
import { Stack } from './stack.js';


// preventing commands inside the editor 
// like copy cut or paste

document.onkeydown = function(event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
    }
};

onload = function () {
    // Get reference to elements
    const textbox = document.getElementById('comment'); // its text box
    const undo = document.getElementById('undo'); // undo button
    const clear = document.getElementById('clear'); // clear button
    const temptext = document.getElementById('temptext'); -// temporary text written previously


    textbox.value = "";
    let text = "";
    let stack = new Stack();

    
    /* 
        here if abcd then he can't go in middle of the string
        it should remain in last charachter of the string


        A new entry is put on the top of stack 
        case    
        1. if size of top is >= buffer new element
        2. if different operation
    */
    textbox.onclick = function () {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };
    

    clear.onclick = function () {
        stack.clear();
        text = "";
        textbox.value = "";
        temptext.innerHTML = "Sequence of operations will be shown here !";
    };


    /*
        if any event is occuring in textbox then we are calling it here 
        and then for inserttext we have different case
        and for delete another case
    */

    textbox.oninput = function(event){
        // console.log(event);
        switch(event.inputType){
            case "insertText":
                stack.push(0, event.data);
                break;
            case "deleteContentBackward":
                stack.push(1, text[text.length-1]);
                break;
        }

        // updating the text box present 

        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;
        text = textbox.value;
    };

    /*


    
    */

    undo.onclick = function () {
        let operation = stack.pop(); // last element is taken 
        if(operation[0]!==-1){ // if it's -1 then undo is performed 
            temptext.innerHTML = "Performing undo operation<br>"+temptext.innerHTML;
            if(operation[0] === 0){ 
                // if it's 0 then we are taking substring and storing values and removing buffer size elements

                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } else{
                textbox.value += operation[1];
            }
            text = textbox.value; // to keep it's track 
        }
    };
};
