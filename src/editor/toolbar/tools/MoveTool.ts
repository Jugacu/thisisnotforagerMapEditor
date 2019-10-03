import {Tool} from './Tool';
import Grid from '../../stage/Grid';
import Editor from '../../Editor';
import ToolbarManager from '../ToolbarManager';

export default class MoveTool extends Tool {

    public constructor(
        element: string,
        editor: Editor,
        toolbarManager: ToolbarManager,
        shortcut ?: string
    ) {
        super(element, editor, toolbarManager, shortcut);
    }


    public onGridClick(grid: Grid): void {
    }

    public onToolClick(): void {
        this.editor.resumeDrag();
        this.editor.resumeWheel();
    }


    public get cursor(): string {
        return 'move';
    }

    public onGridDrag(grid: Grid): void {
    }
}