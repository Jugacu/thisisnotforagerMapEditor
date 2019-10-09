import {Tool} from './Tool';
import Grid from '../../stage/Grid';
import Editor from '../../Editor';
import ToolbarManager from '../ToolbarManager';
import Land from '../../stage/Land';

export default class BucketTool extends Tool {

    public constructor(
        element: string,
        editor: Editor,
        toolbarManager: ToolbarManager,
        shortcut ?: string
    ) {
        super(element, editor, toolbarManager, shortcut);
    }

    public onGridClick(grid: Grid): void {

        if (this.toolbarManager.selectedBlockId === undefined) {
            return;
        }

        let landCoordinates: number[];
        let gridCoordinates: number[];

        let after = this.toolbarManager.selectedBlockId;
        let before = grid.getBlockId();

        if (after === before) {
            return;
        }

        landCoordinates = this.getIndexOfK<Land>(this.editor.getLands(), grid.land);
        gridCoordinates = this.getIndexOfK<Grid>(grid.land.getGrids(), grid);

        this.expand(before, after, landCoordinates[0], landCoordinates[1], gridCoordinates[0], gridCoordinates[1]);
    }

    /**
     * Returns the index of a given object from a given 2d array
     * @param matrix
     * @param grid
     */
    public getIndexOfK<T>(matrix: T[][], grid: T): number[] {
        for (let i = 0; i < matrix.length; i++) {
            const index = matrix[i].indexOf(grid);
            if (index > -1) {
                return [i, index];
            }
        }
    }

    public onToolClick(): void {
    }

    private right(a: number, b: number, c: number, d: number): number[] {

        let result: number[] = [a, b, c, d];

        const land = this.editor.getLandAt(a, b);

        if (land && d === land.getLengthOfXGridAt(c) - 1) {
            result[1]++;
            result[3] = 0;
        } else {
            result[3]++;
        }

        return result;
    }

    private left(a: number, b: number, c: number, d: number): number[] {

        let result: number[] = [a, b, c, d];
        const land = this.editor.getLandAt(a, b);

        if (land && d === 0) {
            result[3] = land.getLengthOfXGridAt(c) - 1;
            result[1]--;
        } else {
            result[3]--;
        }

        return result;
    }

    private top(a: number, b: number, c: number, d: number): number[] {

        let result: number[] = [a, b, c, d];

        const land = this.editor.getLandAt(a, b);

        if (land && c === 0) {
            result[2] = land.getLengthOfYGrid() - 1;
            result[0]--;
        } else {
            result[2]--;
        }

        return result;
    }

    private bot(a: number, b: number, c: number, d: number): number[] {

        let result: number[] = [a, b, c, d];

        const land = this.editor.getLandAt(a, b);

        if (land && c === land.getLengthOfYGrid() - 1) {
            result[0]++;
            result[2] = 0;
        } else {
            result[2]++;
        }

        return result;
    }


    private expand(before: number, after: number, a: number, b: number, c: number, d: number): void {

        let land = this.editor.getLandAt(a, b);
        let grid;
        if (land) {
            grid = land.getGridAt(c, d);
        }
        if (grid) {
            this.editor.getLandAt(a, b).getGridAt(c, d).setBlock(after);
        }

        let nextPos: number[] = this.left(a, b, c, d);

        if (!nextPos.includes(undefined)) {
            if (nextPos[1] === -1) {
                return;
            }

            land = this.editor.getLandAt(nextPos[0], nextPos[1]);
            grid = undefined;
            if (land) {
                grid = land.getGridAt(nextPos[2], nextPos[3]);
            }

            if (grid && grid.getBlockId() === before) {
                this.expand(before, after, nextPos[0], nextPos[1], nextPos[2], nextPos[3]);
            }
        }

        nextPos = this.right(a, b, c, d);

        if (!nextPos.includes(undefined)) {
            if (nextPos[1] === 3) {
                return;
            }

            land = this.editor.getLandAt(nextPos[0], nextPos[1]);
            grid = undefined;
            if (land) {
                grid = land.getGridAt(nextPos[2], nextPos[3]);
            }

            if (grid && grid.getBlockId() === before) {
                this.expand(before, after, nextPos[0], nextPos[1], nextPos[2], nextPos[3]);
            }
        }

        nextPos = this.top(a, b, c, d);
        if (!nextPos.includes(undefined)) {
            if ((nextPos[0] === -1) || (nextPos[0] === 3)) {
                return;
            }

            land = this.editor.getLandAt(nextPos[0], nextPos[1]);
            grid = undefined;
            if (land) {
                grid = land.getGridAt(nextPos[2], nextPos[3]);
            }

            if (grid && grid.getBlockId() === before) {
                this.expand(before, after, nextPos[0], nextPos[1], nextPos[2], nextPos[3]);
            }
        }

        nextPos = this.bot(a, b, c, d);

        if (!nextPos.includes(undefined)) {
            if (nextPos[2] === -1 || (nextPos[0] === -1) || (nextPos[0] === 3)) {
                return;
            }

            land = this.editor.getLandAt(nextPos[0], nextPos[1]);
            grid = undefined;
            if (land) {
                grid = land.getGridAt(nextPos[2], nextPos[3]);
            }

            if (grid && grid.getBlockId() === before) {
                this.expand(before, after, nextPos[0], nextPos[1], nextPos[2], nextPos[3]);
            }
        }
    }


    public get cursor(): string {
        return super.cursor;
        // return `url('/assets/cursors/edit.svg'), auto`;
    }

    public onGridDrag(grid: Grid): void {
        this.onGridClick(grid);
    }
}
