import {IBlockIndexData} from '../../indexes/BlockIndex';
import BlockSelectorManager from '../BlockSelectorManager';

export default class Block {

    private readonly blockElement: HTMLElement;

    public constructor(
        private readonly blockSelectorManager: BlockSelectorManager,
        public readonly id: number,
        private readonly blockData: IBlockIndexData
    ) {
        const darker = (blockData.color & 0xfefefe) >> 1;

        this.blockElement = document.createElement('div');
        const blockRenderer = document.createElement('div');
        const blockName = document.createElement('div');

        this.blockElement.classList.add('block');
        blockRenderer.classList.add('render');
        blockName.classList.add('name');

        blockName.innerText = blockData.name;

        blockRenderer.style.borderColor = `#${darker.toString(16)}`;
        blockRenderer.style.backgroundColor = `#${blockData.color.toString(16)}`;

        this.blockElement.append(blockRenderer);
        this.blockElement.append(blockName);

        this.blockElement.addEventListener('click', () => this.onClick());
    }

    public getBlockElement(): HTMLElement {
        return this.blockElement;
    }

    public onClick(): void {
        this.blockSelectorManager.setActiveBlock(this);
    }
}
