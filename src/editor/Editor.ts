import * as PIXI from 'pixi.js';
import EditStage from './stage/EditStage';
import {Viewport} from 'pixi-viewport';

export default class Editor {

    private readonly pixi: PIXI.Application;
    private viewport: Viewport;

    public constructor() {
        this.pixi = new PIXI.Application({
            backgroundColor: 0x392635,
            width: window.innerWidth,
            height: window.innerHeight
        });

        this.setViewport();
    }

    private setViewport(): void {
        this.viewport = new Viewport();
        this.pixi.stage.addChild(this.viewport);

        this.viewport.drag({
            wheel: false,
            mouseButtons: 'left'
        });

        this.viewport.setZoom(1);

        this.viewport.addChildAt(new EditStage(), 0);
    }

    /**
     * Returns the html canvas of the PIXI app
     */
    public getView (): HTMLCanvasElement {
        return this.pixi.view;
    }

}