import ToolbarManager from './ToolbarManager';
import BlockIndex, {IBlockIndex, IBlockIndexData} from '../indexes/BlockIndex';
import Block from './blocks/Block';

export default class BlockSelectorManager {

    private readonly HTMLElement: HTMLElement;
    private blocks: Block[] = [];

    public constructor(
        private readonly element: string,
        private readonly toolbarManager: ToolbarManager,
        private readonly blockIndex: IBlockIndex
    ) {
        this.HTMLElement = document.querySelector(element);

        if (!this.HTMLElement) {
            throw new Error('Block selector expects an HTML element to be provided');
        }

        this.HTMLElement.addEventListener('mouseover', () => toolbarManager.editor.pauseWheel());
        this.HTMLElement.addEventListener('mouseleave', () => toolbarManager.editor.resumeWheel());

        this.setBlocks(blockIndex);
    }

    public setBlocks(blockIndex: IBlockIndex) {
        this.blocks = [];
        this.HTMLElement.innerHTML = '';

        Object.entries<IBlockIndex>(BlockIndex.index).forEach((value) => {
            const id: number = parseInt(value[0]);
            const data: IBlockIndexData = value[1] as IBlockIndexData;

            if (id === 0) {
                return;
            }

            const block = new Block(this, id, data);
            this.blocks.push(block);
            this.HTMLElement.append(block.getBlockElement());
        });
    }

    public setActiveBlockByIndex(index: number) {
        const block = this.blocks[index];
        if (block) {
            this.setActiveBlock(block);
        }
    }

    public setActiveBlock(block: Block): void {
        this.deselectAll();
        block.getBlockElement().classList.add('selected');
        this.toolbarManager.selectedBlockId = block.id;
    }

    private deselectAll(): void {
        this.blocks.forEach((block: Block) => {
            block.getBlockElement().classList.remove('selected');
        });
    }

}