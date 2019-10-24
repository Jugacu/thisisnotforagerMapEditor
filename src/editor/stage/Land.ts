import * as PIXI from 'pixi.js';
import Grid from './Grid';
import GridGenerator from './generators/GridGenerator';
import EditStage from './EditStage';

export default class Land extends PIXI.Container {

    private grids: Grid[][] = [];
    public static GRID_COUNT = 9 + 3;


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

    public getGridAt(x: number, y: number): Grid {
        if (!this.grids[x]) {
            return undefined;
        }

        return this.grids[x][y];
    }

    public getLengthOfXGridAt(x: number): number {
        return this.grids[x].length;
    }

    public getLengthOfYGrid(): number {
        return this.grids.length;
    }

    private createGrid(): void {
        for (let i = 0; i < Land.GRID_COUNT; i++) {
            this.grids.push([]);
            for (let j = 0; j < Land.GRID_COUNT; j++) {
                const grid = new Grid(this, this.position.x + j * GridGenerator.SIZE, this.position.y + i * GridGenerator.SIZE);
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

    public setLandText(x: number, y: number) {
        const text = new PIXI.Text(
            `(${x},${y})`,
            {
                fill: 'rgba(255, 255, 255, 0.5)',
                fontSize: '11px',
                fontFamily: 'monospace'
            }
        );
        this.addChild(text);
    }

    public setGrid(data: number[][]): void {
        this.grids = [];
        this.removeChildren();

        for (let i = 0; i < data.length; i++) {
            this.grids.push([]);
            for (let j = 0; j < data[i].length; j++) {
                const grid = new Grid(this, this.position.x + j * GridGenerator.SIZE, this.position.y + i * GridGenerator.SIZE);
                grid.setBlock(data[i][j]);
                this.grids[i].push(grid);
                this.addChild(grid);
            }
        }

        this.drawBounds();
    }


    public getGrids(): Grid[][] {
        return this.grids;
    }

}
