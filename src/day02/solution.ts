import * as fs from "fs";

const inputPath = "inputs/day02.txt";
const input = fs.readFileSync(inputPath, "utf8");

const boxes: Array<string> = input.trim().split("\n");
let two = 0;
let three = 0;

let marray = new Map();

for (const box of boxes) {
    const m = new Map();
    for (const letter of box.split("")) {
        if (!m.has(letter)) {
            m.set(letter, 0);
        }

        m.set(letter, m.get(letter) + 1);
    }

    let twoa = false;
    let threea = false

    for (const [letter, count] of m.entries()) {

        if (count === 2 && !twoa) {
            two++;
            twoa = true;
        }

        if (count === 3 && !threea) {
            three++;
            threea = true;
        }
    }

    marray.set(box, m);
}


let smallest: string = "";
let smallestCount = Infinity;
let smCommon;
for (const [box, om] of marray.entries()) {
    for (const [key, m] of marray.entries()) {
        if (key === box) continue;
        let count = 0;
        let letterSet = new Set();
        let common = new Set();
        for (const [letter, c] of m.entries()) {
            letterSet.add(letter);
            if (c !== om.get(letter)) {
                count++;
            }else {
                common.add(letter);
            }
        }

        for (const [letter, c] of om.entries()) {
            if (letterSet.has(letter)) continue;
            if (c !== m.get(letter)) {
                count++;
            } else {
                common.add(letter);
            }
        }

        if (count < smallestCount) {
            smallestCount = count;
            smallest = box + " " + key;
            smCommon = common;
        }
    }
}


// @ts-ignore
console.log(smallestCount, smallest, Array.from(smCommon).join(""));
