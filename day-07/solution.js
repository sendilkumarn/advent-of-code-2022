const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf-8").split("\n");

const getPath = (path) => (path === "/" ? path : `${path}/`);

const folderPath = (path, folder) => getPath(path) + folder;

const goBack = (path) => {
  let dirs = path.split("/");
  dirs.pop();
  return dirs.join("/");
};

const getParents = (path) => {
  const parents = [];
  parents.push("/");
  while (path !== "") {
    path = goBack(path);
    if (path !== "") {
      parents.push(path);
    }
  }
  return parents;
};

const directoryNavigation = (line, currentPath) => {
  const dir = line.split(" ").pop();
  switch (dir) {
    case "/":
      return "/";
    case "..":
      return goBack(currentPath);
    default:
      return folderPath(currentPath, dir);
  }
};

let currentPath = "/";
const fileMap = new Map();

lines.forEach((line) => {
  if (line.startsWith("dir")) {
    const folder = line.split(" ").pop();
    fileMap.set(folderPath(currentPath, folder), 0);
  } else if (line.startsWith("$ cd")) {
    currentPath = directoryNavigation(line, currentPath);
  } else if (line.startsWith("$ ls")) {
  } else {
    const [size, _] = line.split(" ");
    fileMap.set(currentPath, parseInt(size) + (fileMap.get(currentPath) ?? 0));
  }
});

currentPath = "/";
lines.forEach((line) => {
  if (line.startsWith("dir")) {
    const folder = line.split(" ").pop();
    const path = folderPath(currentPath, folder);
    const parents = getParents(path);
    parents.forEach((parent) =>
      fileMap.set(parent, fileMap.get(parent) + fileMap.get(path))
    );
  } else if (line.startsWith("$ cd")) {
    currentPath = directoryNavigation(line, currentPath);
  }
});

console.log(
  [...fileMap.values()].reduce((a, c) => (c < 100000 ? a + c : a), 0)
);

const totalDiskSpace = 70000000;
const availableDiskSpace = totalDiskSpace - fileMap.get("/");
const expectedDiskSpace = 30000000;
const requiredDiskSpace = expectedDiskSpace - availableDiskSpace;
const minimumFolderSize = [...fileMap.values()]
  .filter((size) => size >= requiredDiskSpace)
  .sort((a, b) => a - b);

console.log(minimumFolderSize[0]);
