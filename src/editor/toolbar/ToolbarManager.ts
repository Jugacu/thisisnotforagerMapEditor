import Editor from '../Editor';
import {Tool} from './tools/Tool';
import MoveTool from './tools/MoveTool';
import EditTool from './tools/EditTool';
import EraseTool from './tools/EraseTool';
import BlockSelectorManager from './BlockSelectorManager';
import BlockIndex from '../indexes/BlockIndex';
import BucketTool from './tools/BucketTool';
import InputManager from './InputManager';

export default class ToolbarManager {

    private tools: Tool[] = [];
    private activeTool: Tool;
    private blockSelectorManager: BlockSelectorManager;
    private inputManager: InputManager;
    public selectedBlockId: number;

    // Todo: change this canvas to be inserted other way
    private canvas: HTMLElement;

    public constructor(
        public readonly editor: Editor
    ) {
        this.setTools();
        this.canvas = document.querySelector<HTMLElement>('#canvas');

        this.blockSelectorManager = new BlockSelectorManager('#blockSelector', this, BlockIndex.index);
        this.blockSelectorManager.setActiveBlockByIndex(1);

        this.inputManager = new InputManager('#inputs', this.editor);
    }


    private setTools = (): void => {
        this.tools.push(new MoveTool('#move', this.editor, this, 'Space'));
        this.tools.push(new EditTool('#edit', this.editor, this, 'KeyE'));
        this.tools.push(new BucketTool('#bucket', this.editor, this, 'KeyC'));
    }

    public setActiveToolByIndex = (index: number): void => {
        const tool: Tool = this.tools[index];
        if (tool) {
            this.setActiveTool(tool);
        }
    }

    public setActiveTool = (tool: Tool): void => {
        this.removeSelectedClass();
        tool.getHTMLElement().classList.add('active');

        this.canvas.style.cursor = tool.cursor;
        this.activeTool = tool;

        this.editor.pauseDrag();
        tool.onToolClick();
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
