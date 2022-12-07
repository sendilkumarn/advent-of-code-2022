const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf-8");

Array.prototype.sum = function () {
  return this.reduce((acc, cv) => cv + acc, 0);
};

const calories = lines
  .split("\n\n")
  .map((calories) =>
    calories
      .split("\n")
      .map((calory) => parseInt(calory))
      .sum()
  )
  .sort((a, b) => b - a);

console.log(calories[0]);

console.log(calories.slice(0, 3).sum());
