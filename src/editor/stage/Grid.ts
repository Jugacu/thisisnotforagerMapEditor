import * as PIXI from 'pixi.js';
import Land from './Land';
import {Tool} from '../toolbar/tools/Tool';

export default class Grid extends PIXI.Sprite {

    public constructor(
        private readonly land: Land,
        x: number, y: number
    ) {
        super(
            PIXI.utils.TextureCache['water']
        );

        this.position.set(x, y);
        this.interactive = true;

        this.on('mousedown', () => this.onClick());
    }

    private onClick = (): void => {
        const tool: Tool = this.land.stage.editor.toolbarManager.getActiveTool();
        if (tool) {
            tool.onGridClick(this);
        }
    }

}
