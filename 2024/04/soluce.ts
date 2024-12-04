import _ from "lodash";
import Core from "../common/Core";

type Direction = { x: number; y: number };



class Run extends Core {
    private map: string[][] = [];
    private directions: Direction[] = [
        { x: 0, y: 1 },   // Horizontal right
        { x: 0, y: -1 },  // Horizontal left
        { x: 1, y: 0 },   // Vertical down
        { x: -1, y: 0 },  // Vertical up
        { x: 1, y: 1 },   // Diagonal down-right
        { x: -1, y: -1 }, // Diagonal up-left
        { x: 1, y: -1 },  // Diagonal down-left
        { x: -1, y: 1 }   // Diagonal up-right
      ];

    protected parse(): void {
        this.map = this.lines.map((line) => line.split(''));
    }

    protected step1(): number {
        return _.chain(this.map)
        .map((line, x) => _.chain(line)
            .map((char, y) => this.directions.filter((direction) => this.findWord(x, y, direction, "XMAS")).length)
            .sum()
            .value()
        )
        .sum()
        .value()
    }

    protected step2(): number {
        return _.chain(this.map)
        .map((line, x) => _.chain(line)
            .map((char, y) => this.findWordPart2(x, y))
            .sum()
            .value()
        )
        .sum()
        .value()
    }

    private findWordPart2(x: number, y: number): number {
        if (this.map[x][y] !== "A") {
            return 0;
        }

        return (
            (
                this.findWord(x - 1, y - 1, this.directions[4], "MAS") || this.findWord(x - 1, y - 1, this.directions[4], "SAM")
            )
            &&
            (
                this.findWord(x + 1, y - 1, this.directions[7], "MAS") || this.findWord(x + 1, y - 1, this.directions[7], "SAM")
            ))
            ? 1
            : 0;
    }

    private findWord(x: number, y: number, direction: Direction, word: string): boolean {

        if (this.map[x]?.[y] !== word[0]) {
            return false;
        } 

        for (let i = 1; i < word.length; i += 1) {
            const wordX = x + i * direction.x;
            const wordY = y + i * direction.y;

            if (!this.map[wordX] || this.map[wordX][wordY] !== word[i]) {
                return false;
            }
        }
        return true;
    }
}

const run = new Run(process.argv[2]);

run.run();