import _ from "lodash";
import Core from "../common/Core";

class Run extends Core {
    private regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    protected parse(): void {
    }

    protected step1(): number {
        let result = 0;

        let match: RegExpExecArray | null;
        while ((match = this.regex.exec(this.input)) !== null) {
            const x = Number(match[1]);
            const y = Number(match[2]);
            result += x * y;
        }
        return result;
    }

    protected step2(): number {
        let result = 0;
        const dontIndexes = this.getIndexes('don\'t()').reverse();
        const doIndexes = this.getIndexes('do()').reverse();

        let match: RegExpExecArray | null;
        while ((match = this.regex.exec(this.input)) !== null) {
            const doIndex = doIndexes.find((v) => v < match!.index) ?? 0;
            const dontIndex = dontIndexes.find((v) => v < match!.index);
            const x = Number(match[1]);
            const y = Number(match[2]);
            if (!dontIndex || doIndex > dontIndex) {
                result += x * y;
            }
        }
        return result;
    }

    private getIndexes(sentence: string): number[] {
        let position = this.input.indexOf(sentence);
        let indexes = [];

        while (position !== -1) {
            indexes.push(position);
            position = this.input.indexOf(sentence, position + 1);
        }
        return indexes;
    }
}

const run = new Run(process.argv[2]);

run.run();