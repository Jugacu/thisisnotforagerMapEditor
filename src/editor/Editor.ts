import * as PIXI from 'pixi.js';
import EditStage from './stage/EditStage';
import {Viewport, WheelEventData} from 'pixi-viewport';

export default class Editor {

    private readonly pixi: PIXI.Application;
    private viewport: Viewport;

    public constructor() {

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.ROUND_PIXELS = true;

        this.pixi = new PIXI.Application({
            backgroundColor: 0x392635,
            width: window.innerWidth,
            height: window.innerHeight,
        });

        this.setViewport();
    }

    private setViewport(): void {
        this.viewport = new Viewport();
        this.pixi.stage.addChild(this.viewport);

        this.viewport.drag({
            clampWheel: true,
            mouseButtons: 'left'
        });

        this.viewport.wheel({
            smooth: 1
        });

        this.viewport.clampZoom({
            maxHeight: this.pixi.renderer.screen.height,
            minWidth: 1
        });

        this.viewport.addChildAt(new EditStage(this), 0);

    }

    /**
     * Returns the html canvas of the PIXI app
     */
    public getView (): HTMLCanvasElement {
        return this.pixi.view;
    }

    /**
     * Resize the editor canvas
     * @param width
     * @param height
     */
    public resize(width: number, height: number): void {
        this.pixi.renderer.resize(width, height);
    }

    public get renderer(): PIXI.Renderer {
        return this.pixi.renderer;
    }
}