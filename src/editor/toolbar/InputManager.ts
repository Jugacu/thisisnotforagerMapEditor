import EditStage from '../stage/EditStage';
import Land from '../stage/Land';
import Editor from '../Editor';

export default class InputManager {

    private readonly HTMLElement: HTMLElement;
    private readonly landCount: HTMLInputElement;
    private readonly gridCount: HTMLInputElement;

    public constructor(private readonly element: string,
                       private readonly editor: Editor) {
        let btn = document.getElementById('inputChange');
        btn.addEventListener('click', () => this.readSizes(editor));

        this.HTMLElement = document.querySelector(element);

        if (!this.HTMLElement) {
            throw new Error(`Element ${element} not found in document.`);
        }

        this.landCount = <HTMLInputElement>document.getElementById('landCount');
        this.gridCount = <HTMLInputElement>document.getElementById('gridCount');

        this.landCount.value = String(EditStage.LAND_COUNT);
        this.gridCount.value = String(Land.GRID_COUNT);
    }

    private readSizes(editor: Editor) {
        let landCount = parseInt(this.landCount.value);
        let gridCount = parseInt(this.gridCount.value);

        if (InputManager.isValid(landCount) && InputManager.isValid(gridCount)) {
            this.setSizes(landCount, gridCount);
            editor.redoMap();
        }
    }

    private setSizes = (landCount: number, gridCount: number): void => {
        EditStage.LAND_COUNT = landCount;
        Land.GRID_COUNT = gridCount;
    }

    private static isValid(n: number): boolean {
        let min = 0;
        let max = 50;
        return !isNaN(n) && min < n && n < max;
    }
}
