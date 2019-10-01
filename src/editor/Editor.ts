import * as PIXI from 'pixi.js';
import EditStage from './stage/EditStage';
import {Viewport, WheelEventData} from 'pixi-viewport';
import ToolbarManager from './toolbar/ToolbarManager';

export default class Editor {

    private readonly pixi: PIXI.Application;
    private viewport: Viewport;
    private toolbarManager: ToolbarManager;

    public constructor() {

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.ROUND_PIXELS = true;

        this.pixi = new PIXI.Application({
            backgroundColor: 0x392635,
            width: window.innerWidth,
            height: window.innerHeight,
        });

        this.toolbarManager = new ToolbarManager(this);

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

        const stage = new EditStage(this);

        stage.pivot = new PIXI.Point(
            stage.pivot.x = stage.width / 2,
            stage.pivot.y = stage.height / 2
        );

        stage.position = new PIXI.Point(
            this.pixi.renderer.width / 2,
            this.pixi.renderer.height / 2
        );

        this.viewport.addChildAt(stage, 0);
    }

    public pauseDrag(): void {
        this.viewport.plugins.pause('drag');
    }

    public startDrag(): void {
        this.viewport.plugins.resume('drag');
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