// global variables
var operand1 = '',operand2='',operator='', displayIn = '';

// document nodes
const displayDiv = document.querySelector('div.display');
const functionButtons = document.querySelectorAll('div.function button');
const numberButtons = document.querySelectorAll('div.number button');
const operatorButtons = document.querySelectorAll('div.operator button');

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
    switch(o) {
        case "+":
            return add(op1,op2);
        case "-":
            return substract(op1,op2);
        case "x":
            return multiply(op1,op2);
        case "\/":
            return divide(op1,op2);
        default:
            break;
    }
}

// display function
function updateDisplay(val) {
    displayDiv.textContent += val;
}

function logger() {
    if (arguments.length) 
        console.log("o:"+operator+"\nop1:"+operand1+"\nop2:"+operand2+"\ndisplayIn:"+displayIn)
}

displayIn = displayDiv.textContent;

numberButtons.forEach(btn => {
    btn.addEventListener('click',() => {
        updateDisplay(btn.textContent)
        displayIn += btn.textContent;
        logger()
    })
})

operatorButtons.forEach(btn => {
    btn.addEventListener('click',() => {
        if (operand2 == '' && operator == '') {
            updateDisplay(" " + btn.textContent + " ");
            operand1 = parseInt(displayIn);
            operator = btn.textContent;
            displayIn = '';
        } else {
            operand2 = parseInt(displayIn);
            let result = operate(operator,operand1,operand2);
            displayDiv.textContent = '';
            operand1 = result;
            operand2 = '';
            displayIn = '';
            operator = btn.textContent;

            updateDisplay(result + " " + operator + " ");
        }
        logger()
    });
});

functionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switch(btn.textContent) {
            case "Clear":
                displayDiv.textContent = '';
                operand1 = '';
                operand2 = '';
                operator = '';
                displayIn = '';
                break;
            case "=":
                operand2 = parseInt(displayIn);
                let result = operate(operator,operand1,operand2);
                displayDiv.textContent = '';
                updateDisplay(result);
                operand1 = result;
                operand2 = '';
                operator = '';
                displayIn = result;
                break;
            default:
                console.log(btn.textContent);
                break;
        }
        logger()
    })
});