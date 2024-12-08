import Core from "../common/Core";

type Coordinate = { x: number; y: number };

class Run extends Core {
    private antennas: Record<string, Coordinate[]> = {};
    private map: string[][] = [];

    protected parse(): void {
        this.antennas = this.lines.reduce((acc, line, x) => {
            this.map[x] = line.split('');
            this.map[x].forEach((char, y) => {
                if (char === '.') {
                    return;
                }
                if (!acc[char]) {
                    acc[char] = [];
                }
                acc[char].push({ x, y });
            });
            return acc;
        }, {} as Record<string, Coordinate[]>);
    }

    protected step1(): number {
        return this.process();
    }

    protected step2(): number {
        return this.process(true);
    }

    private process(part2 = false): number {
        const allAntinodes: string[] = [];

        for (const coords of Object.values(this.antennas)) {
            const antinodes = this.findAntinodeCoords(coords, part2);

            allAntinodes.push(...antinodes);
        }

        return [...new Set(allAntinodes)].filter((antinode) => {
            const [x, y] = antinode.split('.').map(Number);
            return this.map[x] && this.map[x][y];
        }).length;
    }

    private findAntinodeCoords(coords: Coordinate[], part2 = false): string[] {
        const antinodes = [];

        if (part2) {
            antinodes.push(...coords.map((coord) => `${coord.x}.${coord.y}`));
        }

        for (let first = 0; first < coords.length; first += 1) {
            for (let second = first + 1; second < coords.length; second += 1) {
                const vector: Coordinate = { x: coords[second].x - coords[first].x, y: coords[second].y - coords[first].y };

                if (!part2) {
                    antinodes.push(`${coords[first].x - vector.x}.${coords[first].y - vector.y}`,
                        `${coords[second].x + vector.x}.${coords[second].y + vector.y}`);
                } else {
                    let i = 1;
                    while ((coords[first].x - (vector.x * i) >= 0)
                        && (coords[first].y - (vector.y * i) >= 0)) {
                        antinodes.push(`${coords[first].x - (vector.x * i)}.${coords[first].y - (vector.y * i)}`);
                        i += 1;
                    }
                    i = 1;
                    while ((coords[second].x + (vector.x * i)) < this.map.length
                        && (coords[second].y + (vector.y * i)) < this.map[0].length) {
                        antinodes.push(`${coords[second].x + (vector.x * i)}.${coords[second].y + (vector.y * i)}`);
                        i += 1;
                    }
                }

            }
        }
        return antinodes;
    }
}

const run = new Run(process.argv[2]);

run.run();