// global variables
var operand1 = '',operand2='',operator='', displayIn = '';

// document nodes
const displayDiv = document.querySelector('div.display');
const functionButtons = document.querySelectorAll('div.function button');
const numberButtons = document.querySelectorAll('div.number button');
const operatorButtons = document.querySelectorAll('div.operator button');
const allButtonsArr = Array.from(document.querySelectorAll('button'));

displayIn = displayDiv.textContent;

// math functions
function add(n,m) {
    return n + m;
}

function substract(n,m) {
    return n - m;
}

function multiply(n,m) {
    return n * m;
}

function divide(n,m) {
    return n / m;
}

function operate(o,op1,op2) {
    let ans = 0;
    switch(o) {
        case "+":
            ans = add(op1,op2);
            break;
        case "-":
            ans = substract(op1,op2);
            break;
        case "x":
            ans = multiply(op1,op2);
            break;
        case "/":
            if (op2 != 0) {
                ans = divide(op1,op2);
            }
            break;
        default:
            break;
    }
    if (!Number.isInteger(ans)) {
        ans = parseFloat(ans.toFixed(4));
    }
    return ans;
}

// display function
function updateDisplay(val) {
    displayDiv.textContent += val;
}

function logger(btn) {
    if (arguments.length > 1) 
        console.log("o:"+operator+"\nop1:"+operand1+"\nop2:"+operand2+"\ndisplayIn:"+displayIn+"\nfunc:"+btn.textContent)
}

numberButtons.forEach(btn => {
    btn.addEventListener('click',() => {
        updateDisplay(btn.textContent)
        displayIn += btn.textContent;
        logger(btn)
    })
})

operatorButtons.forEach(btn => {
    btn.addEventListener('click',() => {
        if (operand2 == '' && operator == '') {
            updateDisplay(" " + btn.textContent + " ");
            if (displayIn.indexOf(".") > -1) { // number is float
                operand1 = parseFloat(parseFloat(displayIn).toFixed(4));
            } else {
                operand1 = parseInt(displayIn);
            }
            operator = btn.textContent;
            displayIn = '';
        } else {
            if (displayIn.indexOf(".") > -1) {
                operand2 = parseFloat(parseFloat(displayIn).toFixed(4));
            } else {
                operand2 = parseInt(displayIn);
            }
        
            if (operator == "/" && operand2 === 0) {
                displayDiv.textContent = 'No division by zero. Clearing values...';
                operand1 = 0;
                operand2 = '';
                operator = '';
                setTimeout(() => {
                    displayDiv.textContent = 0;
                }, 1500);
            } else {
                let result = operate(operator,operand1,operand2);
                displayDiv.textContent = '';
                operand1 = result;
                operand2 = '';
                displayIn = '';
                operator = btn.textContent;

                updateDisplay(result + " " + operator + " ");
            }
        }
        logger(btn)
    });
});

functionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switch(btn.textContent) {
            case "(c) clear":
                displayDiv.textContent = '';
                operand1 = '';
                operand2 = '';
                operator = '';
                displayIn = '';
                break;
            case "=":
                if (operand1 === '' || operator === '' || displayIn === '') {
                    console.error("Invalid operation");
                } else if (operand2 === 0 && operator == '/') {
                    displayDiv.textContent = 'No division by zero. Clearing values...';
                    operand1 = 0;
                    operand2 = '';
                    operator = '';
                    setTimeout(() => {
                        displayDiv.textContent = 0;
                    }, 1500);
                } else {
                    if (displayIn.indexOf('.') > -1)  {
                        operand2 = parseFloat(parseFloat(displayIn).toFixed(4));
                    } else {
                        operand2 = parseInt(displayIn);
                    }
                    let result = operate(operator,operand1,operand2);
                    displayDiv.textContent = '';
                    updateDisplay(result);
                    operand1 = result;
                    operand2 = '';
                    operator = '';
                    displayIn = result.toString();
                }
                break;
            case ".":
                if (displayIn.indexOf(".") == -1) {
                    displayIn += btn.textContent;
                    updateDisplay(btn.textContent);    
                }
                break;
            case "<-":
                if (operand1 == "") {
                    displayIn = displayIn.slice(0,displayIn.length - 1);
                    displayDiv.textContent = displayIn;
                } else  if (displayIn.length == 0) {
                    displayIn = operand1.toString();
                    displayDiv.textContent = operand1;
                    operand1 = "";
                    operator = "";
                } else {
                    displayIn = displayIn.slice(0,displayIn.length - 1);
                    displayDiv.textContent = displayDiv.textContent.slice(0,displayDiv.textContent.length - 1);
                }                
                break;
            default:
                console.log(btn.textContent);
                break;
        }
        logger(btn)
    })
});

document.addEventListener('keydown',(e) => {
    let b;
    e.preventDefault();
    switch(e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case "-":
        case "/":
        case "x":
        case "+":
        case "=":
        case ".":
            b = allButtonsArr.filter(btn => {return btn.textContent == e.key;})[0];
            b.click();
            break;
        case "c":
            b = allButtonsArr.filter(btn => btn.textContent == "(c) clear")[0];
            b.click();
            break;
        case "Backspace":
        case "<":
            b = allButtonsArr.filter(btn => btn.textContent == "<-")[0];
            b.click();
            break;
        case "Enter":
            b = allButtonsArr.filter(btn => btn.textContent == "=")[0];
            b.click();
            break;
        default:
            break;
    }
});