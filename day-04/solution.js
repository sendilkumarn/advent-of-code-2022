const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf-8").split("\n");

const genArray = ([start, end]) =>
  Array(end - start + 1)
    .fill()
    .map(() => start++);

const generateShiftArrays = (shifts) => {
  const [first, second] = shifts
    .split(",")
    .map((shift) => shift.split("-").map((s) => parseInt(s)));

  return first[1] - first[0] < second[1] - second[0]
    ? [genArray(first), genArray(second)]
    : [genArray(second), genArray(first)];
};

const shifts = lines.map((shifts) => generateShiftArrays(shifts));

const part01 = shifts.filter(([one, two]) =>
  one.every((shift) => two.indexOf(shift) !== -1)
);
console.log(part01.length);

const part02 = shifts.filter(([one, two]) =>
  one.some((shift) => two.indexOf(shift) !== -1)
);
console.log(part02.length);
