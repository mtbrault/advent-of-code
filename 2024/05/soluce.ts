import Core from "../common/Core";

class Run extends Core {
    private rules: [number, number][] = [];
    private updates: number[][] = [];

    protected parse(): void {
        const [rules, updates] = this.input.split('\n\n');

        this.rules = rules.split('\n').map((line) => line.split('|').map(Number) as [number, number]);
        this.updates = updates.split('\n').map((line) => line.split(',').map(Number));
    }

    protected step1(): number {
        return this.exec();
    }

    protected step2(): number {
        return this.exec(true);
    }

    private exec(step2 = false): number {
        return this.updates.reduce((acc, update) => {
            const includedRules = this.rules.filter((rule) => update.includes(rule[0]) && update.includes(rule[1]));
            const indexes: Record<number, number> = update.reduce((acc, page, index) => ({ ...acc, [page]: index }), {});
            for (const rule of includedRules) {
                const x = indexes[rule[0]];
                const y = indexes[rule[1]];


                if (x === undefined || y === undefined || x > y) {
                    return step2 ? acc + this.reorderAndFindMiddle(update, includedRules) : acc;
                }
            }
            return step2 ? acc : acc + update[Math.floor(update.length / 2)];
        }, 0);
    }

    private reorderAndFindMiddle(update: number[], rules: [number, number][]): number {
        const graph = new Map<number, number[]>();
        const inDegree = new Map<number, number>();
        for (const page of update) {
            graph.set(page, []);
            inDegree.set(page, 0);
        }

        for (const [x, y] of rules) {
            if (update.includes(x) && update.includes(y)) {
                graph.get(x)?.push(y);
                inDegree.set(y, (inDegree.get(y) || 0) + 1);
            }
        }

        const queue: number[] = [];
        for (const [page, degree] of inDegree.entries()) {
            if (degree === 0) queue.push(page);
        }

        const sorted: number[] = [];
        while (queue.length > 0) {
            const current = queue.shift()!;
            sorted.push(current);
            for (const neighbor of graph.get(current) || []) {
                inDegree.set(neighbor, (inDegree.get(neighbor) || 1) - 1);
                if (inDegree.get(neighbor) === 0) queue.push(neighbor);
            }
        }

        return sorted[Math.floor(sorted.length / 2)];
    }
}

const run = new Run(process.argv[2]);

run.run();