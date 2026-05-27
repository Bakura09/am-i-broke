expensesArray = [
  { name: "Rent", amount: 1200 },
  { name: "Groceries", amount: 350 },
];

const expensesSum = expensesArray.reduce(
  (acc, curVal) => acc.amount + curVal.amount,
);

console.log(expensesSum);

console.log(1200 + 350);
