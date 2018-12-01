import * as fs from "fs";

const inputPath = "inputs/day01.txt";
const input = fs.readFileSync(inputPath, "utf8");

const changes : Array<number> = input.trim().split("\n").map(Number);
const total = changes.reduce((sum: number, f: number) => sum + f, 0);
console.log("Part 1: %d", total);

let i = 0;
let frequency = 0;
let visited = new Set([frequency]);
while(true) {
    frequency += changes[i];

    if (visited.has(frequency)) {
        break;
    }

    visited.add(frequency);
    i = (i+1) % changes.length;
}
console.log("Part 2: %d", frequency);
