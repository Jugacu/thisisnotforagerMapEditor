import Editor from '../Editor';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export default class Importer {

    private readonly HTMLElement: HTMLElement;

    constructor(
        private element: string,
        private readonly editor: Editor
    ) {
        this.HTMLElement = document.querySelector<HTMLElement>(element);
        if (!this.HTMLElement) {
            throw new Error(`Element ${element} not found in document.`);
        }

        this.HTMLElement.addEventListener('change', (e: HTMLInputEvent) => this.import(e));
    }

    // TODO if upload file change map cannot reupload same file

    private import(e: HTMLInputEvent): void {
        const reader = new FileReader();
        reader.onload = () => this.dataLoaded(reader);
        reader.readAsText(e.target.files[0]);
    }

    private dataLoaded(reader: FileReader): void {
        try {
            const parsed = JSON.parse(reader.result.toString());
            this.editor.importData(parsed);
        } catch (e) {
            console.error(e);
        }
    }
}
