import _ from "lodash";
import Core from "../common/Core";

class Run extends Core {
    private map: string[][] = [];
    private visited: Record<string, Record<string, boolean>> = {};
    private guardPosition: { x: number; y: number } = { x: 0, y: 0 };
    private directions = [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }];

    protected parse(): void {
        this.map = this.lines.map((line) => line.split(''));
    }

    protected step1(): number {
        this.guardPosition = this.findGuardPosition();
        let { x, y } = this.guardPosition;
        this.visited[x] = {};
        this.visited[x][y] = true;
        let directionIndex = 0;

        while (true) {
            const futureCoordsX = x + this.directions[directionIndex].x;
            const futureCoordsY = y + this.directions[directionIndex].y;

            if (futureCoordsX < 0 || futureCoordsX >= this.map.length
                || futureCoordsY < 0 || futureCoordsY >= this.map[futureCoordsX].length) {
                break;
            }

            if (this.map[futureCoordsX][futureCoordsY] === "#") {
                directionIndex = directionIndex === 3 ? 0 : directionIndex + 1;
                continue;
            }
            if (!this.visited[futureCoordsX]) {
                this.visited[futureCoordsX] = {};
            }
            this.visited[futureCoordsX][futureCoordsY] = true;
            x = futureCoordsX;
            y = futureCoordsY;
        }

        return _.chain(Object.values(this.visited)).map((subObject) => Object.values(subObject).filter((v) => v === true).length).sum().value();
    }

    protected step2(): number {
        return Object.keys(this.visited).reduce((acc, valX) => {
            const x = Number(valX);
            return acc + Object.keys(this.visited[x]).reduce((acc2, valY) => {
                const y = Number(valY);
                const copy = _.cloneDeep(this.map);
                copy[x][y] = "#";
                return this.checkIfInfiniteLoop(copy) ? acc2 + 1 : acc2;
            }, 0);
        }, 0);
    }

    private checkIfInfiniteLoop(map: string[][]): boolean {
        let { x, y } = this.guardPosition;
        let directionIndex = 0;
        const intersections: { direction: number; x: number; y: number }[] = [];

        while (true) {
            const futureCoordsX = x + this.directions[directionIndex].x;
            const futureCoordsY = y + this.directions[directionIndex].y;

            if (futureCoordsX < 0 || futureCoordsX >= map.length
                || futureCoordsY < 0 || futureCoordsY >= map[futureCoordsX].length) {
                break;
            }

            if (map[futureCoordsX][futureCoordsY] === "#") {
                if (intersections.some((intersection) => intersection.x === futureCoordsX && intersection.y === futureCoordsY && intersection.direction === directionIndex)) {
                    return true;
                }
                
                intersections.push({ direction: directionIndex, x: futureCoordsX, y: futureCoordsY });
                
                directionIndex = directionIndex === 3 ? 0 : directionIndex + 1;
                continue;
            }

            x = futureCoordsX;
            y = futureCoordsY;
        }
        return false;
    }

    private findGuardPosition(): { x: number, y: number } {
        for (let x = 0; x < this.map.length; x += 1) {
            for (let y = 0; y < this.map[x].length; y += 1) {
                if (this.map[x][y] === "^") {
                    return { x, y };
                }
            }
        }
        throw new Error("No guard found");
    } 
}

const run = new Run(process.argv[2]);

run.run();