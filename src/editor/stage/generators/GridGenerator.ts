import * as PIXI from 'pixi.js';
import EditStage from '../EditStage';
import BlockIndex, {IBlockIndex, IBlockIndexData} from '../indexes/BlockIndex';

export default class GridGenerator extends PIXI.Graphics {

    private readonly renderer: PIXI.Renderer;
    public static readonly SIZE =  20;

    public constructor(
        private readonly stage: EditStage
    ) {
        super();

        this.renderer = stage.editor.renderer;
    }

    public generateTextures(): void {

        Object.entries<IBlockIndex>(BlockIndex.index).forEach((value) => {
            const id: number = parseInt(value[0]);
            const data: IBlockIndexData = value[1] as IBlockIndexData;

            this.drawTexture(data.color);
            const texture = this.renderer.generateTexture(this, PIXI.settings.SCALE_MODE, 1);

            PIXI.Texture.addToCache(texture, data.name);
        });
    }

    private drawTexture(color: number): void {

        const darker = (color & 0xfefefe) >> 1;

        this.clear();

        this.beginFill(color);
        this.lineStyle(1, darker, 1);
        this.drawRect(0, 0, GridGenerator.SIZE, GridGenerator.SIZE);
    }
}