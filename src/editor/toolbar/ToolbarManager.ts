import Editor from '../Editor';
import {Tool} from './tools/Tool';
import MoveTool from './tools/MoveTool';
import EditTool from './tools/EditTool';

export default class ToolbarManager {

    private tools: Tool[] = [];
    private activeTool: Tool;

    public constructor(
        private readonly editor: Editor
    ) {
        this.setTools();
    }


    private setTools = (): void => {
        this.tools.push(new MoveTool('#move', this.editor, this));
        this.tools.push(new EditTool('#edit', this.editor, this));
    }

    public setActiveTool = (tool: Tool): void => {
        this.removeSelectedClass();
        tool.getHTMLElement().classList.add('active');
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