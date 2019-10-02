import * as PIXI from 'pixi.js';
import Grid from './Grid';
import GridGenerator from './generators/GridGenerator';
import EditStage from './EditStage';

export default class Land extends PIXI.Container {

    private readonly grids: Grid[][] = [];
    public static readonly GRID_COUNT = 9 + 3;


    public constructor(
        public readonly stage: EditStage,
        x: number,
        y: number
    ) {
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
                const grid = new Grid(this, this.position.x + i  * GridGenerator.SIZE, this.position.y + j * GridGenerator.SIZE);
                this.grids[i].push(grid);
                this.addChild(grid);
            }
        }
    }

    private drawBounds(): void {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0x1d1d1d);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        this.addChild(graphics);
    }


}
