var operand1,operand2,operator;
var display = '';

const displayDiv = document.querySelector('div.display');
const numberButtons = document.querySelectorAll('div.number button');

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

function operate(operator,op1,op2) {
    switch(operator) {
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

function updateDisplay() {
    displayDiv.textContent = display;
}

numberButtons.forEach(button => {
    button.addEventListener('click',e => {
        display += button.textContent;
        console.log(display);
        updateDisplay();
    });
})