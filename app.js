const form = document.getElementById("financial-form");
const result = document.getElementById("result");

const calLogic = (totalIncome, totalExpenses) => {
  // Prevent division by zero if income is 0
  if (totalIncome === 0) {
    result.className = "broke";
    result.textContent = "Red Alert! (No Income)";
    return;
  }

  const isBroke = (totalExpenses / totalIncome) * 100;

  // clear previous results and class name for styling
  result.innerHTML = "";
  result.className = "";

  if (isBroke <= 50) {
    result.className = "not-broke";
    result.textContent = "Living Large!";
  } else if (isBroke <= 90) {
    result.className = "almost-broke";
    result.textContent = "Getting Tight!";
  } else {
    result.className = "broke";
    result.textContent = "Red Alert!";
  }
};

// --- 1. LOAD DATA ON PAGE START ---
// Check if "brokeData" exists in the browser's storage
const savedData = localStorage.getItem("brokeData");

if (savedData) {
  // Turn the string back into a JavaScript object
  const parsedData = JSON.parse(savedData);
  // Auto-fill the form inputs with the saved numbers
  document.getElementById("income").value = parsedData.income;
  document.getElementById("expenses").value = parsedData.expenses;
  document.getElementById("savings").value = parsedData.savings;

  calLogic(parsedData.income, parsedData.expenses);
}

// --- 2. CALCULATE & SAVE ON FORM SUBMIT ---
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const income = Number(data.get("income")) || 0;
  const expenses = Number(data.get("expenses")) || 0;
  const savings = Number(data.get("savings")) || 0;

  // Create a single object holding all the current values
  const userData = { income, expenses, savings };

  // Convert the object to a string and lock it into localStorage
  localStorage.setItem("brokeData", JSON.stringify(userData));

  calLogic(income, expenses);
});
