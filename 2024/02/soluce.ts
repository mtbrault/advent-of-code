import Core from "../common/Core";

class Run extends Core {
    private input: number[][] = [];

    protected parse(): void {
        this.input = this.lines.map((line) => line.split(' ').map(Number))
    }

    protected step1(): number {
        return this.input.filter(this.checkLine).length;
    }

    protected step2(): number {
        return this.input.filter((line) => line.some((e, i) => {
            const newLine = [...line];
            newLine.splice(i, 1);
            return this.checkLine(newLine);
        })).length;
    }

    private checkLine(line: number[]): boolean {
        const increase = line[1] - line[0] > 0;

        return line.every((elem, i) => {
            if (i + 1 >= line.length) return true;

            const diff = line[i + 1] - elem;
            return diff !== 0 && ((increase && diff > 0) || (!increase && diff < 0)) && Math.abs(diff) <= 3;
        })
    }
};

const run = new Run(process.argv[2]);

run.run();