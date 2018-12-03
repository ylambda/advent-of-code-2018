import * as fs from "fs";

const inputPath = "inputs/day03.txt";
let input = fs.readFileSync(inputPath, "utf8");

interface Claim {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    intact: boolean
}

type Fabric = Array<Array<number>>;

const fabricSize = 1000;
const claims: Array<Claim> = input.trim().split("\n").map(parseClaim);
const fabric1 = makeFabric(fabricSize);
const fabric2 = makeFabric(fabricSize);

function makeFabric(size: number): Fabric {
    const fabric = [];

    for (let i=0; i < size; i++) {
        fabric.push((new Array(size)).fill(0));
    }

    return fabric;
}

function parseClaim(line: string): Claim {
    const regex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/
    let [match, ...rest] = regex.exec(line) || [null, []];
    let [id, x, y, width, height] = rest.map((x: string) => parseInt(x, 10));
    return { id, x, y, width, height, intact: true};
}

function part1(fabric: Fabric) {
    for (const claim of claims) {
        let xOffset = claim.x;
        let yOffset = claim.y;

        for (let w=0; w < claim.width; w++) {
            for (let h=0; h < claim.height; h++) {
                let y = yOffset + h;
                let x = xOffset + w;
                fabric[x][y] = claim.id;
            }
        }
    }

    let count = 0;
    for (const row of fabric) {
        for (const cell of row) {
            if (cell >= 2) {
                count++;
            }
        }
    }

    console.log("Part 1: %s", count);
}

function part2(fabric: Fabric) {
    for (const claim of claims) {
        let xOffset = claim.x;
        let yOffset = claim.y;

        for (let w=0; w < claim.width; w++) {
            for (let h=0; h < claim.height; h++) {
                let y = yOffset + h;
                let x = xOffset + w;
                if (fabric[x][y] === 0) {
                    fabric[x][y] = claim.id;
                } else {
                    let oldClaim = fabric[x][y];
                    claim.intact = false;
                    claims[oldClaim - 1].intact = false;
                }
            }
        }
    }

    let [intact] = claims.filter(c => c.intact);
    console.log("Part 2: %o", intact.id);
}

part1(fabric1);
part2(fabric2);
