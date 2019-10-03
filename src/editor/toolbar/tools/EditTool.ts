import {Tool} from './Tool';
import Grid from '../../stage/Grid';
import Editor from '../../Editor';
import ToolbarManager from '../ToolbarManager';

export default class EditTool extends Tool {

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
        grid.setBlock(this.toolbarManager.selectedBlockId);
    }

    public onToolClick(): void {
    }


    public get cursor(): string {
        return super.cursor;
        // return `url('/assets/cursors/edit.svg'), auto`;
    }

    public onGridDrag(grid: Grid): void {
        this.onGridClick(grid);
    }
}