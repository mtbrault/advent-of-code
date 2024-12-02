import fs from "fs";

export default abstract class Core {
    protected lines: string[] = [];

    constructor(filename: string) {
        const input = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
        this.lines = input.split('\n');
    }

    protected abstract step1(): unknown;
    protected abstract step2(): unknown;
    protected abstract parse(): void;

    private runFuncWithTimeCompute(func: () => unknown, name: string): void {
        const start = process.hrtime();

        const result = func();

        const end = process.hrtime(start);
        console.log(`${name}${result ?? ''}, in ${end[0] * 1000 + end[1] / 1e6}ms`)
    }

    public run(): void {
        this.runFuncWithTimeCompute(this.parse.bind(this), "Parsing");

        this.runFuncWithTimeCompute(this.step1.bind(this), "Part 1 soluce: ")

        this.runFuncWithTimeCompute(this.step2.bind(this), "Part 2 soluce: ")
    }
}