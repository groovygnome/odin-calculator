let val1 = '';
let val2 = '';
let operator;
let answered = false;
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", () => displayInput(button, button.textContent)));

function displayInput(button, input) {
    console.log(answered);
    if ((button.className === "equals" && val1 != '' && val2 != '') || (button.className === "operator" && val1 != '' && val2 != '')) {
        let ans = operate(val1, operator, val2);
        display.textContent = ans;
        if (ans === 'DIVIDE BY SOMETHING ELSE STUPID') {
            val1 = '';
            val2 = '';
            operator = undefined;
        } else {
            val1 = ans;
            val2 = '';
            operator = undefined;
            answered = true;
        }
        if (button.className === "operator") {
            operator = button.textContent;
            display.textContent += ' ' + input + ' ';
        }
    } else if (button.className === "number") {
        if (operator) {
            val2 += input;
            display.textContent += input;
        } else if (!answered) {
            val1 += input;
            if (display.textContent == 'DIVIDE BY SOMETHING ELSE STUPID') {
                display.textContent = '';
            }
            display.textContent += input;
        } else if (answered) {
            display.textContent = '' + input;
            val1 = input;
            val2 = '';
            operator = undefined;
            answered = false;
        }
    } else if (button.className === "operator" && !operator && val1 != '') {
        operator = input;
        display.textContent += ' ' + input + ' ';
    } else if (button.className === 'operator' && operator && val1 != '' && val2 === '') {
        operator = input;
        display.textContent = display.textContent.slice(0, -3) + ' ' + input + ' ';
    } else if (button.className === "clear") {
        display.textContent = '';
        val1 = '';
        val2 = '';
        operator = undefined;
        answered = false;
    }
}

function operate(num1, op, num2) {
    if (op === '+') return add(num1, num2).toFixed(2);
    if (op === '-') return subtract(num1, num2).toFixed(2);
    if (op === '*') return multiply(num1, num2).toFixed(2);
    if (op === '/') {
        if (num2 == '0') {
            return "DIVIDE BY SOMETHING ELSE STUPID";
        } else {
            return divide(num1, num2).toFixed(2);
        }
    }
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
}
