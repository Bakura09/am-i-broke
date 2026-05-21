// let income = document.getElementById("income").value;

const form = document.getElementById("financial-form");
const result = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const income = Number(data.get("income")) || 0;
  const expenses = Number(data.get("expenses")) || 0;
  const totalSavings = Number(data.get("savings")) || 0;
  for (const pair of data.entries()) {
    console.log(pair);
  }

  const outCome = (totalIncome, totalExpenses) => {
    if (totalIncome > totalExpenses) {
      return "I am not broke!";
    } else {
      return "I am broke";
    }
  };

  result.innerHTML = ""; // clear any previous result

  const addElement = document.createElement("h1");
  addElement.id = "outcome";
  addElement.textContent = outCome(income, expenses);

  result.appendChild(addElement);
});
