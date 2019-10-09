import * as PIXI from 'pixi.js';
import Grid from './Grid';
import Land from './Land';
import Editor from '../Editor';
import GridGenerator from './generators/GridGenerator';

export default class EditStage extends PIXI.Container {

    private static readonly LAND_COUNT = 3;
    private readonly gridGenerator: GridGenerator;

    private lands: Land[][] = [];

    public constructor(
        public readonly editor: Editor
    ) {
        super();

        this.gridGenerator = new GridGenerator(this);
        this.gridGenerator.generateTextures();

        this.createLands();
    }

    public getLandAt(x: number, y: number): Land {
        return this.lands[x][y];
    }

    private createLands(): void {
        for (let i = 0; i < EditStage.LAND_COUNT; i++) {
            this.lands.push([]);
            for (let j = 0; j < EditStage.LAND_COUNT; j++) {
                const land = new Land(this, j * Land.GRID_COUNT * GridGenerator.SIZE, i * Land.GRID_COUNT * GridGenerator.SIZE);
                this.lands[i].push(land);
                this.addChild(land);
            }
        }
    }

    public setLands(data: number[][][][]): void {
        this.lands = [];
        this.removeChildren();

        for (let i = 0; i < data.length; i++) {
            this.lands.push([]);
            for (let j = 0; j < data[i].length; j++) {
                const land = new Land(this, j * Land.GRID_COUNT * GridGenerator.SIZE / 2, i * Land.GRID_COUNT * GridGenerator.SIZE / 2);
                land.setGrid(data[i][j]);
                this.lands[i].push(land);
                this.addChild(land);
            }
        }
    }

    public getLands(): Land[][] {
        return this.lands;
    }

}
