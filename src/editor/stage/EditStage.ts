import * as PIXI from 'pixi.js';
import Grid from './Grid';
import Land from './Land';

export default class EditStage extends PIXI.Container {

    private lands: Land[][] = [];
    
    public constructor() {
        super();
        this.createLands();
    }

    private createLands(): void {

        for (let i = 0; i < 3; i++) {
            this.lands.push([]);
            for (let j = 0; j < 3; j++) {
                const land = new Land(i * Land.GRID_COUNT * Grid.SIZE, j * Land.GRID_COUNT * Grid.SIZE);
                this.lands[i].push(land);
                this.addChild(land);
            }
        }
    }

}