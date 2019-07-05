$(document).ready(function(){

const display = document.querySelector(".display");
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const empty = "";



const calculate = function(a,operator,b){
    const firstNum = parseFloat(a);
    const secondNum = parseFloat(b);
    if(operator === "add"){
        return firstNum + secondNum;
    }
    if(operator === "subtract"){
        return firstNum - secondNum
    }
    if(operator === "multiply"){
        return firstNum * secondNum;
    }
    if(operator === "divide"){
        return firstNum / secondNum;
    }
}

// * Detects which key was pressed
    keys.addEventListener("click", function(e){
        if(e.target.matches("button")){
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            const previousKeyType = calculator.dataset.previousKeyType;
            Array.from(key.parentNode.children).forEach(k => k.classList.remove("pressed"))
             // * Detects key press: operator
            if(
                action === "add" ||
                action === "subtract" ||
                action === "multiply" ||
                action === "divide"
                ){
                    const firstValue = calculator.dataset.firstValue;
                    const operator = calculator.dataset.operator;
                    const secondValue = displayedNum;
                    display.textContent = keyContent;
// Note: It's sufficient to check for firstValue and operator because secondValue always exists
                    if(
                        firstValue &&
                        operator &&
                        previousKeyType !== "operator" &&
                        previousKeyType !== "calculate"
                    ){
                        const calcValue = calculate(firstValue,operator,secondValue);
                        display.textContent = calcValue;
                        calculator.dataset.firstValue = calcValue;
                        // * Updates calculated value as firstValue
                    } else {
                        calculator.dataset.firstValue = displayedNum;
                        // * If there are no calculations, set displayedNum as the firstValue
                    }
                        console.log("operator key!");
                        key.classList.add("pressed");
                        calculator.dataset.previousKeyType = "operator";
                        calculator.dataset.operator = action;
                };// ** if statement - operators ends
                
// * Detects if key pressed is a number
            if(!action){
                console.log("number key!");
                if(
                    displayedNum === "0" ||
                     previousKeyType === "operator" ||
                     previousKeyType === "calculate"
                ){
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }
                calculator.dataset.previousKeyType = "number"
            };// if statement - numbers ends

//  * Detects if key pressed is a decimal
            if(action === "decimal"){
                console.log("decimal key!");
                if (!displayedNum.includes(".")){
                    display.textContent = displayedNum + ".";
                } else if(
                    previousKeyType === "operator" ||
                    previousKeyType === "calculate"
                        ){
                    display.textContent = "0.";
                }
                calculator.dataset.previousKeyType = "decimal";
            };// ** if statement - decimal ends

// * Detects if key pressed is a clear
            if(action === "clear"){
                const clearBtn = calculator.querySelector("[data-action=clear]")
                if(key.textContent === "AC"){
                    calculator.dataset.firstValue = empty;
                    calculator.datasetmodValue = empty;
                    calculator.dataset.operator = empty;
                    calculator.dataset.previousKeyType = empty;
                } else {
                    key.textContent = "AC";
                    clearBtn.style.backgroundColor = "#96FF58";
                }
                console.log("clear key!");
                display.textContent = 0;
                calculator.dataset.previousKeyType = "clear";
            };

// * Updates AC
            if(action !== "clear"){
                const clearBtn = calculator.querySelector("[data-action=clear]")
                clearBtn.textContent = "CE"
                clearBtn.style.backgroundColor = "#FF4949";
            };

// * Detects if key pressed is an equal
            if(action === "calculate"){
                console.log("equal key!");
                let firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                let secondValue = displayedNum;

                if(firstValue){
                    if(previousKeyType === "calculate"){
                        firstValue = displayedNum;
                        secondValue = calculator.dataset.modValue;
                    }
                display.textContent = calculate(firstValue, operator, secondValue);    
                };
                calculator.dataset.modValue = secondValue;
                calculator.dataset.previousKeyType = "calculate";
            };//** if statement - calculate ends
        };
        // *** Event Listener if statement ends
    });
    // *** Event Listener ends
});
// *** Jquery ends
