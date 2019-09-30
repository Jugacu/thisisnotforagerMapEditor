import * as PIXI from 'pixi.js';

export default class Grid extends PIXI.Sprite {

    public constructor(x: number, y: number) {
        super(
            PIXI.utils.TextureCache['grid']
        );

        this.position.set(x, y);

    }

}