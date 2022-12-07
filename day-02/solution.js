const { readFileSync } = require("fs");

const gameMap = new Map();
gameMap.set("X", "A");
gameMap.set("Y", "B");
gameMap.set("Z", "C");

const getValue = (val) => (val === "A" ? 1 : val === "B" ? 2 : 3);

const games = readFileSync("./input.txt", "utf-8").split("\n");

const part01 = games
  .map((game) => game.split(" "))
  .map(([o, u]) => [o, gameMap.get(u)])
  .reduce((acc, cv) => {
    const [op, u] = cv;

    if (op === u) {
      acc += 3;
    } else if (
      (op === "A" && u === "B") ||
      (op === "B" && u === "C") ||
      (op === "C" && u === "A")
    ) {
      acc += 6;
    }

    acc += getValue(u);
    return acc;
  }, 0);

console.log(part01);

const part02 = games
  .map((game) => game.split(" "))
  .reduce((acc, cv) => {
    const [op, result] = cv;

    if (result === "Y") {
      acc += 3;
      acc += getValue(op);
    } else if (result === "Z") {
      acc += 6;
      acc += getValue(op === "A" ? "B" : op === "B" ? "C" : "A");
    } else {
      acc += getValue(op === "A" ? "C" : op === "B" ? "A" : "B");
    }
    return acc;
  }, 0);

console.log(part02);
