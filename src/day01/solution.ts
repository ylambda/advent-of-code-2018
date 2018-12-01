import * as fs from "fs";

const inputPath = "inputs/day01.txt";
const input = fs.readFileSync(inputPath, "utf8");

const frequencyChanges : Array<number> = input.trim().split("\n")
    .map(Number);

const part1 = frequencyChanges.reduce((sum: number, f: number) => sum + f, 0);
console.log("Part 1: %d", part1);

let i = 0;
let currentFrequency = 0;
let seenFrequencies = new Set([currentFrequency]);
while(true) {
    currentFrequency += frequencyChanges[i];
    if (seenFrequencies.has(currentFrequency)) {
        break;
    }
    seenFrequencies.add(currentFrequency);
    i++;
    i = i % frequencyChanges.length;
}

console.log("Part 2: %d", currentFrequency);
