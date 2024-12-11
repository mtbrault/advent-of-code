import _ from "lodash";
import Core from "../common/Core";

class Run extends Core {
    private stones: number[] = [];

    protected parse() {
        this.stones = this.lines[0].split(' ').map(Number);
    }

    protected step1(): number {
        return this.proceed(25);
    }

    protected step2(): number {
        this.parse();
        return this.proceed(75);
    }

    private proceed(iteration: number): number {
        let stoneCounts = new Map<string, number>();

        for (const value of this.stones) {
            const key = value.toString();
            stoneCounts.set(key, (stoneCounts.get(key) || 0) + 1);
        }

        for (let i = 0; i < iteration; i++) {
            const newStoneCounts = new Map<string, number>();

            for (const [key, count] of stoneCounts.entries()) {
                const value = Number(key);

                if (value === 0) {
                    newStoneCounts.set('1', (newStoneCounts.get('1') || 0) + count);
                } else {
                    const digits = key.length;

                    if (digits % 2 === 0) {
                        const mid = digits / 2;
                        const left = key.substring(0, mid).replace(/^0+/, '');
                        const right = key.substring(mid).replace(/^0+/, '');

                        newStoneCounts.set(left, (newStoneCounts.get(left) || 0) + count);
                        newStoneCounts.set(right, (newStoneCounts.get(right) || 0) + count);
                    } else {
                        const newValue = (value * 2024).toString();
                        newStoneCounts.set(newValue, (newStoneCounts.get(newValue) || 0) + count);
                    }
                }
            }

            stoneCounts = newStoneCounts;
        }

        return _.sum(Array.from(stoneCounts.values()));
    }
};

const run = new Run(process.argv[2]);

run.run();