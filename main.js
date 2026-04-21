const calculatorDisplay = document.getElementById("calc-display")
const calculatorNumberButtons = document.querySelectorAll("[data-number]");
const calculatorActionButtons = document.querySelectorAll("[data-action]")
const calculatorOperatorButtons = document.querySelectorAll("[data-operator]")

let firstNum = null
let operator = null;
let isResetDisplay = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
    if(num2 === 0){
        return "Can't divide zero"
    }

    return num1 / num2
}

function operate(num1, num2, operator) {
  num1 = Number(num1)
  num2 = Number(num2)
  let result = 0;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;

    case "-":
      result = subtract(num1, num2);
      break;

    case "*":
      result = multiply(num1, num2);
      break;

    case "/":
      result = divide(num1, num2);
      break;

    default:
      break;
  }

  return result;
}

function populateDisplay(value) {
  calculatorDisplay.value = value;
}

function clearDisplay() {
  firstNum = null;
  operator = null;
  isResetDisplay = false;
  populateDisplay("0");
}

function appendNumber(number) {
  if (calculatorDisplay.value === "0" || isResetDisplay) {
    populateDisplay(number);
    isResetDisplay = false;
  } else {
    populateDisplay(calculatorDisplay.value + number);
  }
}

function appendDecimal() {
  if (isResetDisplay) {
    populateDisplay("0");
    isResetDisplay = false;
  }

  if (calculatorDisplay.value.includes(".")) {
    return;
  }

  populateDisplay(calculatorDisplay.value + ".");
}

function setOperator(nextOperator) {
  if (operator !== null && !isResetDisplay) {
    evaluate();
  }

  firstNum = calculatorDisplay.value;
  operator = nextOperator;
  isResetDisplay = true;
}

function evaluate() {
  if (operator === null || isResetDisplay) {
    return;
  }

  let secondNumber = calculatorDisplay.value;
  let result = operate(firstNum, secondNumber, operator);

  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000;
  }

  populateDisplay(String(result));
  firstNum = result;
  operator = null;
  isResetDisplay = true;
}


function del(){
    if(isResetDisplay){
        return
    }

    if(calculatorDisplay.value.length === 1){
        populateDisplay("0")
    }else{
        populateDisplay(calculatorDisplay.value.slice(0, -1))
    }
}

calculatorNumberButtons.forEach((numBtn) => numBtn.addEventListener("click", function(){
    appendNumber(numBtn.dataset.number)
}))

calculatorOperatorButtons.forEach((operatorBtn) => operatorBtn.addEventListener("click", function(){
    setOperator(operatorBtn.dataset.operator)
}))

calculatorActionButtons.forEach((actionBtn) => {
    actionBtn.addEventListener("click", () => {

        const buttonType = actionBtn.dataset.action;

        switch (buttonType) {
            case "DEL":
                del();
                break;
            case "RESET":
                clearDisplay();
                break;
            case "=":
                evaluate();
                break;
            case ".":
                appendDecimal();
                break;
            default:
                break;
        }

    });
});

document.addEventListener('keydown', function(e) {
  const keyName = e.key;

  if ('0123456789'.includes(keyName)) {
    appendNumber(keyName)
  } else if (['+', '-', '*', '/'].includes(keyName)) {
    setOperator(keyName);
  } else if (keyName === '.') {
    appendDecimal(keyName)
  } else if (keyName === 'Enter' || keyName === '=') {
    e.preventDefault(); 
    evaluate();
  } else if (keyName === 'Backspace') {
    del();
  } else if (keyName === 'Escape') {
    clearDisplay();
  }
});






