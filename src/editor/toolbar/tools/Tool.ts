import Editor from '../../Editor';
import ToolbarManager from '../ToolbarManager';
import Grid from '../../stage/Grid';

export abstract class Tool {

    protected readonly element: HTMLElement;

    protected constructor(
        element: string,
        protected readonly editor: Editor,
        protected readonly toolbarManager: ToolbarManager
    ) {

        const HTMLElement = document.querySelector<HTMLElement>(element);

        if (!HTMLElement) {
            throw new Error(`Element not found.`);
        }

        this.element = HTMLElement;

        this.element.addEventListener('click', () => {
            this.toolbarManager.setActiveTool(this);
            this.editor.pauseDrag();
            this.onToolClick();
        });
    }

    public getHTMLElement = (): HTMLElement => {
        return this.element;
    }

    public abstract onToolClick(): void;

    public abstract onGridClick(grid: Grid): void;
}