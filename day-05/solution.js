const { readFileSync } = require("fs");

const [cargoStacks, instructions] = readFileSync("./input.txt", "utf-8").split(
  "\n\n"
);

const formatStack = (stack) => {
  const cargoStacks = stack.split("\n");
  cargoStacks.pop();

  const stacks = cargoStacks.map((cargoStack) =>
    cargoStack.split("    ").flatMap((stack) => stack.split(" "))
  );
  return stacks[0].map((_, index) =>
    stacks.map((row) => row[index]).filter((s) => s)
  );
};

const runInstructions = (isReverse) => {
  const stack = formatStack(cargoStacks);
  const instructionArr = instructions
    .split("\n")
    .map((inst) => inst.split(" "));

  instructionArr.forEach((instruction) => {
    const [_x, number, _y, from, _z, to] = instruction;
    let stacksToMove = stack[parseInt(from) - 1].splice(0, parseInt(number));
    if (isReverse) {
        stacksToMove = stacksToMove.reverse();
    }
    if (stacksToMove) {
      stack[parseInt(to) - 1].unshift(...stacksToMove);
    }
  });
  console.log(stack.map((sa) => sa[0]).join(""));
};

runInstructions();

runInstructions(true);
