import * as PIXI from 'pixi.js';
import EditStage from './stage/EditStage';
import {Viewport, WheelEventData} from 'pixi-viewport';
import ToolbarManager from './toolbar/ToolbarManager';
import Exporter from './bag/Exporter';
import Land from './stage/Land';
import Grid from './stage/Grid';
import Importer from './bag/Importer';

export default class Editor {

    private readonly pixi: PIXI.Application;
    private viewport: Viewport;
    public toolbarManager: ToolbarManager;
    public exporter: Exporter;
    public importer: Importer;
    private readonly stage: EditStage;

    public constructor() {

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.ROUND_PIXELS = true;

        this.pixi = new PIXI.Application({
            backgroundColor: 0x392635,
            width: window.innerWidth,
            height: window.innerHeight,
        });

        this.stage = new EditStage(this);

        this.toolbarManager = new ToolbarManager(this);
        this.exporter = new Exporter('#exporter', this);
        this.importer = new Importer('#importer', this);

        this.setViewport();

        this.toolbarManager.setActiveToolByIndex(0);

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

        const stage = this.stage;

        stage.pivot = new PIXI.Point(
            stage.pivot.x = stage.width / 2,
            stage.pivot.y = stage.height / 2
        );

        stage.position = new PIXI.Point(
            this.pixi.renderer.width / 2,
            this.pixi.renderer.height / 2
        );

        this.viewport.addChildAt(stage, 0);

        this.pauseDrag();
    }

    public getLandAt(x: number, y: number): Land {
        return this.stage.getLandAt(x, y);
    }

    public getLands(): Land[][] {
        return this.stage.getLands();
    }

    public getData(): number[][][][] {
        const data: number[][][][] = [];

        const lands = this.stage.getLands();

        lands.forEach((lands: Land[], i: number) => {
            data.push([]);
            lands.forEach((land: Land, j: number) => {
                data[i].push([]);
                land.getGrids().forEach((grids: Grid[], k: number) => {
                    data[i][j].push([]);
                    grids.forEach((grid: Grid) => {
                        data[i][j][k].push(grid.getBlockId());
                    });
                });
            });
        });

        return data;
    }

    public importData(data: number[][][][]): void {
        this.stage.setLands(data);
    }

    /**
     * Pauses wheel viewport plugin
     */
    public pauseWheel(): void {
        this.viewport.plugins.pause('wheel');
    }

    /**
     * Resumes wheel viewport plugin
     */
    public resumeWheel(): void {
        this.viewport.plugins.resume('wheel');
    }

    /**
     * Pauses drag viewport plugin
     */
    public pauseDrag(): void {
        this.viewport.plugins.pause('drag');
    }

    /**
     * Resumes drag viewport plugin
     */
    public resumeDrag(): void {
        this.viewport.plugins.resume('drag');
    }

    /**
     * Returns the html canvas of the PIXI app
     */
    public getView(): HTMLCanvasElement {
        return this.pixi.view;
    }

    /**
     * Resize the editor canvas
     * @param width
     * @param height
     */
    public resize(width: number, height: number): void {
        this.pixi.renderer.resize(width, height);
        this.viewport.resize(width, height);
    }

    public get renderer(): PIXI.Renderer {
        return this.pixi.renderer;
    }
}