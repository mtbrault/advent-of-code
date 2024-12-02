import _ from "lodash";
import Core from "../common/Core";

class Run extends Core {
    private list1: number[] = [];
    private list2: number[] = [];

    protected parse(): void {
        const [list1, list2] = this.lines.reduce<[number[], number[]]>((acc, line) => {
            const [first, second] = line.split(' ').filter((v) => !!v);
            return [[...acc[0], Number(first)], [...acc[1], Number(second)]]
        }, [[], []]);

        this.list1 = list1;
        this.list2 = list2;
    }

    protected step1(): number {
        const list1 = this.list1.sort();
        const list2 = this.list2.sort();

        return _.chain(_.range(this.list1.length))
            .map((index) => Math.abs(list1[index] - list2[index]))
            .sum()
            .value();
    }

    protected step2(): number {
        return _.chain(this.list1)
             .map((value) => value * this.list2.filter((v) => v === value).length)
             .sum()
             .value();
    }
};

const run = new Run(process.argv[2]);

run.run();
