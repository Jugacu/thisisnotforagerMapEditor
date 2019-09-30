import * as PIXI from 'pixi.js';

export default class Grid extends PIXI.Graphics {

    public static readonly SIZE =  20;

    public constructor(x: number, y: number) {
        super();

        this.beginFill(0x0075a7);
        this.lineStyle(1, 0x0099db, 1);
        this.drawRect(0, 0, Grid.SIZE, Grid.SIZE);

        this.position.x = x;
        this.position.y = y;
    }

}