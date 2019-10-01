import Editor from '../Editor';
import {Tool} from './tools/Tool';
import MoveTool from './tools/MoveTool';
import EditTool from './tools/EditTool';

export default class ToolbarManager {

    private tools: Tool[] = [];
    private activeTool: Tool;

    // Todo: change this canvas to be inserted other way
    private canvas: HTMLElement;

    public constructor(
        private readonly editor: Editor
    ) {
        this.setTools();
        this.canvas = document.querySelector<HTMLElement>('#canvas');
    }


    private setTools = (): void => {
        this.tools.push(new MoveTool('#move', this.editor, this, 'Space'));
        this.tools.push(new EditTool('#edit', this.editor, this));
    }

    public setActiveTool = (tool: Tool): void => {
        this.removeSelectedClass();
        tool.getHTMLElement().classList.add('active');
        this.canvas.style.cursor = tool.cursor;
        this.activeTool = tool;
    }

    public getActiveTool = (): Tool => {
        return this.activeTool;
    }

    private removeSelectedClass = (): void => {
        this.tools.forEach((tool: Tool) => {
           tool.getHTMLElement().classList.remove('active');
        });
    }
}