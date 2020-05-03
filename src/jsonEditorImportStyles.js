// jsoneditor is devDependency as we do not import it directly in the
// custom element. It also has a css file that we need to import.
// so with rollup we will generate a JavaScript file export a CSSResult
// using lit-html css function

export { default as jsonEditorStyles } from '../lib/jsoneditor.min.css';
