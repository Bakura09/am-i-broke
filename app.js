const form = document.getElementById("financial-form");
const result = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const income = Number(data.get("income")) || 0;
  const expenses = Number(data.get("expenses")) || 0;
  const savings = Number(data.get("savings")) || 0;

  const isBroke = (expenses / income) * 100;
  console.log(isBroke);

  result.innerHTML = "";
  result.className = "";

  if (isBroke < 50) {
    result.className = "not-broke";
    result.textContent = "Living Large!";
  } else if (isBroke < 90) {
    result.className = "not-broke";
    result.textContent = "Getting Tight!";
  } else if (isBroke > 91) {
    result.className = "broke";
    result.textContent = "Red Alert!";
  }
});
