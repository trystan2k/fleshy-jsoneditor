/* eslint-disable import/no-extraneous-dependencies */
// jsoneditor is devDependency as we do not import it directly in the
// custom element, but we generate a bundled version, exporting ES modules
// to lib folder that is the one we import in our custom element
const JSONEditor = require('jsoneditor');

window.JSONEditor = window.JSONEditor || JSONEditor;
