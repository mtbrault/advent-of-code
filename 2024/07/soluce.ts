import Core from "../common/Core";

class Run extends Core {
    private operations: [number, number[]][] = [];

    protected parse(): void {
        this.operations = this.lines.map((line) => {
            const [total, others] = line.split(': ');
            return [Number(total), others.split(' ').map(Number)];
        });
    }

    protected step1(): number {
        return this.operations.reduce((acc, [total, numbers]) => {
            const possibleResults = this.possibleResults(numbers[0], numbers, 1);

            return acc + (possibleResults.includes(total) ? total : 0);
        }, 0);
    }

    protected step2(): number {
        return this.operations.reduce((acc, [total, numbers]) => {
            const possibleResults = this.possibleResults(numbers[0], numbers, 1, true);

            return acc + (possibleResults.includes(total) ? total : 0);
        }, 0);
    }

    private possibleResults(acc: number, numbers: number[], index: number, useConcat = false): number[] {
        if (index === numbers.length) {
            return [acc];
        }

        const add = this.possibleResults(acc + numbers[index], numbers, index + 1, useConcat);
        const multiply = this.possibleResults(acc * numbers[index], numbers, index + 1, useConcat);
        const concat = useConcat ? this.possibleResults(Number(`${acc}${numbers[index]}`), numbers, index + 1, useConcat) : [];

        return [...add, ...multiply, ...concat];
    }
}

const run = new Run(process.argv[2]);

run.run();