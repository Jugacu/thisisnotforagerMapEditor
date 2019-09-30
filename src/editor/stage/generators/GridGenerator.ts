import * as PIXI from 'pixi.js';
import EditStage from '../EditStage';

export default class GridGenerator extends PIXI.Graphics {

    private readonly renderer: PIXI.Renderer;
    public static readonly SIZE =  20;

    public constructor(
        private readonly stage: EditStage
    ) {
        super();

        this.renderer = stage.editor.renderer;
    }

    public generateTexture(): void {
        this.drawTexture();

        const texture = this.renderer.generateTexture(this, PIXI.settings.SCALE_MODE, 1);

        PIXI.Texture.addToCache(texture, 'grid');
    }

    private drawTexture(): void {
        this.beginFill(0x0075a7);
        this.lineStyle(1, 0x0099db, 1);
        this.drawRect(0, 0, GridGenerator.SIZE, GridGenerator.SIZE);
    }
}