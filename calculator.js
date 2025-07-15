const screenLabel = document.getElementById("screenLabel");
let equationTokens = [];

function UpdateScreen(stringInput){
    const inputIsModifier = stringInput[0] === " ";
    if(equationTokens.length === 0){
        if(!inputIsModifier){
            equationTokens.push(stringInput);
        }

        screenLabel.innerText = equationTokens.join();
        return;
    }

    let latestToken = equationTokens[equationTokens.length-1];
    const latestIsModifier = latestToken[0] === " ";
    
    //adding to a number
    if(!inputIsModifier && !latestIsModifier){
        equationTokens[equationTokens.length-1] = latestToken + stringInput;
    }
    //adding a mod to a 2 part equation
    else if(equationTokens.length === 3 && inputIsModifier){
        let result = Operate();
        equationTokens.length = 0;
        equationTokens.push(result, stringInput);
    }
    //adding a number or a mod after the opposite
    else if((latestIsModifier && !inputIsModifier) || (!latestIsModifier && inputIsModifier)){
        equationTokens.push(stringInput);
    }
    //replace existing mod with a new mod
    else if(latestIsModifier && inputIsModifier){
        equationTokens[1] = stringInput;
    }

    screenLabel.innerText = equationTokens.join(" ");
}

function ClearScreen(){
    currEquation = "";
    screenLabel.innerText = currEquation;
}

function Operate(){
    if(equationTokens.length == 3){
        const a = Number(equationTokens[0]);
        const b = Number(equationTokens[2]);
        const modifier = String(equationTokens[1]).trim();

        switch(modifier){
            case "+":
                return a+b;
            case "-":
                return a-b;
            case "x":
                return a*b;
            case "/":
                return a/b;
        }
    }
    else{
        return "";
    }
}

const numberButtons = document.getElementsByClassName("numbers");
const modifierButtons = document.getElementById("modifiers").children;
let allButtons = [...numberButtons,...modifierButtons];

allButtons.forEach(button => {
    button.addEventListener("click", () =>{
        UpdateScreen(button.classList[0] == "numbers" ? button.innerText : " " + button.innerText + " ");
    })
});

document.getElementById("btnClear").addEventListener("click", () =>{
    ClearScreen();
    equationTokens.length = 0;
});

document.getElementById("btnEquals").addEventListener("click", () =>{
    const result = Operate();
    if(result != ""){
        screenLabel.innerText = result;
        equationTokens.length = 0;
        equationTokens.push(result);
    }
});
