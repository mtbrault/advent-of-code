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
            const copy = [...numbers];
            const firstNumber = copy.shift() as number;
            const possibleResults = this.possibleResults(firstNumber, copy);

            return acc + (possibleResults.includes(total) ? total : 0);
        }, 0);
    }

    protected step2(): number {
        return this.operations.reduce((acc, [total, numbers]) => {
            const copy = [...numbers];
            const firstNumber = copy.shift() as number;
            const possibleResults = this.possibleResults(firstNumber, copy, true);

            return acc + (possibleResults.includes(total) ? total : 0);
        }, 0);
    }

    private possibleResults(acc: number, numbers: number[], useConcat = false): number[] {
        if (numbers.length === 0) {
            return [acc];
        }

        const copy = [...numbers];
        const currentNumber = copy.shift() as number;
        const add = this.possibleResults(acc + currentNumber, copy, useConcat);
        const multiply = this.possibleResults(acc * currentNumber, copy, useConcat);
        const concat = useConcat ? this.possibleResults(Number(`${acc}${currentNumber}`), copy, useConcat) : [];

        return [...add, ...multiply, ...concat];
    }
}

const run = new Run(process.argv[2]);

run.run();