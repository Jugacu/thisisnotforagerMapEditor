import EditStage from '../stage/EditStage';
import Land from '../stage/Land';
import Editor from '../Editor';

export default class InputManager {

    private readonly HTMLElement: HTMLElement;
    private readonly landCount: HTMLInputElement;
    private readonly gridCount: HTMLInputElement;

    public constructor(
        private readonly element: string,
        private readonly editor: Editor
    ) {
        this.HTMLElement = document.querySelector(element);

        if (!this.HTMLElement) {
            throw new Error(`Element ${element} not found in document.`);
        }

        this.landCount = document.querySelector<HTMLInputElement>('#landCount');
        this.gridCount = document.querySelector<HTMLInputElement>('#gridCount');

        this.putInputValues();

        let btn = document.querySelector<HTMLElement>('#inputChange');
        btn.addEventListener('click', () => this.checkNumbers());

        let yes = document.querySelector<HTMLElement>('#changeYes');
        yes.addEventListener('click', () => this.setSizes());

        let no = document.querySelector<HTMLElement>('#changeNo');
        no.addEventListener('click', () => this.makeSure(false));
    }

    private checkNumbers() {
        let landCount = parseInt(this.landCount.value);
        let gridCount = parseInt(this.gridCount.value);

        let landsValid = InputManager.isValid(landCount, 1, 10);

        if (landsValid && InputManager.isValid(gridCount, 1, 50)) {
            document.querySelector<HTMLElement>('#errorNumbers').style.display = 'none';
            this.makeSure(true);
        } else {
            let error = document.querySelector<HTMLElement>('#errorNumbers');
            error.style.display = 'block';
            if (landsValid) {
                error.innerHTML = 'Grids must be between 1 and 50';
            } else {
                error.innerHTML = 'Lands must be between 1 and 10';
            }
            this.putInputValues();
        }
    }

    // Called by yes element with listener
    private setSizes() {
        EditStage.LAND_COUNT = parseInt(this.landCount.value);
        Land.GRID_COUNT = parseInt(this.gridCount.value);

        this.editor.redoMap();
        this.makeSure(false);
    }

    // Change between inputs and make sure
    private makeSure(sure: boolean) {
        let change = document.querySelector<HTMLElement>('#change');
        let changeSure = document.querySelector<HTMLElement>('#changeSure');
        if (sure) {
            change.style.display = 'none';
            changeSure.style.display = 'block';
        } else {
            change.style.display = 'block';
            changeSure.style.display = 'none';
            this.putInputValues();
        }
    }

    private putInputValues() {
        this.landCount.value = String(EditStage.LAND_COUNT);
        this.gridCount.value = String(Land.GRID_COUNT);
    }

    private static isValid(n: number, min: number, max: number): boolean {
        return !(isNaN(n) || min > n || n > max);
    }
}
