let expensesArray = [];

function expensesSum() {
  return expensesArray.reduce((acc, curVal) => acc + Number(curVal.amount), 0);
}

const addExpenseBtn = document.getElementById("add-expense-btn");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.querySelector(".expense-list");
const expenseTotal = document.querySelector(".expense-total");
const form = document.getElementById("financial-form");
const result = document.getElementById("result");

function renderExpenseItem(name, amount) {
  let addExpense = document.createElement("li");
  addExpense.className = "expense-item";
  addExpense.innerHTML = `${name}: ${amount}`;
  expenseList.appendChild(addExpense);
}

addExpenseBtn.addEventListener("click", (event) => {
  const name = expenseName.value.trim() || "Uncategorized";
  const amount = Number(expenseAmount.value);

  // push newExpense object to expenseArray
  if (amount > 0) {
    let newExpense = { name, amount };
    expensesArray.push(newExpense);

    renderExpenseItem(name, amount);

    expenseTotal.innerHTML = `${expensesSum()}`;

    expenseName.value = "";
    expenseAmount.value = "";
  } else {
    window.alert("Please enter a valid expense amount greater than 0.");
  }
});

const calLogic = (totalIncome, totalExpenses) => {
  // Prevent division by zero if income is 0
  if (totalIncome === 0) {
    result.className = "broke";
    result.textContent = "Very Broke! (No Income)";
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
    result.textContent = "Just Broke!";
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
  document.getElementById("savings").value = parsedData.savings;
  expensesArray = parsedData.expensesArray || [];

  expensesArray.forEach((element) => {
    renderExpenseItem(element.name, element.amount);
  });

  expenseTotal.innerHTML = `${expensesSum()}`;

  calLogic(parsedData.income, expensesSum());
}

// --- 2. CALCULATE & SAVE ON FORM SUBMIT ---
form.addEventListener("submit", (event) => {
  event.preventDefault(event);

  const data = new FormData(form);
  const income = Number(data.get("income")) || 0;
  const savings = Number(data.get("savings")) || 0;

  // Create a single object holding all the current values
  const userData = { income, expensesArray, savings };
  localStorage.setItem("brokeData", JSON.stringify(userData));

  calLogic(income, expensesSum());
});
