import Core from "../common/Core";

type Coordinate = { x: number; y: number };

class Run extends Core {
    private initialCoords: Coordinate[] = [];
    private map: number[][] = [];
    private endFound: Coordinate[] = [];

    protected parse(): void {
        this.map = this.lines.map((line, x) => {
            const numberLine = line.split('').map(Number);
            numberLine.forEach((value, y) => {
                if (value === 0) {
                    this.initialCoords.push({ x, y });
                }
            });
            return numberLine;
        });
    }

    protected step1(): number {
        return this.initialCoords.reduce((acc, coords) => {
            const sum = this.findPath(0, coords.x, coords.y);
            this.endFound = [];
            return acc + sum;
        }, 0);
    }

    protected step2(): number {
        return this.initialCoords.reduce((acc, coords) => acc + this.findPath(0, coords.x, coords.y, true), 0);
    }

    private findPath(value: number, x: number, y: number, part2 = false): number {
        let sum = 0;
        const neighbor = [{ x: 1, y: 0}, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];

        if (value === 9) {
            if (!this.endFound.some((end) => end.x === x && end.y === y)) {
                if (!part2) {
                    this.endFound.push({ x, y });
                }
                return 1;
            }
            return 0;
        }

        const goodNeighbors = neighbor.filter((coords) => this.map?.[x + coords.x]?.[y + coords.y] === value + 1);
        
        for (const goodNeighboor of goodNeighbors) {
            sum += this.findPath(value + 1, x + goodNeighboor.x, y + goodNeighboor.y, part2);
        }
        return sum;
    }
}

const run = new Run(process.argv[2]);

run.run();