import * as PIXI from 'pixi.js';

export default class Grid extends PIXI.Graphics {

    public static readonly SIZE =  40;

    public constructor(x: number, y: number) {
        super();

        this.beginFill(0xFF1493);
        this.lineStyle(1, 0xffd900, 1);
        this.drawRect(0, 0, 40, 40);

        this.position.x = x;
        this.position.y = y;
    }

}