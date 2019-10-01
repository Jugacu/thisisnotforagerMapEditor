import {Tool} from './Tool';
import Grid from '../../stage/Grid';
import Editor from '../../Editor';
import ToolbarManager from '../ToolbarManager';

export default class MoveTool extends Tool {

    public constructor(
        element: string,
        editor: Editor,
        toolbarManager: ToolbarManager
    ) {
        super(element, editor, toolbarManager);
    }


    onGridClick(grid: Grid): void {
    }

    onToolClick(): void {
        this.editor.startDrag();
    }

}