/* eslint-disable no-unused-vars */
import rollup from 'rollup';
import buble from '@rollup/plugin-buble';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import litcss from 'rollup-plugin-lit-css';

const base64Img = require('base64-img');

// Used only to copy jsoneditor dependencies and convert JSONEditor to ES Module
export default [
  {
    input: 'src/jsonEditorImport.js',
    plugins: [
      copy({
        targets: [
          {
            src: [
              'node_modules/jsoneditor/src/js/ace/theme-jsoneditor.js',
              'node_modules/jsoneditor/dist/jsoneditor.min.css',
            ],
            dest: 'lib',
          },
          {
            src: 'node_modules/jsoneditor/dist/img/jsoneditor-icons.svg',
            dest: 'lib/img',
          },
        ],
      }),
      resolve({ jsnext: true }), // this is needed to include all source files in the final distribution
      commonJS(),
      buble({ namedFunctionExpressions: false, transforms: { forOf: false } }),
    ],
    output: {
      file: 'lib/json-editor-import.js',
      format: 'es',
      sourcemap: false,
    },
  },
  {
    input: 'src/jsonEditorImportStyles.js',
    plugins: [
      litcss(),
      {
        transform(code, id) {
          if (id.includes('jsoneditor.min.css')) {
            const svgIcons = base64Img.base64Sync(
              'lib/img/jsoneditor-icons.svg'
            );

            return {
              code: code.replace(/img\/jsoneditor-icons\.svg/g, svgIcons),
            };
          }
          return {
            code,
          };
        },
      },
    ],
    output: {
      file: 'lib/json-editor-styles.js',
      format: 'es',
    },
  },
];
