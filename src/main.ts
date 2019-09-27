import 'css/main.scss';
import Editor from './editor/Editor';

const canvasElement  =  document.querySelector<HTMLElement>('#canvas');
const editor = new Editor();

canvasElement.appendChild(editor.getView());

window.onresize = () => {
    editor.resize(window.innerWidth, window.innerHeight);
};