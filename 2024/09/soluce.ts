import _ from "lodash";
import Core from "../common/Core";

type File = {
    id: number;
    start: number;
    length: number;
}

class Run extends Core {
    private diskArray: string[] = [];
    private files: File[] = [];

    protected parse(): void {
        const line = this.lines[0].split('').map(Number);
        let position = 0;

        for (let i = 0; i < line.length; i += 2) {
            const fileLength = line[i];
            const spaceLength = line[i + 1];

            if (fileLength > 0) {
                this.files.push({ id: i / 2, start: position, length: fileLength });
                this.diskArray.push(...Array(fileLength).fill(`${i / 2}`));
            }

            this.diskArray.push(...Array(spaceLength).fill('.'));
            position += fileLength + spaceLength;
        }

        this.files.sort((a, b) => b.id - a.id);
    }

    protected step1(): number {
        const disk = _.cloneDeep(this.diskArray);
        let total = 0;

        for (let index = 0; index < disk.length; index += 1) {
            if (disk[index] === '.') {
                let fileIndex: number;
                for (fileIndex = disk.length - 1; disk[fileIndex] === '.' && fileIndex > index; fileIndex -= 1);
                if (fileIndex <= index) {
                    break;
                }
                disk[index] = disk[fileIndex];
                disk[fileIndex] = '.';
            }
            total += index * Number(disk[index]);
        }
        return total;
    }

    protected step2(): number {
        const diskArray = _.cloneDeep(this.diskArray);

        for (const file of this.files) {
            // Find the leftmost contiguous span of free space large enough for the file
            let spaceStart = -1;
            let spaceLength = 0;

            for (let i = 0; i < this.diskArray.length; i++) {
                if (diskArray[i] === '.') {
                    if (spaceStart === -1) spaceStart = i;
                    spaceLength++;
                } else {
                    spaceStart = -1;
                    spaceLength = 0;
                }

                if (spaceLength === file.length) break;
            }

            // If a space was found, move the file
            if (spaceLength === file.length && spaceStart !== -1 && spaceStart < file.start) {
                // Clear the original file position
                for (let i = 0; i < file.length; i++) {
                    diskArray[file.start + i] = '.';
                }

                // Move the file to the new position
                for (let i = 0; i < file.length; i++) {
                    diskArray[spaceStart + i] = `${file.id}`;
                }

                // Update the file's starting position
                file.start = spaceStart;
            }
        }

        return diskArray.reduce((checksum, block, position) => {
            return block === '.' ? checksum : checksum + position * parseInt(block);
        }, 0);
    }

    private compactDiskByFiles(diskArray: string[], files: { id: number, start: number, length: number }[]): void {
        // Sort files by descending ID
        files.sort((a, b) => b.id - a.id);
    
        for (const file of files) {
            // Find the leftmost contiguous span of free space large enough for the file
            let spaceStart = -1;
            let spaceLength = 0;
    
            for (let i = 0; i < diskArray.length; i++) {
                if (diskArray[i] === '.') {
                    if (spaceStart === -1) spaceStart = i;
                    spaceLength++;
                } else {
                    spaceStart = -1;
                    spaceLength = 0;
                }
    
                if (spaceLength === file.length) break;
            }
    
            // If a space was found, move the file
            if (spaceLength === file.length && spaceStart !== -1 && spaceStart < file.start) {
                // Clear the original file position
                for (let i = 0; i < file.length; i++) {
                    diskArray[file.start + i] = '.';
                }
    
                // Move the file to the new position
                for (let i = 0; i < file.length; i++) {
                    diskArray[spaceStart + i] = `${file.id}`;
                }
    
                // Update the file's starting position
                file.start = spaceStart;
            }
        }
    }
}

const run = new Run(process.argv[2]);

run.run();