// Get reference to the calculator display input element
const display = document.getElementById("display");

// Append a value (number/operator) to the current display string
function appendValue(val) {
  display.value += val;
}

// Clear the entire display
function clearDisplay() {
  display.value = '';
}

// Remove the last character from the display (backspace)
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the expression in the display and show the result
function calculateResult() {
  try {
    // Use JS eval to compute the expression string
    const result = eval(display.value);

    // Handle cases like division by zero or infinite results
    if (!isFinite(result)) throw new Error("Math Error");

    // Show the evaluated result
    display.value = result;
  } catch {
    // If eval throws error or invalid expression, show "Error"
    display.value = "Error";
  }
}

// Keyboard input handling for usability
document.addEventListener('keydown', function (e) {
  const key = e.key;

  // If key is a number or operator, append to display
  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);

  // Enter or '=' triggers calculation
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();  // prevent form submission if any
    calculateResult();

  // Backspace deletes last character
  } else if (key === "Backspace") {
    backspace();

  // 'c' or 'C' clears the display
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

// Calculate square root of current display value
function calculateSquareRoot() {
  try {
    const value = parseFloat(display.value);

    // Negative numbers don't have real square roots here
    if (value < 0) throw new Error("Invalid");

    // Calculate and update display with square root
    display.value = Math.sqrt(value);
  } catch {
    display.value = "Error";
  }
}

// Additional listener to allow '%' key on keyboard to append
document.addEventListener('keydown', function (e) {
  if (e.key === '%') appendValue('%');
});

// Handle percentage calculations in display string
function handlePercentage() {
  const expr = display.value;

  // Regex to match expressions like: base operator percentage (e.g. "200 + 10")
  const match = expr.match(/(\d+(\.\d+)?)(\s*[\+\-\*\/]\s*)(\d+(\.\d+)?)$/);

  if (match) {
    let base = parseFloat(match[1]);
    let operator = match[3].trim();
    let percent = parseFloat(match[4]);
    let result;

    // Calculate percentage based on operator type following calculator logic
    if (operator === "+" || operator === "-") {
      let percentageValue = (base * percent) / 100;
      result = operator === "+" ? base + percentageValue : base - percentageValue;
    } else if (operator === "*") {
      result = base * (percent / 100);
    } else if (operator === "/") {
      result = base / (percent / 100);
    }

    display.value = result;

  } else {
    // If just a number and %, convert to decimal (e.g. 50% = 0.5)
    let num = parseFloat(expr);
    if (!isNaN(num)) {
      display.value = num / 100;
    } else {
      display.value = "Error";
    }
  }
}

// Memory storage variable, starts at zero
let memory = 0;

// Add current display value to memory
function memoryAdd() {
  try {
    memory += parseFloat(eval(display.value));
  } catch {
    display.value = "Error";
  }
}

// Subtract current display value from memory
function memorySubtract() {
  try {
    memory -= parseFloat(eval(display.value));
  } catch {
    display.value = "Error";
  }
}

// Recall memory value and append it to the display
function memoryRecall() {
  display.value += memory;
}

// Clear memory (reset to zero)
function memoryClear() {
  memory = 0;
}
