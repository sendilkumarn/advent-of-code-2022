const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf-8").split("\n");

const rucksackPriority = (x) => {
  const charCode = x.charCodeAt(0);
  return charCode > 96 ? charCode - 96 : Math.abs(charCode - 38);
};

const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i = i + size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const part01 = lines
  .map((line) => [
    line.substring(0, line.length / 2).split(""),
    line.substring(line.length / 2).split(""),
  ])
  .map(([first, second]) => first.filter((ch) => second.indexOf(ch) !== -1)[0])
  .map((ch) => rucksackPriority(ch))
  .reduce((acc, cv) => cv + acc, 0);

console.log(part01);

const part02 = chunk(lines, 3)
  .map((sacks) => {
    const [first, second, third] = sacks;
    return first
      .split("")
      .filter((ch) => second.indexOf(ch) !== -1)
      .filter((ch) => third.indexOf(ch) !== -1)[0];
  })
  .map((ch) => rucksackPriority(ch))
  .reduce((acc, cv) => cv + acc, 0);

console.log(part02);
