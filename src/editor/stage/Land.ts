import * as PIXI from 'pixi.js';
import Grid from './Grid';

export default class Land extends PIXI.Container {

    private readonly grids: Grid[][] = [];
    public static readonly GRID_COUNT = 9;

    public constructor(x: number, y: number) {
        super();
        this.createGrid();
        this.drawBounds();

        this.position.x = x;
        this.position.y = y;
    }

    private createGrid(): void {
        for (let i = 0; i < Land.GRID_COUNT; i ++) {
            this.grids.push([]);
            for (let j = 0; j < Land.GRID_COUNT; j ++) {
                const grid = new Grid(this.position.x + i  * Grid.SIZE, this.position.y + j * Grid.SIZE);
                this.grids[i].push(grid);
                this.addChild(grid);
            }
        }
    }

    private drawBounds(): void {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0x00FF00);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        this.addChild(graphics);
    }


}