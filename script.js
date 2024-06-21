// function clearScreen() {
//     document.getElementById("result").value = "";
// }
 
// function display(value) {
//     document.getElementById("result").value += value;
// }
 
// function calculate() {
//     var p = document.getElementById("result").value;
//     var q = eval(p);
//     document.getElementById("result").value = q;
// }
// Get references to the display box and buttons
let display = document.getElementById('result');
let clear = document.getElementById('clear');
let buttons = document.querySelectorAll('button');

// Initialize current and previous values and operator
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonValue = event.target.innerText;

    if (buttonValue >= '0' && buttonValue <= '9' || buttonValue === '.') {
        // If the button is a number or a decimal point
        currentInput += buttonValue;
        updateDisplay(currentInput);
    } else if (buttonValue === 'C') {
        // Clear the display
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('');
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
        // If the button is an operator
        if (currentInput === '') return; // Prevent setting an operator without a number
        if (previousInput !== '') {
            // If there is a previous input, perform the calculation
            calculate();
        }
        operator = buttonValue;
        previousInput = currentInput;
        currentInput = '';
    } else if (buttonValue === '=') {
        // If the button is the equal sign, perform the calculation
        if (currentInput === '' || previousInput === '' || operator === '') return; // Prevent calculating without all inputs
        calculate();
        operator = '';
    }
}

// Function to perform the calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    updateDisplay(result);
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});