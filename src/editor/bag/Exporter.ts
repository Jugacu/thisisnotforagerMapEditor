import Editor from '../Editor';

export default class Exporter {

    private readonly HTMLElement: HTMLElement;

    public constructor(
        element: string,
        private readonly editor: Editor
    ) {

        this.HTMLElement = document.querySelector<HTMLElement>(element);
        if (!this.HTMLElement) {
            throw new Error(`Element ${element} not found in document.`);
        }

        this.HTMLElement.addEventListener('click', () => this.export());
    }

    public export(): void {
        const data = JSON.stringify(this.editor.getData());

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', `map-${Date.now()}.json`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


}