import Editor from '../../Editor';
import ToolbarManager from '../ToolbarManager';
import Grid from '../../stage/Grid';

export abstract class Tool {

    protected readonly element: HTMLElement;

    protected constructor(
        element: string,
        protected readonly editor: Editor,
        protected readonly toolbarManager: ToolbarManager,
        shortcut: string
    ) {

        const HTMLElement = document.querySelector<HTMLElement>(element);

        if (!HTMLElement) {
            throw new Error(`Element not found.`);
        }

        this.element = HTMLElement;

        if (shortcut) {
            document.addEventListener('keydown', (e: KeyboardEvent) => {
                if (shortcut === e.code) {
                    this.fireOnClick();
                }
            });
        }

        this.element.addEventListener('click', () => {
            this.fireOnClick();
        });
    }

    private fireOnClick = (): void => {
        this.toolbarManager.setActiveTool(this);
        this.editor.pauseDrag();
        this.onToolClick();
    }

    public getHTMLElement = (): HTMLElement => {
        return this.element;
    }

    public abstract onToolClick(): void;

    public abstract onGridClick(grid: Grid): void;

    public get cursor(): string {
        return 'default';
    }
}