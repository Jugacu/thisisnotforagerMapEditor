import * as PIXI from 'pixi.js';
import Land from './Land';
import {Tool} from '../toolbar/tools/Tool';
import InteractionEvent = PIXI.interaction.InteractionEvent;
import BlockIndex from '../indexes/BlockIndex';

export default class Grid extends PIXI.Sprite {

    private blockId: number = 0;

    public constructor(
        private readonly land: Land,
        x: number, y: number
    ) {
        super(
            undefined
        );

        this.setBlock(this.blockId);

        this.position.set(x, y);
        this.interactive = true;

        this.on('mousedown', () => this.onClick());
        this.on('mouseover', (e: InteractionEvent) => {
            // Mouse main button is pressed
            if (e.data.buttons === 1) {
                this.onDrag();
            }
        });
    }

    private onClick = (): void => {
        const tool: Tool = this.land.stage.editor.toolbarManager.getActiveTool();
        if (tool) {
            tool.onGridClick(this);
        }
    }

    private onDrag = (): void => {
        const tool: Tool = this.land.stage.editor.toolbarManager.getActiveTool();
        if (tool) {
            tool.onGridDrag(this);
        }
    }

    public setBlock(id: number) {
        this.blockId = id;

        const texture = BlockIndex.getBlockData(id);
        this.texture = PIXI.utils.TextureCache[texture.name];
    }
}
