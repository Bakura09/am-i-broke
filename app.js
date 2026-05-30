let expensesArray = [];

function expensesSum() {
  return expensesArray.reduce((acc, curVal) => acc + Number(curVal.amount), 0);
}

const form = document.getElementById("financial-form");
const result = document.getElementById("result");
const addExpenseBtn = document.getElementById("add-expense-btn");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.querySelector(".expense-list");
const expenseTotal = document.querySelector(".expense-total");

// Refactored helper function to save current global state to storage
function updateLocalStorage() {
  const income = Number(document.getElementById("income").value) || 0;
  const savings = Number(document.getElementById("savings").value) || 0;
  const userData = { income, expensesArray, savings };
  localStorage.setItem("brokeData", JSON.stringify(userData));
}

// 1. RENDER EXPENSE ITEM (Now tracks items by unique IDs)
function renderExpenseItem(id, name, amount) {
  const listItem = document.createElement("li");
  listItem.className = "expense-item";

  const label = document.createElement("span");
  label.className = "expense-item-label";
  label.textContent = `${name}: $${amount}`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-expense-btn";
  removeBtn.textContent = "Remove";

  // Remove Event Listener
  removeBtn.addEventListener("click", () => {
    // Exact match using unique IDs instead of names
    expensesArray = expensesArray.filter((expense) => expense.id !== id);
    
    listItem.remove();
    expenseTotal.textContent = `$${expensesSum()}`;
    
    // SQUASHED BUG: Save changes to storage immediately so they stay deleted!
    updateLocalStorage();
  });

  listItem.appendChild(label);
  listItem.appendChild(removeBtn);
  expenseList.appendChild(listItem);
}

// 2. ADD EXPENSE BTN
addExpenseBtn.addEventListener("click", (event) => {
  const name = expenseName.value.trim() || "Uncategorized";
  const amount = Number(expenseAmount.value);

  if (amount > 0) {
    // Generate an absolute unique ID using timestamp
    const id = Date.now();
    let newExpense = { id, name, amount };
    
    expensesArray.push(newExpense);
    renderExpenseItem(id, name, amount);

    expenseTotal.innerHTML = `$${expensesSum()}`;

    expenseName.value = "";
    expenseAmount.value = "";
  } else {
    window.alert("Please enter a valid expense amount greater than 0.");
  }
});

// 3. CALCULATION LOGIC
const calLogic = (totalIncome, totalExpenses) => {
  if (totalIncome === 0) {
    result.className = "broke";
    result.textContent = "Very Broke! (No Income)";
    return;
  }

  const isBroke = (totalExpenses / totalIncome) * 100;
  result.innerHTML = "";

  if (isBroke <= 50) {
    result.className = "not-broke";
    result.textContent = "Living Large!";
  } else if (isBroke <= 90) {
    result.className = "almost-broke";
    result.textContent = "Getting Tight!";
  } else {
    result.className = "broke";
    result.textContent = "So Broke!";
  }
};

// --- 4. LOAD DATA ON PAGE START ---
const savedData = localStorage.getItem("brokeData");

if (savedData) {
  const parsedData = JSON.parse(savedData);

  document.getElementById("income").value = parsedData.income;
  document.getElementById("savings").value = parsedData.savings;
  expensesArray = parsedData.expensesArray || [];

  expensesArray.forEach((element) => {
    // Pass the saved ID along to keep identity tracking intact
    renderExpenseItem(element.id, element.name, element.amount);
  });

  expenseTotal.innerHTML = `$${expensesSum()}`;
  calLogic(parsedData.income, expensesSum());
}

// --- 5. CALCULATE & SAVE ON FORM SUBMIT ---
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const income = Number(data.get("income")) || 0;

  updateLocalStorage();
  calLogic(income, expensesSum());
});