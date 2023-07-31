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


displayIn = displayDiv.textContent;

numberButtons.forEach(btn => {
    btn.addEventListener('click',() => {
        updateDisplay(btn.textContent)
        displayIn += btn.textContent;
    })
})

operatorButtons.forEach(btn => {
    btn.addEventListener('click',() => {
        updateDisplay(" " + btn.textContent + " ");
        if (operand2 == '' && operator == '') {
            operand1 = parseInt(displayIn);
            operator = btn.textContent;
            displayIn = '';
        } 
        else { // need to evaluate

        }
        console.log(operand1,operator,operand2)
        console.log(displayIn);
    });
});

functionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent == "Clear") {
            displayDiv.textContent = '';
            operand1 = '';
            operand2 = '';
            operator = '';
            displayIn = '';
        } else if (btn.textContent == "=") {
            operand2 = parseInt(displayIn);
            let tmp = operate(operator,operand1,operand2);
            console.log(tmp);
            displayDiv.textContent = '';
            updateDisplay(tmp);
        } else {
            console.log(btn.textContent)
        }
    })
});